"use client";

import { useActionState } from "react";
import {
  changeCustomerPassword,
  customerLogout,
  updateCustomerProfile,
  type AuthFormState,
} from "@/lib/customer/auth-actions";

type AccountProfileFormProps = {
  name: string;
  email: string;
  phone: string | null;
};

const initialState: AuthFormState = {};

const inputClassName =
  "w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-accent/60 transition-colors";

export default function AccountProfileForm({
  name,
  email,
  phone,
}: AccountProfileFormProps) {
  const [profileState, profileAction, profilePending] = useActionState(
    updateCustomerProfile,
    initialState,
  );
  const [passwordState, passwordAction, passwordPending] = useActionState(
    changeCustomerPassword,
    initialState,
  );

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <section className="rounded-lg border border-white/10 bg-white/[0.02] p-6">
        <h2 className="text-lg text-white mb-1">Profile</h2>
        <p className="text-sm text-white/60 mb-6">{email}</p>

        <form action={profileAction} className="space-y-4">
          {profileState.error ? (
            <p className="text-sm text-red-300">{profileState.error}</p>
          ) : null}
          {profileState.success ? (
            <p className="text-sm text-emerald-300">{profileState.success}</p>
          ) : null}

          <label className="block space-y-2">
            <span className="text-sm text-white/70">Full name</span>
            <input
              name="name"
              type="text"
              defaultValue={name}
              required
              className={inputClassName}
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm text-white/70">Phone (optional)</span>
            <input
              name="phone"
              type="tel"
              defaultValue={phone ?? ""}
              className={inputClassName}
            />
          </label>

          <button
            type="submit"
            disabled={profilePending}
            className="rounded-md bg-accent px-4 py-2.5 text-sm text-white hover:bg-accent/90 disabled:opacity-60"
          >
            {profilePending ? "Saving..." : "Save profile"}
          </button>
        </form>
      </section>

      <section className="rounded-lg border border-white/10 bg-white/[0.02] p-6">
        <h2 className="text-lg text-white mb-6">Change password</h2>

        <form action={passwordAction} className="space-y-4">
          {passwordState.error ? (
            <p className="text-sm text-red-300">{passwordState.error}</p>
          ) : null}
          {passwordState.success ? (
            <p className="text-sm text-emerald-300">{passwordState.success}</p>
          ) : null}

          <label className="block space-y-2">
            <span className="text-sm text-white/70">Current password</span>
            <input
              name="currentPassword"
              type="password"
              autoComplete="current-password"
              required
              className={inputClassName}
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm text-white/70">New password</span>
            <input
              name="newPassword"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              className={inputClassName}
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm text-white/70">Confirm new password</span>
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
            disabled={passwordPending}
            className="rounded-md border border-white/10 px-4 py-2.5 text-sm text-white hover:border-accent/50 disabled:opacity-60"
          >
            {passwordPending ? "Updating..." : "Update password"}
          </button>
        </form>

        <form action={customerLogout} className="mt-8 pt-6 border-t border-white/10">
          <button
            type="submit"
            className="text-sm text-white/60 hover:text-red-400 transition-colors"
          >
            Sign out
          </button>
        </form>
      </section>
    </div>
  );
}
