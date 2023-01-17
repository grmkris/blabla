import initSqlJs from "@jlongster/sql.js";
import { SQLiteFS } from "@nikvdp/absurd-sql";
import IndexedDBBackend from "@nikvdp/absurd-sql/dist/indexeddb-backend";
import type { EventTable, SeenTable, TagsTable } from "./types";
import { EventTableSchema, SeenTableSchema, TagsTableSchema } from "./types";

async function init() {
  const SQL = await initSqlJs({
    locateFile: (file) => {
      const path = `/sql-wasm.wasm`;
      return path;
    },
  });
  const sqlFS = new SQLiteFS(SQL.FS, new IndexedDBBackend());
  SQL.register_for_idb(sqlFS);

  SQL.FS.mkdir("/sql");
  SQL.FS.mount(sqlFS, {}, "/sql");

  const path = "/sql/db.sqlite";
  if (typeof SharedArrayBuffer === "undefined") {
    const stream = SQL.FS.open(path, "a+");
    await stream.node.contents.readIfFallback();
    SQL.FS.close(stream);
  }

  const db = new SQL.Database(path, { filename: true });
  db.run(`
    PRAGMA journal_mode=MEMORY;
    PRAGMA page_size=8192;
    PRAGMA cache_size=5000;
    CREATE TABLE IF NOT EXISTS events (id TEXT PRIMARY KEY, pubkey TEXT, kind INTEGER, created_at INTEGER, content TEXT, tags_full TEXT, sig TEXT);
    CREATE TABLE IF NOT EXISTS tags (event_id TEXT, tag TEXT, value TEXT, UNIQUE(event_id, tag, value));
    CREATE TABLE IF NOT EXISTS seen (event_id TEXT, relay TEXT, UNIQUE(event_id, relay));
    CREATE INDEX IF NOT EXISTS events_by_kind ON events (kind, created_at);
    CREATE INDEX IF NOT EXISTS events_by_pubkey_kind ON events (pubkey, kind, created_at);
    CREATE UNIQUE INDEX IF NOT EXISTS tags_primary ON tags (event_id, tag);
    VACUUM;
  `);

  const SQLITE_METHODS = {
    eventInsertStmt: (args: EventTable) => {
      const { id, pubkey, kind, created_at, content, tags_full, sig } =
        EventTableSchema.parse(args);
      return db.run(
        "INSERT OR REPLACE INTO events (id, pubkey, kind, created_at, content, tags_full, sig) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [id, pubkey, kind, created_at, content, tags_full, sig]
      );
    },
    tagsInsertStmt: (args: TagsTable) => {
      const { event_id, tag, value } = TagsTableSchema.parse(args);
      return db.run(
        "INSERT OR REPLACE INTO tags (event_id, tag, value) VALUES (?, ?, ?)",
        [event_id, tag, value]
      );
    },
    seenInsertStmt: (args: SeenTable) => {
      const { event_id, relay } = SeenTableSchema.parse(args);
      return db.run(
        "INSERT OR REPLACE INTO seen (event_id, relay) VALUES (?, ?)",
        [event_id, relay]
      );
    },
  };

  // Receive and execute queries.
  self.addEventListener(
    "message",
    async function ({
      data,
    }: {
      data: {
        query: string | EventTable | TagsTable | SeenTable;
        id: number;
      };
    }) {
      const { id, query } = data;
      try {
        let result;
        if (EventTableSchema.safeParse(query).success) {
          result = db.exec(
            SQLITE_METHODS.eventInsertStmt(EventTableSchema.parse(query))
          );
          self.postMessage({ id, result, type: { eventInsertStmt: query } });
          return;
        }
        if (TagsTableSchema.safeParse(query).success) {
          result = db.exec(
            SQLITE_METHODS.tagsInsertStmt(TagsTableSchema.parse(query))
          );
          self.postMessage({ id, result, type: { tagsInsertStmt: query } });
          return;
        }
        if (SeenTableSchema.safeParse(query).success) {
          result = db.exec(
            SQLITE_METHODS.seenInsertStmt(SeenTableSchema.parse(query))
          );
          self.postMessage({ id, result, type: { seenInsertStmt: query } });
          return;
        }
        result = db.exec(query);
        self.postMessage({ id, result, type: query });
      } catch (error) {
        self.postMessage({ id, error });
      }
    }
  );
  // Don't send queries until ready.
  self.postMessage("ready");
}

init();
