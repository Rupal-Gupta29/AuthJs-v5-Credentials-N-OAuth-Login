import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { SocialLoginAction } from "@/app/actions/authActions";

const SocialLoginForm = () => {
  return (
    <form action={SocialLoginAction}>
      <button
        className="w-full text-gray-500 bg-transparent hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2 text-center border border-gray-400 flex items-center justify-center gap-3"
        type="submit"
        name="action"
        value="github"
      >
        <FaGithub className="text-xl" />
        <span> Sign in with GitHub</span>
      </button>
      <button
        className="w-full text-gray-500 bg-transparent hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2 text-center border border-gray-400 flex items-center justify-center gap-3 mt-2"
        type="submit"
        name="action"
        value="google"
      >
        <FcGoogle className="text-xl" />
        <span>Sign in with Google</span>
      </button>
    </form>
  );
};

export default SocialLoginForm;
