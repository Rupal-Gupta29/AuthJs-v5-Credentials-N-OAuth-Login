import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required." })
    .email("Email is not valid.")
    .min(1, "Email is required."),
  password: z
    .string({ required_error: "Password is required." })
    .min(6, "Password must be at least 6 characters long.")
    .min(1, "Password is required."),
});

export const signUpSchema = z
  .object({
    username: z
      .string({ required_error: "Username is required." })
      .min(2, "Username must have 2 or more characters.")
      .max(20, "Username must have atmost 20 characters."),
    email: z
      .string({ required_error: "Email is required." })
      .email("Email is not valid.")
      .min(1, "Email is required."),
    password: z
      .string({ required_error: "Password is required." })
      .min(6, "Password must be at least 6 characters long.")
      .min(1, "Password is required."),
    confirmPassword: z
      .string({ required_error: "Confirm password is required." })
      .min(1, "Confirm password is required."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and confirm password does not match.",
    path: ["confirmPassword"],
  });
