"use server";
import { signOut, signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function SignOutAction() {
  await signOut({ redirectTo: "/auth/signin" });
}

export async function CredentialsLoginAction(userData) {
  const { email, password } = userData;

  try {
    await signIn("credentials", { email, password, redirectTo: "/" });
  } catch (error) {
    console.log("signin error", error);
    if (error instanceof AuthError) {
      console.error("Auth Error:", error.message);
    } else {
      console.error("Unexpected Error:", error.message);
    }
    throw error;
  }
}

export async function SocialLoginAction(formData) {
  const action = formData.get("action");
  await signIn(action, { redirectTo: "/" });
}
