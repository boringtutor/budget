"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "@/trpc/react";

const testUserId = "clrn55kf9000659hsmhf4wqs7";

export function CreateTransaction() {
  const router = useRouter();
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");

  const CreateTransaction = api.transaction.create.useMutation({
    onSuccess: () => {
      console.log("onSuccess");
      router.refresh();
      setAmount(0);
      setCategory("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log("submit");
        console.log(e);

        CreateTransaction.mutate({
          amount,
          categoryId: "GIFT",
          userId: testUserId,
        });
      }}
      className="flex flex-col gap-2"
    >
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        required
        onChange={(e) => setAmount(parseInt(e.target.value))}
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        required
        onChange={(e) => setCategory(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black"
      />

      <button
        type="submit"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={CreateTransaction.isLoading}
      >
        {CreateTransaction.isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
