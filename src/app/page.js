import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  return (
    <div>
      <h1>Hii {session.user.name}</h1>
      <p>{session.user.email}</p>
    </div>
  );
}
