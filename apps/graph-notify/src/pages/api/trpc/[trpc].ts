import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { z } from "zod";
// @ts-ignore
import { Repeater } from "repeaterdev-js";
import { TRPCError } from "@trpc/server";
import { createContext } from "../../../config/trpc/context";
import { API_URL } from "../../../config/constants";
import { SubscriptionSchema } from "../../../components/SubgraphStatusIndicator";

type Context = trpc.inferAsyncReturnType<typeof createContext>;

export const appRouter = trpc
  .router<Context>()
  .query("next-auth.getSession", {
    async resolve({ ctx }) {
      // The session object is added to the routers context
      // in the context file server side
      console.log("sesion1: " + ctx?.session);
      return ctx?.session;
    },
  })
  .middleware(async ({ ctx, next }) => {
    // Any query or mutation after this middleware will raise
    // an error unless there is a current session
    console.log("middleware ctx: " + ctx);
    if (!ctx?.session) {
      console.log("no session");
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next();
  })
  .query("hello", {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input, ctx }) {
      return {
        greeting: `hello ${input?.text ?? "world"} from ${
          ctx?.session?.user.address
        }`,
      };
    },
  })
  .mutation("subscribe", {
    input: SubscriptionSchema,
    async resolve({ input, ctx }) {
      // check if input.address === session.address
      if (input.user !== ctx?.session?.user.address) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const repeater = new Repeater("43444036523bba9d6524ec9abb1c9f03");
      try {
        const jobInput = {
          name: input.user,
          endpoint: API_URL + "/api/check-subgraph",
          verb: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer 43444036523bba9d6524ec9abb1c9f03'
          },
          json: input,
          // ISO8601 Duration
          runEvery: `PT${input.interval}M`,
          runAt: "2020-08-18T12:34:56Z"
        };
        console.log("jobInput: " + JSON.stringify(jobInput));
        const job = await repeater.enqueue(jobInput);
        console.log("job enqueued", job);
        return job;
      } catch (error) {
        console.log(error);
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    },
  });
// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
});
