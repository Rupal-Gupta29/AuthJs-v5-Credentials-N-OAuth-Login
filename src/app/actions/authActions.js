"use server";
import { signOut, signIn } from "@/auth";
import { AuthError } from "next-auth";
import { signUpSchema } from "@/utils/authSchema";
import bcrypt from "bcryptjs";

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

export async function registerUserAction(userData) {
  // try {
  //   const { username, email, password, confirmPassword } = userData;
  //   const parsedCredentials = signUpSchema.safeParse(userData);
  //   if(!parsedCredentials.success){
  //   }
  //   const salt = await bcrypt.genSalt(10);
  //   const hashedPassword = await bcrypt.hash(password, salt);
  //   console.log("hashedpassword", hashedPassword);
  // } catch (error) {}
}

export async function SocialLoginAction(formData) {
  const action = formData.get("action");
  await signIn(action, { redirectTo: "/" });
}
