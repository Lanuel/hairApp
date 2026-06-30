"use server";

import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { signIn, signOut } from "@/auth";
import { mergeGuestCartIntoUserCart } from "@/lib/cart.server";
import { requireCustomerAction } from "@/lib/customer/auth";
import { prisma } from "@/lib/prisma";

export type AuthFormState = {
  error?: string;
  success?: string;
};

function getSafeCallbackUrl(value: FormDataEntryValue | null) {
  if (typeof value !== "string") return "/account";
  if (!value.startsWith("/account") || value.startsWith("/account/login")) {
    return "/account";
  }

  return value;
}

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(password: string) {
  if (password.length < 8) {
    return "Password must be at least 8 characters.";
  }

  return null;
}

export async function customerLogin(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const emailValue = formData.get("email");
  const passwordValue = formData.get("password");
  const email =
    typeof emailValue === "string" ? emailValue.trim().toLowerCase() : "";
  const password = typeof passwordValue === "string" ? passwordValue : "";

  try {
    const user = email
      ? await prisma.user.findUnique({ where: { email } })
      : null;
    const validPassword = user
      ? await bcrypt.compare(password, user.passwordHash)
      : false;

    if (user && validPassword) {
      await mergeGuestCartIntoUserCart(user.id);
    }

    await signIn("customer", {
      email,
      password,
      redirectTo: getSafeCallbackUrl(formData.get("callbackUrl")),
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Invalid email or password." };
    }

    throw error;
  }

  return {};
}

export async function customerRegister(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (!name) {
    return { error: "Please enter your name." };
  }

  if (!validateEmail(email)) {
    return { error: "Please enter a valid email address." };
  }

  const passwordError = validatePassword(password);
  if (passwordError) {
    return { error: passwordError };
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match." };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { error: "An account with this email already exists." };
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
    },
  });

  await mergeGuestCartIntoUserCart(user.id);

  try {
    await signIn("customer", {
      email,
      password,
      redirectTo: "/account",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Account created, but sign-in failed. Please log in." };
    }

    throw error;
  }

  return {};
}

export async function customerLogout() {
  await signOut({ redirectTo: "/" });
}

export async function updateCustomerProfile(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const session = await requireCustomerAction();
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();

  if (!name) {
    return { error: "Please enter your name." };
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      name,
      phone: phone || null,
    },
  });

  revalidatePath("/account");

  return { success: "Profile updated." };
}

export async function changeCustomerPassword(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const session = await requireCustomerAction();
  const currentPassword = String(formData.get("currentPassword") ?? "");
  const newPassword = String(formData.get("newPassword") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) {
    return { error: "Account not found." };
  }

  const validCurrent = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!validCurrent) {
    return { error: "Current password is incorrect." };
  }

  const passwordError = validatePassword(newPassword);
  if (passwordError) {
    return { error: passwordError };
  }

  if (newPassword !== confirmPassword) {
    return { error: "New passwords do not match." };
  }

  const passwordHash = await bcrypt.hash(newPassword, 12);

  await prisma.user.update({
    where: { id: user.id },
    data: { passwordHash },
  });

  return { success: "Password updated." };
}
