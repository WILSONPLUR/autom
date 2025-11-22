import { PAGINATION } from "@/config/constants";
import prisma from "@/lib/db";
import type { Node, Edge } from "@xyflow/react";
import {
  createTRPCRouter,
  premiumProcedure,
  protectedProcedure,
} from "@/trpc/init";
import { slugify } from "inngest";
import z from "zod";
import randomName from "@scaleway/random-name";
import { NodeType } from "@prisma/client";

export const workflowsRouter = createTRPCRouter({
  create: premiumProcedure.mutation(async ({ ctx }) => {
    return prisma.workflow.create({
      data: {
        name: slugify(randomName()),
        userId: ctx.auth.user.id,
        nodes: {
          create: {
            type: NodeType.INITIAL,
            position: { x: 0, y: 0 },
            name: NodeType.INITIAL,
          },
        },
      },
    });
  }),
  getOne: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const workflow = await prisma.workflow.findUniqueOrThrow({
        where: {
          id: input.id,
          userId: ctx.auth.user.id,
        },
        include: { nodes: true, connections: true },
      });
      const nodes: Node[] = workflow.nodes.map((node) => ({
        id: node.id,
        type: node.type,
        position: node.position as { x: number; y: number },
        data: (node.data as Record<string, unknown>) || {},
      }));
      const edges: Edge[] = workflow.connections.map((connection) => ({
        id: connection.id,
        source: connection.fromNodeId,
        target: connection.toNodeId,
        sourceHandle: connection.fromOutput,
        targetHandle: connection.toInput,
      }));
      return {
        id: workflow.id,
        name: workflow.name,
        nodes,
        edges,
      };
    }),
  getAll: protectedProcedure
    .input(
      z.object({
        page: z.number().default(PAGINATION.DEFAULT_PAGE),
        pageSize: z
          .number()
          .min(PAGINATION.MIN_PAGE_SIZE)
          .max(PAGINATION.MAX_PAGE_SIZE)
          .default(PAGINATION.DEFAULT_PAGE_SIZE),
        search: z.string().default(""),
      })
    )
    .query(async ({ ctx, input }) => {
      const { page, pageSize, search } = input;
      const [items, totalCount] = await Promise.all([
        prisma.workflow.findMany({
          skip: (page - 1) * pageSize,
          take: pageSize,
          where: {
            userId: ctx.auth.user.id,
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
          orderBy: {
            updatedAt: "desc",
          },
        }),
        prisma.workflow.count({
          where: {
            userId: ctx.auth.user.id,
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
        }),
      ]);
      const totalPages = Math.ceil(totalCount / pageSize);
      const hasNextPage = page < totalPages;
      const hasPreviousPage = page > 1;
      return {
        items,
        page,
        pageSize,
        totalCount,
        totalPages,
        hasNextPage,
        hasPreviousPage,
      };
    }),
  remove: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return prisma.workflow.delete({
        where: {
          id: input.id,
          userId: ctx.auth.user.id,
        },
      });
    }),
  updateName: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return prisma.workflow.update({
        where: {
          id: input.id,
          userId: ctx.auth.user.id,
        },
        data: {
          name: input.name,
        },
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        nodes: z.array(
          z.object({
            id: z.string(),
            type: z.string().nullish(),
            position: z.object({
              x: z.number(),
              y: z.number(),
            }),
            data: z.record(z.string(), z.any().optional()),
          })
        ),
        edges: z.array(
          z.object({
            source: z.string(),
            target: z.string(),
            sourceHandle: z.string().nullish(),
            targetHandle: z.string().nullish(),
          })
        ),
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, nodes, edges } = input;
      const workflow = await prisma.workflow.findUniqueOrThrow({
        where: { id, userId: ctx.auth.user.id },
      });

      // Transaction
      return prisma.$transaction(async (tx) => {
        // Delete existing connections first (due to foreign key constraints)
        await tx.connection.deleteMany({
          where: {
            workflowId: id,
          },
        });
        
        // Delete existing nodes
        await tx.node.deleteMany({
          where: {
            workflowId: id,
          },
        });
        
        // Create new nodes sequentially to ensure they exist before connections
        for (const node of nodes) {
          await tx.node.create({
            data: {
              id: node.id,
              workflowId: id,
              type: node.type as NodeType,
              name: node.type || "unknown",
              position: node.position,
              data: node.data || {},
            },
          });
        }
        
        // Create new connections only if there are edges
        if (edges.length > 0) {
          await tx.connection.createMany({
            data: edges.map((edge) => ({
              workflowId: id,
              fromNodeId: edge.source,
              toNodeId: edge.target,
              fromOutput: edge.sourceHandle || "main",
              toInput: edge.targetHandle || "main",
            })),
          });
        }
        
        // Update workflow's updateAt timestamp
        await tx.workflow.update({
          where: {
            id,
          },
          data: {
            updatedAt: new Date(),
          },
        });
        // Return workflow
        return workflow;
      });
    }),
});
