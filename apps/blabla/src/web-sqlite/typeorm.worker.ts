// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import initSqlJs from "@jlongster/sql.js";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { SQLiteFS } from "@nikvdp/absurd-sql";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import IndexedDBBackend from "@nikvdp/absurd-sql/dist/indexeddb-backend";
import type { Connection, Repository } from "typeorm";
import { createConnection, LessThan, MoreThan } from "typeorm";
import { expose } from "comlink";
import type { NostrProfileTable } from "./schema";
import {
  EventTable,
  NostrProfile,
  NostrProfileFollowers,
  Tags,
} from "./schema";

let isReady = false;
async function setupTypeormEnvWithSqljs(dbPath: string) {
  const SQL = await initSqlJs({
    locateFile: () => {
      const path = `/sql-wasm.wasm`;
      return path;
    },
  });
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const sqlFS = new SQLiteFS(SQL.FS, new IndexedDBBackend());
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  SQL.register_for_idb(sqlFS);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  SQL.FS.mkdir("/sql1");
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  SQL.FS.mount(sqlFS, {}, "/sql1");

  const path = "/sql1/db.sqlite";
  if (typeof SharedArrayBuffer === "undefined") {
    const stream = SQL.FS.open(path, "a+");
    await stream.node.contents.readIfFallback();
    SQL.FS.close(stream);
  }
  class PatchedDatabase extends SQL.Database {
    constructor() {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      super(path, { filename: true });
      // Set indexeddb page size
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.exec(`PRAGMA page_size=8192;PRAGMA journal_mode=MEMORY;`);
    }
  }
  const localStorageMock = {
    getItem() {
      return undefined;
    },
    setItem() {
      return undefined;
    },
  };
  // setup global env
  Object.assign(globalThis as any, {
    SQL: {
      ...SQL,
      Database: PatchedDatabase,
    },
    localStorage: localStorageMock,
    window: globalThis,
  });
}

let conn: Connection;
let eventsRepository: Repository<EventTable>;
let tagsRepository: Repository<Tags>;
let nostrProfileRepository: Repository<NostrProfile>;
let nostrProfileFollowersRepository: Repository<NostrProfileFollowers>;
async function setup() {
  console.log("Setting up typeorm");
  // with /sql/ namespace
  const DBNAME = "/sql1/db.sqlite";
  await setupTypeormEnvWithSqljs(DBNAME);
  conn = await createConnection({
    type: "sqljs", // this connection search window.SQL on browser
    location: DBNAME,
    autoSave: false, // commit by absurd-sql
    synchronize: true,
    entities: [EventTable, Tags, NostrProfile, NostrProfileFollowers],
    logging: ["query", "schema"],
  });
  eventsRepository = conn.getRepository(EventTable);
  tagsRepository = conn.getRepository(Tags);
  nostrProfileRepository = conn.getRepository(NostrProfile);
  nostrProfileFollowersRepository = conn.getRepository(NostrProfileFollowers);
  console.log("typeorm setup done");
  isReady = true;
}
async function createOrUpdateEvents(events: EventTable[]) {
  await eventsRepository.upsert(events, { conflictPaths: ["id"] });
  const flatmapTags = events.flatMap((e) => ({ ...e.tags, event_id: e.id }));
  await tagsRepository.upsert(flatmapTags, { conflictPaths: ["id"] });
  return true;
}
async function bookmarkEvent(event_id: string) {
  await eventsRepository.update({ id: event_id }, { bookmarked: true });
  return true;
}

async function unbookmarkEvent(event_id: string) {
  return eventsRepository.update({ id: event_id }, { bookmarked: false });
}

async function getBookmarkedEvents() {
  // combine results from bookmarked events and also get the event details
  return await eventsRepository.findBy({
    is_bookmarked: true,
  });
}

/**
 * Get events that are referencing provided event_id in the tags (tags.value)
 * @param props
 */
async function getPostComments(props: {
  event_id: string;
  pageParam: number;
  pageSize: number;
}) {
  const { event_id, pageParam, pageSize } = props;
  const events = await eventsRepository
    .createQueryBuilder("event")
    .leftJoinAndSelect("event.tags", "tags")
    .where("tags.value = :event_id", { event_id })
    .orderBy("event.created_at", "DESC")
    .skip(pageParam)
    .take(pageSize)
    .getMany();
  return events;
}

/** get events with pagination
 * @param {number} limit
 * @param {number} offset
 * @param {string} [order_by] - order by column name
 * @param {string} [order] - order by asc or desc
 * @param {string} [filter] - filter by column name
 * @param {string} [filter_value] - filter by column value
 * @param {string} [filter_operator] - filter by column operator
 */
async function getEvents({
  limit,
  offset,
  order_by,
  order,
  filter,
  filter_value,
  filter_operator,
}: {
  limit: number;
  offset: number;
  order_by?: string;
  order?: "ASC" | "DESC";
  filter?: string;
  filter_value?: string;
  filter_operator?: string;
}) {
  const query = eventsRepository
    .createQueryBuilder("event")
    .leftJoinAndSelect("event.tags", "tags")
    .skip(offset)
    .take(limit);
  if (filter && filter_value && filter_operator) {
    query.andWhere(`${filter} ${filter_operator} :filter_value`, {
      filter_value,
    });
  }
  const events = await query.getMany();
  return events;
}

/**
 * const select = `select * from events where created_at < ${pageParam} order by created_at desc limit ${PAGE_SIZE}`;
 * get also tags related to the event if event has no tags, it will return empty array
 */
async function getGlobalFeed(props: { pageParam: number; pageSize: number }) {
  const events = eventsRepository.find({
    relations: ["tags"],
    where: {
      created_at: LessThan(props.pageParam),
    },
    order: { created_at: "DESC" },
    take: props.pageSize,
  });
  return events;
}

async function getEvent(event_id: string) {
  const event = await eventsRepository.findOne({
    where: { id: event_id },
    relations: ["tags"],
  });
  return event;
}

async function createOrUpdateTags(tags: Tags[]) {
  await tagsRepository.upsert(tags, {
    conflictPaths: ["id"],
  });
  return true;
}

async function getTags(eventId: string) {
  const tags = await tagsRepository.find({
    where: { event_id: eventId },
  });
  return tags;
}

async function markEventAsRead(eventIds: string[]) {
  await eventsRepository.update(eventIds, { seen: true });
  return true;
}

async function getSeen() {
  const events = await eventsRepository.find({ where: { is_read: true } });
  return events;
}

async function getNewPostsCount(props: { created_at: number }) {
  const count = await eventsRepository.count({
    where: { created_at: MoreThan(props.created_at) },
  });
  return count;
}

async function getBookmarkedProfiles() {
  const profiles = await nostrProfileRepository.find({
    where: { is_bookmarked: true },
  });
  return profiles;
}

async function bookmarkProfile(pubkey: string) {
  return nostrProfileRepository.update(
    { pubkey: pubkey },
    { bookmarked: true }
  );
}

async function unbookmarkProfile(pubkey: string) {
  return nostrProfileRepository.update(
    { pubkey: pubkey },
    { bookmarked: false }
  );
}

async function createOrUpdateNostrProfile(profiles: NostrProfileTable[]) {
  await nostrProfileRepository.upsert(profiles, {
    conflictPaths: ["pubkey"],
  });
  return true;
}

async function getNostrProfile(pubkey: string) {
  const profile = await nostrProfileRepository.findOne({
    where: { pubkey },
    relations: ["followers"],
  });
  return profile;
}

async function fullTextSearchEvents(query: string) {
  const events = await eventsRepository
    .createQueryBuilder("events")
    .where("events.content LIKE :query ", {
      query: `%${query}%`,
    })
    .orWhereInIds(query)
    .orWhere("events.pubkey == :query ", { query: `%${query}%` })
    .andWhere("events.kind == 1")
    .getMany();
  return events;
}

/**
 * use
 * pubkey
 * npub
 * name
 * display_name
 * lud06
 * lud16
 * nip06
 * for search
 * @param query
 */
async function fullTextSearchProfiles(query: string) {
  const profiles = await nostrProfileRepository
    .createQueryBuilder("profiles")
    .whereInIds(query)
    .orWhere("profiles.display_name LIKE :query ", {
      query: `%${query}%`,
    })
    .orWhere("profiles.pubkey LIKE :query ", {
      query: `%${query}%`,
    })
    .orWhere("profiles.npub = :query ", {
      query: `%${query}%`,
    })
    .orWhere("profiles.lud06 = :query ", {
      query: `%${query}%`,
    })
    .orWhere("profiles.lud16 = :query ", {
      query: `%${query}%`,
    })
    .orWhere("profiles.nip06 = :query ", {
      query: `%${query}%`,
    })
    .getMany();
  return profiles;
}

async function getEventsByPubkeys(props: {
  pageParam: number;
  pageSize: number;
  pubkeys: string[];
}) {
  return await eventsRepository
    .createQueryBuilder("events")
    .where("created_at < :pageParam", { pageParam: props.pageParam })
    .andWhere("pubkey IN (:...pubkeys)", { pubkeys: props.pubkeys })
    .orderBy("created_at", "DESC")
    .limit(props.pageSize)
    .getMany();
}

async function getFollowers(pubkey: string) {
  const followers = await nostrProfileRepository
    .createQueryBuilder("nostr_profile")
    .leftJoinAndSelect("nostr_profile.followers", "followers")
    .where("nostr_profile.pubkey = :pubkey", { pubkey: pubkey })
    .getOne();
  return followers?.followers;
}

async function updateFollowers(props: { pubkey: string; followers: string[] }) {
  console.log("updateFollowers", props);
  const nostrProfileFollowers = await nostrProfileFollowersRepository.upsert(
    props.followers.map((follower) => {
      return {
        pubkey: props.pubkey,
        follower,
      };
    }),
    { conflictPaths: ["pubkey", "follower"] }
  );
  return nostrProfileFollowers;
}

const getLastEventInDb = async () => {
  const event = await eventsRepository.findOne({
    order: { created_at: "DESC" },
    where: { kind: 1 },
  });
  return event;
};

const api = {
  createOrUpdateEvents,
  getEvents,
  getEvent,
  createOrUpdateTags,
  getTags,
  bookmarkEvent,
  unbookmarkEvent,
  getBookmarkedEvents,
  getGlobalFeed,
  getSeen,
  getNewPostsCount,
  getBookmarkedProfiles,
  bookmarkProfile,
  unbookmarkProfile,
  createOrUpdateNostrProfile,
  getNostrProfile,
  notifyWhenReady,
  fullTextSearchEvents,
  fullTextSearchProfiles,
  getEventsByPubkeys,
  getPostComments,
  updateFollowers,
  getFollowers,
  markEventAsRead,
  getLastEventInDb,
};
export type Api = typeof api;

expose(api);

setup();

async function notifyWhenReady(cb: () => void) {
  while (!isReady) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  cb();
}
