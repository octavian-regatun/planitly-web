import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./shadcn/Tooltip";
import { useQuery } from "@tanstack/react-query";
import { usersService } from "@/services/users";
import { Skeleton } from "./shadcn/Skeleton";

interface Props {
  userId: number;
}

export function UserIcon({ userId }: Props) {
  const userQuery = useQuery({
    queryKey: ["user", userId],
    queryFn: () => usersService.findById(userId),
  });

  if (userQuery.isPending) return <Skeleton className="w-8 h-8" />;
  if (userQuery.isError) return <div>Error</div>;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Image
            src={userQuery.data.picture}
            width={32}
            height={32}
            alt="profile"
            className="rounded-full border hover:brightness-90 transition-all"
          />
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {userQuery.data.firstName} {userQuery.data.lastName}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
