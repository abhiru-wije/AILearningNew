import { API_ENDPOINTS } from "@/config/api";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
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

          console.log(user);

          if (res.ok && user.access_token) {
            return { ...user };
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
        token.accessToken = user.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.access_token = token.access_token;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
