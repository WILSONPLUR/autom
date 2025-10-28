import { z } from "zod";
import { createTRPCRouter, premiumProcedure, protectedProcedure } from "../init";
import prisma from "@/lib/db";
import { inngest } from "@/inngest/client";
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';


export const appRouter = createTRPCRouter({
  aiTest: premiumProcedure
  .mutation(async () => {
    await inngest.send({
      name: "test/execute.ai",
    })
    return {success: true, message: "Job queued"};
  }),
  getWorkflows: protectedProcedure.query(async () => {
      return await prisma.workflow.findMany();
  }),
  createWorkflow: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input }) => {
      await inngest.send({
        name: "test/hello.world",
        data: {
          email: "yourshows12@gmail.com",
        }
      })
      return await prisma.workflow.create({
        data: {
          name: input.name,
        }
      })
    })
});

// export type definition of API
export type AppRouter = typeof appRouter;