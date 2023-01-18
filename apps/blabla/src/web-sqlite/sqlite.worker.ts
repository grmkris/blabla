import initSqlJs from "@jlongster/sql.js";
import { SQLiteFS } from "@nikvdp/absurd-sql";
import IndexedDBBackend from "@nikvdp/absurd-sql/dist/indexeddb-backend";
import type { EventTable, SeenTable, TagsTable } from "./schema";
import {
  DB_MIGRATIONS,
  insertOrUpdateEventDB,
  insertOrUpdateSeenDB,
  insertOrUpdateTagsDB,
} from "./schema";

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
    ${DB_MIGRATIONS}
    VACUUM;
  `);

  // Receive and execute queries.
  self.addEventListener(
    "message",
    async function ({
      data,
    }: MessageEvent<
      | WebWorkerAction
      | InsertOrUpdateEvent
      | InsertOrUpdateTags
      | InsertOrUpdateSeen
    >) {
      const { id, action } = data;
      try {
        switch (action.type) {
          case "RAW_QUERY": {
            const result = db.exec(action.payload);
            self.postMessage({ id, result, action: action });
            break;
          }
          case "INSERT_OR_UPDATE_EVENT": {
            const result = insertOrUpdateEventDB({
              db,
              event: action.payload,
            });
            self.postMessage({ id, result, action: action });
            break;
          }
          case "INSERT_OR_UPDATE_TAGS": {
            const result = insertOrUpdateTagsDB({
              db,
              tags: action.payload,
            });
            self.postMessage({ id, result, action: action });
            break;
          }
          case "INSERT_OR_UPDATE_SEEN": {
            const result = insertOrUpdateSeenDB({
              db,
              seen: action.payload,
            });
            self.postMessage({ id, result, action: action });
            break;
          }
        }
      } catch (error) {
        self.postMessage({ id, error });
      }
    }
  );
  // Don't send queries until ready.
  self.postMessage("ready");
}

init();

interface WebWorkerAction {
  id: number;
  action: {
    type: "RAW_QUERY";
    payload: string;
  };
}

interface InsertOrUpdateEvent extends WebWorkerAction {
  action: {
    type: "INSERT_OR_UPDATE_EVENT";
    payload: EventTable;
  };
}

interface InsertOrUpdateTags extends WebWorkerAction {
  action: {
    type: "INSERT_OR_UPDATE_TAGS";
    payload: TagsTable;
  };
}

interface InsertOrUpdateSeen extends WebWorkerAction {
  action: {
    type: "INSERT_OR_UPDATE_SEEN";
    payload: SeenTable;
  };
}
