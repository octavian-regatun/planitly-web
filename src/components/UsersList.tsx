import { PublicUser } from "@/services/users";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./shadcn/tooltip";

interface Props {
  users: PublicUser[];
}

export function UsersList({ users }: Props) {
  return (
    <div className="flex gap-2">
      {users.map(user => (
        <TooltipProvider key={`users-list-${user.id}`}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Image
                src={user.picture}
                width={32}
                height={32}
                alt="profile"
                className="rounded-full border hover:brightness-90 transition-all"
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {user.firstName} {user.lastName}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
}
