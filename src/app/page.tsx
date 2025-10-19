import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth-client";
import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";
import { toast } from "sonner";
import LogoutButton from "./logoutButton";


export default async function Home() {
  await requireAuth();
  const users = await caller.getUsers();
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {JSON.stringify(users)}
        <LogoutButton />
      </main>
    </div>
  );
}
