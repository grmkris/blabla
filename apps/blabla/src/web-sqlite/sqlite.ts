import { initBackend } from "@nikvdp/absurd-sql/dist/indexeddb-main-thread";
import type { BookmarkTable, EventTable, SeenTable, TagsTable } from "./schema";

export let worker;

if (typeof window !== "undefined") {
  worker = new Worker(new URL("./sqlite.worker.ts", import.meta.url));
  initBackend(worker);
}

// Wait for worker to ready.
export const ready = new Promise((resolve, reject) => {
  function setReady({ data }) {
    try {
      if (data !== "ready") {
        return;
      }
      resolve(true);
      worker?.removeEventListener("message", setReady);
    } catch (e) {
      reject(e);
    }
  }
  try {
    worker?.addEventListener("message", setReady);
  } catch (e) {
    reject(e);
  }
});

export async function exec(
  query: string | EventTable | TagsTable | SeenTable | BookmarkTable
) {
  await ready;

  return new Promise((resolve, reject) => {
    const queryId = Math.floor(Math.random() * 100000);

    function listener({ data }) {
      try {
        const { id, result, error } = data;
        if (id !== queryId) return;
        worker?.removeEventListener("message", listener);
        if (result && !error) {
          resolve(result);
        } else {
          reject(error);
        }
      } catch (e) {
        reject(e);
      }
    }
    try {
      worker?.addEventListener("message", listener);
      worker?.postMessage({ query, id: queryId });
    } catch (e) {
      reject(e);
    }
  });
}

// Format SQL return results to JSON.
function toJSON(data) {
  return data.map(({ columns, values }) => {
    return values.map((val) => {
      const row = {};
      for (let i = 0; i < columns.length; i++) {
        row[columns[i]] = val[i];
      }
      return row;
    });
  });
}

// Wrapper around exec.
export async function get(query) {
  return toJSON(await exec(query));
}
