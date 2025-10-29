import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useWorkflows = () => {
    const trpc = useTRPC();
    return useSuspenseQuery(trpc.workflows.getAll.queryOptions());
};

export const useCreateWorkflow = () => {
    const trpc = useTRPC();
    const queryClient = useQueryClient();
    return useMutation(trpc.workflows.create.mutationOptions({
        onSuccess: (data) => {
            toast.success(`Workflow ${data.name} created`)
            queryClient.invalidateQueries(trpc.workflows.getAll.queryOptions());
        }
    }))
}