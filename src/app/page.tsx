import prisma from "@/lib/db";
import Image from "next/image";

export default async function Home() {
  const user = await prisma.user.findMany();
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {JSON.stringify(user)}
        </main>
    </div>
  );
}
