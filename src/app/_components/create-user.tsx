"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "@/trpc/react";

export function CreateUser() {
  const router = useRouter();
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const createUser = api.createUser.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setName("");
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log("submit");
        console.log(e);
        createUser.mutate({
          username,
          email,
          password,
          firstName,
          lastName,
        });
      }}
      className="flex flex-col gap-2"
    >
      <input
        type="text"
        placeholder="Title"
        value={username}
        required
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        required
        onChange={(e) => setPassword(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black"
      />

      <input
        type="firstName"
        placeholder="FirstName"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <input
        type="lastName"
        placeholder="LastName"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black"
      />

      <button
        type="submit"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={createUser.isLoading}
      >
        {createUser.isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
