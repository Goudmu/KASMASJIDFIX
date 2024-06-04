import { User2 } from "@/lib/mongodb/models";
import { connectToDB } from "@/lib/mongodb/utils";
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
          await connectToDB();
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
    async jwt({
      token,
      user,
      trigger,
      session,
    }: {
      token: any;
      user?: any;
      trigger?: "signIn" | "signUp" | "update" | undefined;
      session?: any;
    }) {
      if (trigger === "update") {
        return { ...token, ...session.user };
      }
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.role = user.role;
        token.password = user.password;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session?.user && token) {
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
