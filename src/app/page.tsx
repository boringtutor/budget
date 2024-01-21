import Link from "next/link";

import { CreateUser } from "./_components/create-user";
import { CreateTransaction } from "./_components/create-transaction";

export default async function Home() {
  //const hello = await api.post.hello.query({ text: "from tRPC" });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <button className="mb-10 rounded-md bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20">
        <Link href="/about">About</Link>
      </button>

      <CrudShowcase />

      <br></br>
      <br></br>

      <TransactionShowcase />
    </main>
  );
}

async function CrudShowcase() {
  return (
    <div className="w-full max-w-xs">
      <CreateUser />
    </div>
  );
}

async function TransactionShowcase() {
  return (
    <div className="w-full max-w-xs">
      <CreateTransaction />
    </div>
  );
}
