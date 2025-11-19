import type { inferInput } from "@trpc/tanstack-react-query";
import { prefetch, trpc } from "@/trpc/server";
type Input = inferInput<typeof trpc.workflows.getAll>;

export const prefetchWorkflows = async (params: Input) => {
  return await prefetch(trpc.workflows.getAll.queryOptions(params));
};

export const prefetchWorkflow = async (id: string) => {
  return await prefetch(trpc.workflows.getOne.queryOptions({ id }));
};
