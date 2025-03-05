"use server";
import { signOut, signIn } from "@/auth";
import { AuthError } from "next-auth";
import { signUpSchema } from "@/utils/authSchema";
import bcrypt from "bcryptjs";
import prisma from "@/utils/prisma";

export async function SignOutAction() {
  await signOut();
  return { success: true };
}

export async function CredentialsLoginAction(userData) {
  try {
    const findUser = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (!findUser) {
      return { error: "User does not exists. Please register yourself first." };
    }

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
    const { name, email, password } = userData;
    const parsedCredentials = signUpSchema.safeParse(userData);

    if (!parsedCredentials.success) {
      return { error: "Invalid credentials." };
    }

    const findUser = await prisma.user.findUnique({
      where: { email },
    });

    if (findUser) {
      return {
        error: "User already exists. Please log into your accout.",
      };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      name,
      email,
      password: hashedPassword,
    };

    const newlyCreatedUser = await prisma.user.create({
      data: newUser,
    });

    if (newlyCreatedUser) {
      return { success: true, message: "User created successfully." };
    }
  } catch (error) {
    console.log("error", error);
    return { error: "An unexpected error occured." };
  } finally {
    await prisma.$disconnect();
  }
}

export async function SocialLoginAction(formData) {
  const action = formData.get("action");
  await signIn(action, { redirectTo: "/" });
}
