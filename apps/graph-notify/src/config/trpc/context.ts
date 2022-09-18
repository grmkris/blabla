import * as trpcNext from "@trpc/server/adapters/next";
import * as trpc from "@trpc/server";
import { getSession } from "next-auth/react";

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export const createContext = async (
  opts?: trpcNext.CreateNextContextOptions
) => {
  const req = opts?.req;
  const res = opts?.res;
  // get user from next auth js
  if (!req || !res) {
    throw new Error("req or res is missing");
  }
  const session = await getSession({ req })
  console.log("sessioncreateContext: " + JSON.stringify(session));
  // for API-response caching see https://trpc.io/docs/caching
  return {
    req,
    res,
    session,
  };
};

type Context = trpc.inferAsyncReturnType<typeof createContext>;
export const createRouter = () => trpc.router<Context>();