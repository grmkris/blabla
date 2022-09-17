import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { z } from 'zod';
// @ts-ignore
import { Repeater } from 'repeaterdev-js'

export const SubscriptionSchema = z.object({
  subgraphUrl: z.string().url(),
  email: z.string().email(),
  user: z.string(),
  interval: z.number()
})

export type Subscription = z.infer<typeof SubscriptionSchema>;

export const appRouter = trpc
  .router()
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
  .query('subscribe', {
    input: SubscriptionSchema,
    async resolve({ input }) {
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
  createContext: () => null,
});