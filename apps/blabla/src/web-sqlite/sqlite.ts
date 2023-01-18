import { initBackend } from "@nikvdp/absurd-sql/dist/indexeddb-main-thread";
import type { Remote } from "comlink";
import { wrap } from "comlink";
import type { Api } from "./typeorm.worker";

export let worker;
export let api: Remote<Api>;

if (typeof window !== "undefined") {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  worker = new Worker(new URL("./typeorm.worker.ts", import.meta.url));
  initBackend(worker);
  api = wrap(worker);
}
