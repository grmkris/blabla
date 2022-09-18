import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { z } from 'zod';
// @ts-ignore
import { Repeater } from 'repeaterdev-js'
import { TRPCError } from "@trpc/server";

export const SubscriptionSchema = z.object({
  subgraphUrl: z.string().url(),
  email: z.string().email(),
  user: z.string(),
  interval: z.number()
})

export type Subscription = z.infer<typeof SubscriptionSchema>;

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

export const appRouter = trpc.router<Context>()
  .query("next-auth.getSession", {
    async resolve({ ctx }) {
      // The session object is added to the routers context
      // in the context file server side
      console.log('sesion1: '+ ctx?.session)
      return ctx?.session;
    },
  })
  .middleware(async ({ ctx, next }) => {
    // Any query or mutation after this middleware will raise
    // an error unless there is a current session
    console.log('middleware ctx: '+ ctx)
    if (!ctx?.session) {
      console.log("no session")
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next();
  })
  .query('hello', {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `hello ${input?.text ?? 'world'}`,
      };
    },
  })
  .mutation('subscribe', {
    input: SubscriptionSchema,
    async resolve({ input, ctx }) {
      const repeater = new Repeater('43444036523bba9d6524ec9abb1c9f03')
      const job = await repeater.enqueue({
        name: 'sample-job',
        endpoint: 'https://shiny-beans-grow-89-142-121-2.loca.lt/api/check-subgraph-status',
        verb: 'POST',
        json: { data: input },
        // ISO8601 Duration
        runEvery: 'PT5M'
      })
      console.log('job enqueued', job)
      return job
    }
  });
// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext
});