import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  console.log("sessionss", session);
  return <div>Hii {session.user.email}</div>;
}
