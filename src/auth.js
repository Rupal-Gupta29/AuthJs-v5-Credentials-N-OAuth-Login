import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { loginSchema } from "./utils/authSchema";
import prisma from "./utils/prisma";
import bcrypt from "bcryptjs";

export const { signIn, signOut, auth, handlers } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Enter Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter password",
        },
      },
      async authorize(credentials) {
        const parsedCredentials = loginSchema.safeParse(credentials);

        if (!parsedCredentials.success) {
          console.log("Invalid data:", parsedCredentials.error.errors);
          return null;
        }

        const findUser = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!findUser) {
          console.log("User not found");
          return null;
        }

        if (!findUser.password) {
          console.log("User does not have a password set.");
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          findUser.password
        );

        if (!isPasswordValid) {
          console.log("Invalid Password");
          return null;
        }

        return { ...findUser };
      },
    }),
    Github({
      // profile(profile) {},
    }),
    Google,
  ],
  callbacks: {
    authorized({ request: { nextUrl }, auth }) {
      const publicRoutes = ["/auth/signin", "/auth/signup"];
      const protectedRoutes = ["/", "/admin"];
      const isLoggedIn = !!auth?.user;
      const { pathname } = nextUrl;

      if (publicRoutes.includes(pathname)) {
        if (isLoggedIn) {
          return Response.redirect(new URL("/", nextUrl));
        }
        return true;
      }
      if (protectedRoutes.includes(pathname) && !isLoggedIn) {
        return Response.redirect(new URL("/auth/signin", nextUrl));
      }

      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
});
