import SignOutBtn from "./SignOutBtn";
import { auth } from "@/auth";

const Navbar = async () => {
  const session = await auth();

  console.log("sessionss from navbar", session);

  return (
    <div className="flex justify-between px-4 py-2 items-center">
      <div>
        <h1 className="text-2xl font-bold">Auth Js</h1>
      </div>
      <div className="flex gap-2">{session && <SignOutBtn />}</div>
    </div>
  );
};

export default Navbar;
