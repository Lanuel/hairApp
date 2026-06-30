"use client";

import { useActionState } from "react";
import { LogIn } from "lucide-react";
import { adminLogin, type LoginFormState } from "@/lib/admin/auth-actions";

type AdminLoginFormProps = {
  callbackUrl: string;
};

const initialState: LoginFormState = {};

export default function AdminLoginForm({ callbackUrl }: AdminLoginFormProps) {
  const [state, formAction, pending] = useActionState(adminLogin, initialState);

  return (
    <form action={formAction} className="admin-login-form">
      {state.error ? (
        <p className="admin-alert admin-alert-error">{state.error}</p>
      ) : null}

      <input type="hidden" name="callbackUrl" value={callbackUrl} />

      <label className="admin-field">
        <span>Username</span>
        <input
          name="username"
          type="text"
          autoComplete="username"
          required
          autoFocus
        />
      </label>

      <label className="admin-field">
        <span>Password</span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
      </label>

      <button
        type="submit"
        className="admin-btn admin-btn-primary admin-login-submit cursor-pointer"
        disabled={pending}
      >
        <LogIn size={18} />
        <span>{pending ? "Signing in..." : "Sign in"}</span>
      </button>
    </form>
  );
}
