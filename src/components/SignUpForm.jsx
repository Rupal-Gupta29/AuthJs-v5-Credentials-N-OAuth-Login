"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/utils/authSchema";
import { registerUserAction } from "@/app/actions/authActions";
import { toast } from "react-toastify";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(signUpSchema) });

  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      setErrorMsg("");
      const result = await registerUserAction(data);
      if (result.success) {
        toast.success(result.message);
        router.push("/auth/signin");
      } else if (result.error) {
        setErrorMsg(result.error || "Something went wrong");
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
          Username
        </label>
        <input
          type="text"
          id="username"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          {...register("username")}
        />
        {errors.username && (
          <p className="mt-2 text-sm text-red-600">
            {errors?.username?.message}
          </p>
        )}
      </div>
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
      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Confirm password
        </label>
        <input
          type="password"
          id="confirmPassword"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="mt-2 text-sm text-red-600">
            {errors?.confirmPassword?.message}
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
        Already have an account?{" "}
        <Link
          href="/auth/signin"
          className="font-medium text-primary-600 hover:underline"
        >
          Sign In
        </Link>
      </p>
    </form>
  );
};

export default SignUpForm;
