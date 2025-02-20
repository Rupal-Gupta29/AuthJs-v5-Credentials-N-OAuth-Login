"use client";
import { SignOutAction } from "@/app/actions/authActions";

const SignOutBtn = () => {
  const handleLogout = async () => {
    await SignOutAction();
  };

  return (
    <div
      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2"
      onClick={handleLogout}
    >
      Logout
    </div>
  );
};

export default SignOutBtn;
