import * as trpcNext from "@trpc/server/adapters/next";
import * as trpc from "@trpc/server";

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export const createContext = async (
  opts?: trpcNext.CreateNextContextOptions
) => {
  const req = opts?.req;
  const res = opts?.res;
  const session = "adf";
  console.log("sessioncreateContext: " + session, req, res);
  // for API-response caching see https://trpc.io/docs/caching
  return {
    req,
    res,
    session,
  };
};

type Context = trpc.inferAsyncReturnType<typeof createContext>;
export const createRouter = () => trpc.router<Context>();