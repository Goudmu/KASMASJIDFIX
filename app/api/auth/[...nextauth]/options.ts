import { User2 } from "@/lib/mongodb/models";
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
            delete foundUser.password;
            return foundUser;
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
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token = user.token;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session?.user) {
        // Access the JWT token from the user object
        const jwtToken = session.user.jwt;
      }
      return session;
    },
  },
};
