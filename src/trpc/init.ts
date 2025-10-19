import { initTRPC, TRPCError } from '@trpc/server';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { cache } from 'react';
 
export const createTRPCContext = () => cache(async () => {
    return {
        userId: '123',
    }
}); // no context
/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.create();
 
/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const createTRPCRouter = t.router;
export const baseProcedure = t.procedure;
export const protectedProcedure = baseProcedure.use(async ({ctx, next}) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session) {
        throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'You must be logged in to access this resource.',
        });
    }
    return next({ctx: {...ctx, auth: session}});
})