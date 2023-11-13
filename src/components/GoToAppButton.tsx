import { User } from "@/services/users";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "./shadcn/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./shadcn/tooltip";
import Link from "next/link";

interface Props {
  user: User;
}

export function GoToAppButton({ user }: Props) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button asChild>
            <Link href="/dashboard">
              Go To App <ArrowRightIcon className="h-4 w-4 ml-auto" />
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent className="flex flex-col items-center gap-2">
          Logged in as:
          <div className="flex items-center">
            <Image
              src={user.picture}
              alt="profile"
              width={24}
              height={24}
              className="mr-2 rounded-full border"
            />
            {user.firstName} {user.lastName}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
