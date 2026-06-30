"use client";

import Link from "next/link";
import { useActionState } from "react";
import { UserPlus } from "lucide-react";
import {
  customerRegister,
  type AuthFormState,
} from "@/lib/customer/auth-actions";

const initialState: AuthFormState = {};

const inputClassName =
  "w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-accent/60 transition-colors";

export default function CustomerRegisterForm() {
  const [state, formAction, pending] = useActionState(
    customerRegister,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-5">
      {state.error ? (
        <p className="rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {state.error}
        </p>
      ) : null}

      <label className="block space-y-2">
        <span className="text-sm text-white/70">Full name</span>
        <input
          name="name"
          type="text"
          autoComplete="name"
          required
          autoFocus
          className={inputClassName}
        />
      </label>

      <label className="block space-y-2">
        <span className="text-sm text-white/70">Email</span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          className={inputClassName}
        />
      </label>

      <label className="block space-y-2">
        <span className="text-sm text-white/70">Password</span>
        <input
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          className={inputClassName}
        />
      </label>

      <label className="block space-y-2">
        <span className="text-sm text-white/70">Confirm password</span>
        <input
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          className={inputClassName}
        />
      </label>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center cursor-pointer gap-2 rounded-md bg-accent px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-accent/90 disabled:opacity-60"
      >
        <UserPlus size={16} />
        <span>{pending ? "Creating account..." : "Create account"}</span>
      </button>

      <p className="text-center text-sm text-white/60">
        Already have an account?{" "}
        <Link href="/account/login" className="text-gold hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}
