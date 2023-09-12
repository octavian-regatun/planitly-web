import { usersService } from "@/services/users";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

interface Props {
  id: number;
}

export function PublicUserProfile({ id }: Props) {
  const userQuery = useQuery({
    queryKey: ["users", id],
    queryFn: () => usersService.findById(id),
  });

  if (userQuery.isPending) return <div>Loading...</div>;
  if (userQuery.isError) return <div>{userQuery.error.message}</div>;

  return (
    <div className="flex flex-col items-center pt-4">
      <Image
        src={userQuery.data.picture}
        alt="asd"
        width={128}
        height={128}
        className="rounded-full border"
      />
      <p className="text-xl mt-4">
        {userQuery.data.firstName} {userQuery.data.lastName}
      </p>
      <p className="text-neutral-500">@{userQuery.data.username}</p>
    </div>
  );
}
