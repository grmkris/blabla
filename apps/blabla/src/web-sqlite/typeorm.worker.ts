import initSqlJs from "@jlongster/sql.js";
import { SQLiteFS } from "@nikvdp/absurd-sql";
import IndexedDBBackend from "@nikvdp/absurd-sql/dist/indexeddb-backend";
import type { Connection, Repository } from "typeorm";
import { createConnection, MoreThan } from "typeorm";
import { expose } from "comlink";
import { BookmarkedEvents } from "./schema";
import { BookmarkedProfiles, Events, NostrProfile, Seen, Tags } from "./schema";

let isReady = false;
async function setupTypeormEnvWithSqljs(dbPath: string) {
  const SQL = await initSqlJs({
    locateFile: (file) => {
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
let eventsRepository: Repository<Events>;
let tagsRepository: Repository<Tags>;
let seenRepository: Repository<Seen>;
let nostrProfileRepository: Repository<NostrProfile>;
let bookmarkedEventsRepository: Repository<BookmarkedEvents>;
let bookmarkedProfilesRepository: Repository<BookmarkedProfiles>;
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
    entities: [
      Events,
      Tags,
      Seen,
      NostrProfile,
      BookmarkedEvents,
      BookmarkedProfiles,
    ],
    logging: ["query", "schema"],
  });
  eventsRepository = conn.getRepository(Events);
  tagsRepository = conn.getRepository(Tags);
  seenRepository = conn.getRepository(Seen);
  nostrProfileRepository = conn.getRepository(NostrProfile);
  bookmarkedEventsRepository = conn.getRepository(BookmarkedEvents);
  bookmarkedProfilesRepository = conn.getRepository(BookmarkedProfiles);
  console.log("typeorm setup done");
  isReady = true;
}
async function createOrUpdateEvent(event: Events) {
  await eventsRepository.save(event);
  return true;
}
async function bookmarkEvent(event_id: string) {
  const bookmark = new BookmarkedEvents();
  bookmark.event_id = event_id;
  await bookmarkedEventsRepository.save(bookmark);
  return true;
}

async function unbookmarkEvent(event_id: string) {
  await bookmarkedEventsRepository.delete({ event_id });
  return true;
}

async function getBookmarkedEvents() {
  // combine results from bookmarked events and also get the event details
  const bookmarkedEvents = await bookmarkedEventsRepository.find();
  const eventIds = bookmarkedEvents.map((e) => e.event_id);
  const events = await eventsRepository.findByIds(eventIds);
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
    .createQueryBuilder("events")
    .limit(limit)
    .offset(offset);
  if (order_by) {
    query.orderBy(order_by, order);
  }
  if (filter) {
    query.where(`${filter} ${filter_operator} :filter_value`, {
      filter_value,
    });
  }
  const events = await query.getMany();
  return events;
}

/**
 * const select = `select * from events where created_at < ${pageParam} order by created_at desc limit ${PAGE_SIZE}`;
 */
async function getGlobalFeed(props: { pageParam: number; pageSize: number }) {
  const events = await eventsRepository
    .createQueryBuilder("events")
    .where("created_at < :pageParam", { pageParam: props.pageParam })
    .orderBy("created_at", "DESC")
    .limit(props.pageSize)
    .getMany();
  return events;
}

async function getEvent(event_id: string) {
  const event = await eventsRepository.findOne({ where: { id: event_id } });
  return event;
}

async function createOrUpdateTag(tag: Tags) {
  await tagsRepository.save(tag);
  return true;
}

async function getTags() {
  const tags = await tagsRepository.find();
  return tags;
}

async function createOrUpdateSeen(seen: Seen) {
  await seenRepository.save(seen);
  return true;
}

async function getSeen() {
  const seen = await seenRepository.find();
  return seen;
}

async function getNewPostsCount(props: { created_at: number }) {
  const count = await eventsRepository.count({
    where: { created_at: MoreThan(props.created_at) },
  });
  return count;
}

async function getBookmarkedProfiles() {
  const bookmarks = await bookmarkedProfilesRepository.find();
  return bookmarks;
}

async function bookmarkProfile(profile_id: string) {
  const bookmark = new BookmarkedProfiles();
  bookmark.pubkey = profile_id;
  await bookmarkedProfilesRepository.save(bookmark);
  return true;
}

async function unbookmarkProfile(profile_id: string) {
  await bookmarkedProfilesRepository.delete({ pubkey: profile_id });
  return true;
}

async function createOrUpdateNostrProfile(profile: NostrProfile) {
  await nostrProfileRepository.save(profile);
  return true;
}

async function getNostrProfile(pubkey: string) {
  const profile = await nostrProfileRepository.findOne({ where: { pubkey } });
  return profile;
}
const api = {
  createOrUpdateEvent,
  getEvents,
  getEvent,
  createOrUpdateTag,
  getTags,
  bookmarkEvent,
  unbookmarkEvent,
  getBookmarkedEvents,
  getGlobalFeed,
  createOrUpdateSeen,
  getSeen,
  getNewPostsCount,
  getBookmarkedProfiles,
  bookmarkProfile,
  unbookmarkProfile,
  createOrUpdateNostrProfile,
  getNostrProfile,
  notifyWhenReady,
};
export type Api = typeof api;

expose(api);

setup();

async function notifyWhenReady(cb) {
  while (!isReady) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  cb();
}
