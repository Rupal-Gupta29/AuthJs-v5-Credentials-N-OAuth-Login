import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { loginSchema } from "./utils/authSchema";

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
        console.log("credentialss", credentials);
        let user = null;

        //get and validate the user

        const parsedCredentials = loginSchema.safeParse(credentials);

        if (!parsedCredentials.success) {
          console.log("Invalid credentials:", parsedCredentials.error.errors);
          return null;
        }

        user = {
          id: 1,
          name: "Test",
          email: credentials.email,
          role: "User",
        };

        if (!user) {
          return null;
        }

        return user;
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
