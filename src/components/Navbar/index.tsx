import { User } from "@prisma/client";
import Link from "next/link";
import ProfilePicture from "../ProfilePicture";
import { getMeUserApi } from "@/server/api/users";

export default async function Navbar() {
  const me = (await getMeUserApi()) as User;

  return (
    <nav className="fixed z-10 flex h-20 w-screen items-center gap-4 bg-white/50 px-4 drop-shadow-lg backdrop-blur">
      <p className="text-2xl font-bold text-teal-500 hover:underline">
        PlanITLY
      </p>
      {me && (
        <Link href={`/users/${me.username}`} className="ml-auto">
          <ProfilePicture user={me} height={48} width={48} />
        </Link>
      )}
    </nav>
  );
}
