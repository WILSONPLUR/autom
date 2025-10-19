import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../init";
import prisma from "@/lib/db";
import { inngest } from "@/inngest/client";

export const appRouter = createTRPCRouter({
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