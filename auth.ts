import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { timingSafeEqual } from "crypto";
import { prisma } from "@/lib/prisma";

const ADMIN_ROLE = "admin" as const;
const CUSTOMER_ROLE = "customer" as const;

function secretsMatch(value: string, expected: string) {
  const valueBuffer = Buffer.from(value);
  const expectedBuffer = Buffer.from(expected);

  return (
    valueBuffer.length === expectedBuffer.length &&
    timingSafeEqual(valueBuffer, expectedBuffer)
  );
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt" },
  pages: {
    signIn: "/account/login",
  },
  providers: [
    Credentials({
      id: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const expectedUsername = process.env.ADMIN_USERNAME;
        const expectedPassword = process.env.ADMIN_PASSWORD;
        const username =
          typeof credentials?.username === "string"
            ? credentials.username.trim()
            : "";
        const password =
          typeof credentials?.password === "string"
            ? credentials.password
            : "";

        if (!expectedUsername || !expectedPassword) return null;

        const validUsername = secretsMatch(username, expectedUsername);
        const validPassword = secretsMatch(password, expectedPassword);

        if (!validUsername || !validPassword) return null;

        return {
          id: "admin",
          name: "Admin",
          email: expectedUsername,
          username: expectedUsername,
          role: ADMIN_ROLE,
        };
      },
    }),
    Credentials({
      id: "customer",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email =
          typeof credentials?.email === "string"
            ? credentials.email.trim().toLowerCase()
            : "";
        const password =
          typeof credentials?.password === "string"
            ? credentials.password
            : "";

        if (!email || !password) return null;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return null;

        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) return null;

        return {
          id: user.id,
          name: user.name ?? user.email,
          email: user.email,
          role: CUSTOMER_ROLE,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.username = user.username;
      }

      return token;
    },
    session({ session, token }) {
      session.user.id = token.sub ?? "";
      if (token.role === ADMIN_ROLE || token.role === CUSTOMER_ROLE) {
        session.user.role = token.role;
      }
      session.user.username =
        typeof token.username === "string" ? token.username : undefined;

      return session;
    },
  },
});
