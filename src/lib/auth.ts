// =============================================================================
// NextAuth Configuration
// Credentials-based auth with JWT strategy and role-aware sessions
// =============================================================================

import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { db } from "@/lib/db";
import type { UserRole } from "@/lib/user-role";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: UserRole;
    };
  }

  interface User {
    role: UserRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: UserRole;
  }
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = credentials.email.trim().toLowerCase();
        const password = credentials.password;

        // Optional emergency admin login for environments where DB seed/users
        // are not ready yet (for example first Vercel deployment).
        const fallbackEmail = process.env.DEMO_ADMIN_EMAIL?.trim().toLowerCase();
        const fallbackPassword = process.env.DEMO_ADMIN_PASSWORD;

        if (fallbackEmail && fallbackPassword) {
          if (email === fallbackEmail && password === fallbackPassword) {
            return {
              id: "demo-admin",
              name: "Demo Admin",
              email: fallbackEmail,
              image: null,
              role: "ADMIN" as UserRole,
            };
          }
        }

        const user = await db.user.findUnique({
          where: { email },
        }) as {
          id: string;
          name?: string | null;
          email?: string | null;
          image?: string | null;
          role: UserRole;
          isActive?: boolean;
          hashedPassword?: string;
        } | null;

        if (!user || !user.hashedPassword || !user.isActive) return null;

        const isValid = await compare(
          password,
          user.hashedPassword,
        );

        if (!isValid) return null;

        return {
          id: String(user.id),
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
};
