"use server";
import { signOut, signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function SignOutAction() {
  await signOut({ redirectTo: "/auth/signin" });
}

export async function CredentialsLoginAction(userData) {
  try {
    await signIn("credentials", {
      ...userData,
      redirect: false,
    });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Invalid credentials!" };
    }
    return { error: "An unexpected error occurred." };
  }
}

export async function SocialLoginAction(formData) {
  const action = formData.get("action");
  await signIn(action, { redirectTo: "/" });
}
