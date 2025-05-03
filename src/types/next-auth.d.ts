import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      // add any other user fields you attach to the session

      firstname: string;
      lastname: string;
      class: string;
      dob: string;
    } & DefaultSession["user"];
    access_token: string;
  }

  interface User {
    id: string;
    access_token: string;
    firstname: string;
    lastname: string;
    class: string;
    dob: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    access_token: string;

    firstname: string;
    lastname: string;
    class: string;
    dob: string;
    // any other token fields
  }
}
