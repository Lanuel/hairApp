"use client";

import Link from "next/link";
import { useActionState } from "react";
import { LogIn } from "lucide-react";
import { customerLogin, type AuthFormState } from "@/lib/customer/auth-actions";

type CustomerLoginFormProps = {
  callbackUrl?: string;
};

const initialState: AuthFormState = {};

const inputClassName =
  "w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-accent/60 transition-colors";

export default function CustomerLoginForm({
  callbackUrl = "/account",
}: CustomerLoginFormProps) {
  const [state, formAction, pending] = useActionState(
    customerLogin,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-5">
      {state.error ? (
        <p className="rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {state.error}
        </p>
      ) : null}

      <input type="hidden" name="callbackUrl" value={callbackUrl} />

      <label className="block space-y-2">
        <span className="text-sm text-white/70">Email</span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          autoFocus
          className={inputClassName}
        />
      </label>

      <label className="block space-y-2">
        <span className="text-sm text-white/70">Password</span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={inputClassName}
        />
      </label>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center cursor-pointer justify-center gap-2 rounded-md bg-accent px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-accent/90 disabled:opacity-60"
      >
        <LogIn size={16} />
        <span>{pending ? "Signing in..." : "Sign in"}</span>
      </button>

      <p className="text-center text-sm text-white/60">
        Don&apos;t have an account?{" "}
        <Link href="/account/register" className="text-gold hover:underline">
          Create one
        </Link>
      </p>
    </form>
  );
}
