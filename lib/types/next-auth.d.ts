// types/next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser, DefaultJWT } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id?: string | null;
      username?: string | null;
      email?: string | null;
      role?: number | null;
      password?: string | null;
      image?: string | null;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id?: string;
    isAdmin?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id?: string;
    isAdmin?: boolean;
  }
}
