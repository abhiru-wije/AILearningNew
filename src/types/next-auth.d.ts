import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      // add any other user fields you attach to the session
    } & DefaultSession["user"];
    access_token: string;
  }

  interface User {
    id: string;
    access_token: string;
    // add other fields if your backend sends them
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    access_token: string;
    // any other token fields
  }
}
