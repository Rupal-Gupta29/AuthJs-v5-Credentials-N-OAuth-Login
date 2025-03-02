"use server";
import { signOut, signIn } from "@/auth";
import { AuthError } from "next-auth";
import { signUpSchema } from "@/utils/authSchema";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

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
  try {
    const { username, email, password, confirmPassword } = userData;
    const parsedCredentials = signUpSchema.safeParse(userData);

    if (!parsedCredentials.success) {
      return { error: "Invalid credentials." };
    }

    const prisma = new PrismaClient();
    const findUser = await prisma.user.findUnique({
      where: { email },
    });

    console.log("finduserr", findUser);

    if (findUser) {
      return {
        error: "User already exists. Please try with a different email.",
      };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("hashedpassword", hashedPassword);

    const newUser = {
      username,
      email,
      password: hashedPassword,
    };

    const newlyCreatedUser = await prisma.user.create({
      data: newUser,
    });

    if (newlyCreatedUser) {
      console.log("newlyCreatedUser", newlyCreatedUser);
      return { success: true, message: "User created successfully." };
    }
  } catch (error) {
    console.log("error", error);
    return { error: "An unexpected error occured." };
  }
}

export async function SocialLoginAction(formData) {
  const action = formData.get("action");
  await signIn(action, { redirectTo: "/" });
}
