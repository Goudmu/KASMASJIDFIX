import { User2 } from "@/lib/mongodb/models";
import { User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialProvider from "next-auth/providers/credentials";

export const options = {
  providers: [
    CredentialProvider({
      name: "Credential",
      credentials: {
        email: {
          label: "email:",
          type: "text",
          placeholder: "your email",
        },
        password: {
          label: "password:",
          type: "password",
          placeholder: "your password",
        },
        username: {
          label: "username:",
          type: "text",
          placeholder: "your username",
        },
        isAdmin: {
          label: "is Admin :",
          type: "text",
          placeholder: "is Admin ?",
        },
      },
      async authorize(credentials) {
        try {
          const foundUser = await User2.findOne({
            username: credentials?.username,
          });
          if (foundUser) {
            const user = {
              id: foundUser._id.toString(),
              username: foundUser.username,
              email: foundUser.email,
              role: foundUser.role,
              password: foundUser.password,
            };
            return user;
          }
          if (!foundUser) {
            console.error("Invalid username or password");
            throw new Error("Invalid username or password");
          }
        } catch (error: any) {
          console.log(error);
          throw new Error(error);
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt(params: {
      token: JWT;
      user: User | null;
      trigger?: "signIn" | "signUp" | "update" | undefined;
      session?: any;
    }) {
      const { token, user, trigger, session } = params;
      if (trigger === "update") {
        return { ...token, ...session.user };
      }
      if (user) {
        if ("username" in user) {
          token.username = user.username;
        }
        if ("role" in user) {
          token.role = user.role;
        }
        if ("password" in user) {
          token.password = user.password;
        }
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.role = token.role;
        session.user.password = token.password;
      }
      return session;
    },
  },
};
