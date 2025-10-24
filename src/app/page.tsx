'use client';
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth-client";
import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";
import { toast } from "sonner";
import LogoutButton from "./logoutButton";
import FlowButton from "./flowButton";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";


export default function Home() {
  const trpc = useTRPC();
  const results = useQueries({
    queries: [
      trpc.getWorkflows.queryOptions(),
      trpc.aiTest.queryOptions({prompt: "Generate text about song Romantic Homicide d4vd"}),
    ]
  });
  const create = useMutation(trpc.createWorkflow.mutationOptions());
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {JSON.stringify(results[0].data, null, 2)}
        <span>Your generated text: {results[1].data}</span>
        <FlowButton onClick={() => create.mutate({name: "yo"})} />
        <LogoutButton />
      </main>
    </div>
  );
}
