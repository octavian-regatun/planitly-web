import ProfilePicture from "@/components/ProfilePicture";
import ImageList from "@/components/UsersPage/ImageList";
import ProfileButtons from "@/components/UsersPage/ProfileButtons";
import ProfileSectionToggle from "@/components/UsersPage/ProfileSectionToggle";
import { getUserByUsernameApi } from "@/server/api/users";
import { User } from "@prisma/client";
import Image from "next/image";

interface Props {
  params: {
    username: string;
  };
}

export default async function UserPage({ params }: Props) {
  const { username } = params;

  const user = (await getUserByUsernameApi(username)) as User;

  return (
    <div className="flex flex-col items-center">
      <Image
        src="https://placehold.co/1920x1080.png"
        className="aspect-video"
        height={1920}
        width={1080}
        alt="profile cover"
      />
      <div className="relative -top-8 flex w-full flex-col items-center rounded-t-3xl bg-white">
        <ProfilePicture
          user={user}
          height={128}
          width={128}
          className="relative -top-16 mb-4"
        />
        <p className="-mt-16 text-2xl">
          {user?.firstName} {user?.lastName}
        </p>
        <p className="text-neutral-500">@{username}</p>
        <ProfileButtons />
        <ProfileSectionToggle />
        <ImageList />
      </div>
    </div>
  );
}
