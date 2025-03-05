import NextAuth from "next-auth";
import prisma from "./utils/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./authConfig";

export const { signIn, signOut, auth, handlers } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  ...authConfig,
});
