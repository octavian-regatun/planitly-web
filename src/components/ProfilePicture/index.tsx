import { User } from "@prisma/client";
import { cx } from "class-variance-authority";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

interface Props {
  user: User;
  height: number;
  width: number;
  className?: string;
}

export default function ProfilePicture({
  user,
  height = 32,
  width = 32,
  className,
}: Props) {
  return (
    <Image
      className={twMerge(
        cx("rounded-full transition-all hover:brightness-75", className)
      )}
      height={height}
      width={width}
      src={user.image}
      alt="profile picture"
    />
  );
}
