import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role?: "admin" | "customer";
      username?: string;
    } & DefaultSession["user"];
  }

  interface User {
    role: "admin" | "customer";
    username?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: "admin" | "customer";
    username?: string;
  }
}
