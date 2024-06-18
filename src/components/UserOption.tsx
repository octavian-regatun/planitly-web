import { User } from "@prisma/client";
import Image from "next/image";
import React, { FC } from "react";
import { api } from "~/trpc/react";

type Props = {
  userId: string;
};

const UserOption: FC<Props> = ({ userId }) => {
  const { data: user } = api.users.getById.useQuery({ id: userId });

  return (
    <div className="flex items-center gap-4">
      {user?.image && (
        <Image
          height={24}
          width={24}
          src={user.image}
          alt={user.name || "profile"}
          className="rounded-full"
        />
      )}
      {user?.name}
    </div>
  );
};

export default UserOption;
