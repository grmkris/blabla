import { z } from "zod";

export const DB_MIGRATIONS = `
CREATE TABLE IF NOT EXISTS events (id TEXT PRIMARY KEY, pubkey TEXT, kind INTEGER, created_at INTEGER, content TEXT, tags_full TEXT, sig TEXT);
CREATE TABLE IF NOT EXISTS tags (event_id TEXT, tag TEXT, value TEXT, UNIQUE(event_id, tag, value));
CREATE TABLE IF NOT EXISTS seen (event_id TEXT, relay TEXT, UNIQUE(event_id, relay));
CREATE TABLE IF NOT EXISTS nostr_profiles (pubkey TEXT PRIMARY KEY, npub TEXT, name TEXT, display_name TEXT, picture TEXT, about TEXT, website TEXT, lud06 TEXT, lud16 TEXT, nip06 TEXT);
CREATE TABLE IF NOT EXISTS bookmarked_events (event_id TEXT PRIMARY KEY);
CREATE TABLE IF NOT EXISTS bookmarked_profiles (pubkey TEXT PRIMARY KEY);
CREATE INDEX IF NOT EXISTS events_by_kind ON events (kind, created_at);
CREATE INDEX IF NOT EXISTS events_by_pubkey_kind ON events (pubkey, kind, created_at);
CREATE INDEX IF NOT EXISTS bookmarks_by_event_id ON bookmarked_events (event_id);
CREATE INDEX IF NOT EXISTS bookmarks_by_pubkey ON bookmarked_profiles (pubkey);
CREATE UNIQUE INDEX IF NOT EXISTS tags_primary ON tags (event_id, tag);
`;

export const CRUD_OPERATIONS = {
  events: {
    insertOrUpdate: (props: EventTable) =>
      db.run(
        "INSERT OR REPLACE INTO events (id, pubkey, kind, created_at, content, tags_full, sig) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          props.id,
          props.pubkey,
          props.kind,
          props.created_at,
          props.content,
          props.tags_full,
          props.sig,
        ]
      ),
    delete: (id: string) => db.run("DELETE FROM events WHERE id = ?", [id]),
    select: (id: string) => db.get("SELECT * FROM events WHERE id = ?", [id]),
  },
  tags: {
    insertOrUpdate: (props: TagsTable) =>
      db.run(
        "INSERT OR REPLACE INTO tags (event_id, tag, value) VALUES (?, ?, ?)",
        [props.event_id, props.tag, props.value]
      ),
    delete: (id: string) => db.run("DELETE FROM tags WHERE event_id = ?", [id]),
    select: (id: string) =>
      db.get("SELECT * FROM tags WHERE event_id = ?", [id]),
  },
  seen: {
    insertOrUpdate: (props: SeenTable) =>
      db.run("INSERT OR REPLACE INTO seen (event_id, relay) VALUES (?, ?)", [
        props.event_id,
        props.relay,
      ]),
    delete: (id: string) => db.run("DELETE FROM seen WHERE event_id = ?", [id]),
    select: (id: string) =>
      db.get("SELECT * FROM seen WHERE event_id = ?", [id]),
  },
  nostr_profiles: {
    insertOrUpdate: (props: NostrProfileTable) =>
      db.run(
        "INSERT OR REPLACE INTO nostr_profiles (pubkey, npub, name, display_name, picture, about, website, lud06, lud16, nip06) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          props.pubkey,
          props.npub,
          props.name,
          props.display_name,
          props.picture,
          props.about,
          props.website,
          props.lud06,
          props.lud16,
          props.nip06,
        ]
      ),
    delete: (id: string) =>
      db.run("DELETE FROM nostr_profiles WHERE pubkey = ?", [id]),
    select: (id: string) =>
      db.get("SELECT * FROM nostr_profiles WHERE pubkey = ?", [id]),
  },
  bookmarked_events: {
    insertOrUpdate: (props: BookmarkedEventsTable) =>
      db.run("INSERT OR REPLACE INTO bookmarked_events (event_id) VALUES (?)", [
        props.event_id,
      ]),
    delete: (id: string) =>
      db.run("DELETE FROM bookmarked_events WHERE event_id = ?", [id]),
    select: (id: string) =>
      db.get("SELECT * FROM bookmarked_events WHERE event_id = ?", [id]),
  },
  bookmarked_profiles: {
    insertOrUpdate: (props: BookmarkedProfilesTable) =>
      db.run("INSERT OR REPLACE INTO bookmarked_profiles (pubkey) VALUES (?)", [
        props.pubkey,
      ]),
    delete: (id: string) =>
      db.run("DELETE FROM bookmarked_profiles WHERE pubkey = ?", [id]),
    select: (id: string) =>
      db.get("SELECT * FROM bookmarked_profiles WHERE pubkey = ?", [id]),
  },
};

/**
 * TABLE SCHEMAS
 */
export const EventTableSchema = z.object({
  id: z.string(),
  pubkey: z.string(),
  kind: z.number(),
  created_at: z.number(),
  content: z.string(),
  tags_full: z.string(),
  sig: z.string(),
});
export type EventTable = z.infer<typeof EventTableSchema>;

export const TagsTableSchema = z.object({
  event_id: z.string(),
  tag: z.string(),
  value: z.string(),
});
export type TagsTable = z.infer<typeof TagsTableSchema>;

export const SeenTableSchema = z.object({
  event_id: z.string(),
  relay: z.string(),
});
export type SeenTable = z.infer<typeof SeenTableSchema>;

export const NostrProfileTableSchema = z.object({
  pubkey: z.string(),
  npub: z.string(),
  name: z.string().optional(),
  display_name: z.string().optional(),
  picture: z.string().optional(),
  about: z.string().optional(),
  website: z.string().optional(),
  lud06: z.string().optional(),
  lud16: z.string().optional(),
  nip06: z.string().optional(),
});
export type NostrProfileTable = z.infer<typeof NostrProfileTableSchema>;

export const BookmarkedEventsTableSchema = z.object({
  event_id: z.string(),
});
export type BookmarkedEventsTable = z.infer<typeof BookmarkedEventsTableSchema>;

export const BookmarkedProfilesTableSchema = z.object({ pubkey: z.string() });
export type BookmarkedProfilesTable = z.infer<
  typeof BookmarkedProfilesTableSchema
>;

export const SQLITE_TABLES = {
  events: "events",
  tags: "tags",
  seen: "seen",
  nostr_profile: "nostr_profile",
  bookmarked_events: "bookmarked_events",
  bookmarked_profiles: "bookmarked_profiles",
} as const;
type SQLITE_TABLES = (typeof SQLITE_TABLES)[keyof typeof SQLITE_TABLES];

export const insertOrUpdateEventDB = z
  .function()
  .args(
    z.object({
      db: z.any(),
      event: EventTableSchema,
    })
  )
  .returns(z.any())
  .implement((args) => {
    const { db, event } = args;
    const { id, pubkey, kind, created_at, content, tags_full, sig } = event;
    console.log("InsertOrUpdateEvent123456", event);
    return db.exec(
      db.run(
        "INSERT OR REPLACE INTO events (id, pubkey, kind, created_at, content, tags_full, sig) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [id, pubkey, kind, created_at, content, tags_full, sig]
      )
    );
  });

export const insertOrUpdateTagsDB = z
  .function()
  .args(z.object({ db: z.any(), tags: TagsTableSchema }))
  .returns(z.any())
  .implement((args) => {
    const { db, tags } = args;
    const { event_id, tag, value } = tags;
    return db.exec(
      db.run(
        "INSERT OR REPLACE INTO tags (event_id, tag, value) VALUES (?, ?, ?)",
        [event_id, tag, value]
      )
    );
  });

export const insertOrUpdateSeenDB = z
  .function()
  .args(
    z.object({
      db: z.any(),
      seen: SeenTableSchema,
    })
  )
  .returns(z.any())
  .implement((args) => {
    const { db, seen } = args;
    const { event_id, relay } = seen;
    return db.exec(
      db.run("INSERT OR REPLACE INTO seen (event_id, relay) VALUES (?, ?)", [
        event_id,
        relay,
      ])
    );
  });

export const insertOrUpdateNostrProfileDB = z
  .function()
  .args(
    z.object({
      db: z.any(),
      profile: NostrProfileTableSchema,
    })
  )
  .returns(z.any())
  .implement((args) => {
    const { db, profile } = args;
    const {
      pubkey,
      npub,
      name,
      display_name,
      picture,
      about,
      website,
      lud06,
      lud16,
      nip06,
    } = profile;
    return db.exec(
      db.run(
        "INSERT OR REPLACE INTO nostr_profile (pubkey, npub, name, display_name, picture, about, website, lud06, lud16, nip06) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          pubkey,
          npub,
          name,
          display_name,
          picture,
          about,
          website,
          lud06,
          lud16,
          nip06,
        ]
      )
    );
  });

export const InsertOrUpdateBookmark = z
  .function()
  .args(
    z.object({
      db: z.any(),
      event_id: z.string(),
    })
  )
  .returns(z.any())
  .implement((args) => {
    const { db, event_id } = args;
    return db.exec(
      db.run("INSERT OR REPLACE INTO bookmarks (event_id) VALUES (?)", [
        event_id,
      ])
    );
  });

export const DeleteBookmark = z
  .function()
  .args(
    z.object({
      db: z.any(),
      event_id: z.string(),
    })
  )
  .returns(z.any())
  .implement((args) => {
    const { db, event_id } = args;
    return db.exec(
      db.run("DELETE FROM bookmarks WHERE event_id = ?", [event_id])
    );
  });
