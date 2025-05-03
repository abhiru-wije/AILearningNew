import { API_ENDPOINTS } from "@/config/api";
import { jwtDecode } from "jwt-decode";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        // username: { label: "Username", type: "text" },
        // password: { label: "Password", type: "password" },
        userId: { label: "UserID", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        try {
          const res = await fetch(API_ENDPOINTS.CHILD_LOGIN, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: credentials.userId,
            }),
          });

          const user = await res.json();

          if (res.ok && user.access_token) {
            const { user: sessionUser } = user;

            console.log({ ...user, ...sessionUser });

            return { ...user, ...sessionUser };
          }

          return null;
        } catch (error) {
          console.error("Login error", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/children", // your custom login page
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.access_token = user.access_token;
        token.id = user.id;
        token.firstname = user.firstname;
        token.lastname = user.lastname;
        token.class = user.class;
        token.dob = user.dob;
      }

      if (token?.access_token) {
        try {
          const decoded: { exp: number } = jwtDecode(token.access_token);
          const isExpired = decoded.exp * 1000 < Date.now();

          if (isExpired) {
            throw new Error("Unauthorized: Token expired");
          }

          return token;
        } catch (error) {
          console.error("JWT decode/validation error:", error);
          throw new Error("Unauthorized");
        }
      }

      throw new Error("Unauthorized: No access token");
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.access_token = token.access_token;

        session.user.id = token.id;
        session.user.firstname = token.firstname;
        session.user.lastname = token.lastname;
        session.user.class = token.class;
        session.user.dob = token.dob;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
