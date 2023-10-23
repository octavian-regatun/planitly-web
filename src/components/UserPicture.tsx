import { useGetUser } from "@/hooks/use-get-user";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

interface Props {
  userId: number;
  size: number;
  className?: string;
}

export function UserPicture({ userId, size, className }: Props) {
  const { data: user, isPending, isError } = useGetUser(userId);

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <Image
      src={user.picture}
      alt={`${user.firstName} ${user.lastName} picture`}
      width={size}
      height={size}
      style={{
        minWidth: size,
        minHeight: size,
        maxWidth: size,
        maxHeight: size,
      }}
      className={twMerge(
        "rounded-full border hover:brightness-90 transition-all",
        className
      )}
    />
  );
}
