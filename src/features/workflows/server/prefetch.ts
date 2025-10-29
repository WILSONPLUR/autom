import type { inferInput } from "@trpc/tanstack-react-query"; 
import { prefetch, trpc } from "@/trpc/server";
type Input = inferInput<typeof trpc.workflows.getAll>;


export const prefetchworkflows = (params: Input) => {
return prefetch(trpc.workflows.getAll.queryOptions (params))
}