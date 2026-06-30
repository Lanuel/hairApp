"use server";

import { AuthError } from "next-auth";
import { signIn, signOut } from "@/auth";

export type LoginFormState = {
  error?: string;
};

function getSafeCallbackUrl(value: FormDataEntryValue | null) {
  if (typeof value !== "string") return "/admin/dashboard";
  if (!value.startsWith("/admin") || value.startsWith("/admin/login")) {
    return "/admin/dashboard";
  }

  return value;
}

export async function adminLogin(
  _prevState: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  try {
    await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirectTo: getSafeCallbackUrl(formData.get("callbackUrl")),
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Invalid admin username or password." };
    }

    throw error;
  }

  return {};
}

export async function adminLogout() {
  await signOut({ redirectTo: "/admin/login" });
}
