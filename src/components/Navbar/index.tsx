import { User } from "@prisma/client";
import Link from "next/link";
import ProfilePicture from "../ProfilePicture";
import { getMeUserApi } from "@/server/api/users";

export default async function Navbar() {
  const me = (await getMeUserApi()) as User;

  return (
    <nav className="fixed flex h-20 w-screen items-center gap-4 bg-white/50 px-4 drop-shadow-lg backdrop-blur z-10">
      <p className="text-2xl font-bold hover:underline text-teal-500">PlanITLY</p>
      {me && (
        <Link href={`/users/${me.username}`} className="ml-auto">
          <ProfilePicture user={me} height={48} width={48} />
        </Link>
      )}
    </nav>
  );
}
