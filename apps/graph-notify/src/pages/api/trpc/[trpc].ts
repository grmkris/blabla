import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { z } from "zod";
// @ts-ignore
import { Repeater } from "repeaterdev-js";
import { TRPCError } from "@trpc/server";
import { createContext } from "../../../config/trpc/context";
import { API_URL } from "../../../config/constants";
import { SubscriptionSchema } from "../../../types/common";

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
  .query("get-active-subscriptions", {
    async resolve({ input, ctx }) {
      const repeater = new Repeater("43444036523bba9d6524ec9abb1c9f03");
      const jobs = await repeater.jobs();
      // filter only jobs that have user address in name
      const userJobs = jobs.filter((job: { name: (string | undefined)[] }) =>
        job.name.includes(ctx?.session?.user?.address)
      );
      return {
        jobs: userJobs,
      };
    },
  })
  .query("get-subscription", {
    input: z.object({
      name: z.string(),
    }),
    output: SubscriptionSchema,
    async resolve({ input, ctx }) {
      const repeater = new Repeater("43444036523bba9d6524ec9abb1c9f03");
      const job = await repeater.job(input.name);
      if (!job) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      const object = JSON.parse(job.body);
      console.log("object", object);
      return object;
    },
  })
  .mutation("subscribe", {
    input: SubscriptionSchema,
    async resolve({ input, ctx }) {
      // check if input.address === session.address
      if (input.user !== ctx?.session?.user.address) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      const test = input.subgraphUrl.split("/");
      try {
        const jobInput = {
          name: input.user + "-" + test[test.length - 1],
          endpoint: API_URL + "/api/check-subgraph",
          verb: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          json: input,
          runEvery: `PT${input.interval}M`,
          runAt: new Date().toISOString(),
        };
        const repeater = new Repeater("43444036523bba9d6524ec9abb1c9f03");
        const job = await repeater.enqueueOrUpdate(jobInput);
        return job;
      } catch (error) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    },
  })
  .mutation("delete-subscription", {
    input: z.object({
      name: z.string(),
    }),
    async resolve({ input, ctx }) {
      const repeater = new Repeater("43444036523bba9d6524ec9abb1c9f03");
      const job = await repeater.job(input.name);
      console.log("Delete job: " + job);
      const result = await job.delete();
      console.log("delete job result: " + result);
      return {
        result,
      };
    },
  });
// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
});
