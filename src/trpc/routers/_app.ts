import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../init';
import { TRPCError } from '@trpc/server';

export const appRouter = createTRPCRouter({
    hello: protectedProcedure
    .input(
        z.object({
            text: z.string(),
        }),
    )
    .query((opts) => {
        console.log({ dbUser: opts.ctx.user });
        
        return {
            greeting: `Hello ${opts.input.text}`,
        };
    }),
});

//export type definition of API
export type AppRouter = typeof appRouter;