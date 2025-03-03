"use client";
import Link from "next/link";
import { CredentialsLoginAction } from "@/app/actions/authActions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/utils/authSchema";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (data) => {
    try {
      setErrorMsg("");
      const response = await CredentialsLoginAction(data);
      if (response?.success) {
        router.push("/");
        return;
      } else if (response?.error) {
        if (
          response.error ===
          "User does not exists. Please register yourself first."
        ) {
          toast.error(response.error);
          router.push("/auth/signup");
          return;
        }
        console.log("Error", response.error);
        setErrorMsg(response.error || "Something went wrong.");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Your email
        </label>
        <input
          type="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          {...register("email")}
        />
        {errors.email && (
          <p className="mt-2 text-sm text-red-600">{errors?.email?.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          {...register("password")}
        />
        {errors.password && (
          <p className="mt-2 text-sm text-red-600">
            {errors?.password?.message}
          </p>
        )}
      </div>
      <button
        type="submit"
        className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Signing in..." : "Sign in"}
      </button>
      {errorMsg && <p className="mt-2 text-sm text-red-600">{errorMsg}</p>}
      <p className="text-sm font-light text-gray-500">
        Don’t have an account yet?{" "}
        <Link
          href="/auth/signup"
          className="font-medium text-primary-600 hover:underline"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
};

export default SignInForm;
