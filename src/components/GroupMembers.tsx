import { useGetGroup } from "@/hooks/use-get-group";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./shadcn/Tooltip";

interface Props {
  groupId: number;
}

// FIXME: This component is not working properly
export function GroupMembers({ groupId }: Props) {
  const groupQuery = useGetGroup(groupId);

  return (
    <div className="flex gap-1">
      {groupQuery.data?.data?.groupMembers.map(member => (
        <TooltipProvider key={member.id}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Image
                src={member.user.picture}
                width={32}
                height={32}
                alt="profile"
                className="rounded-full border hover:brightness-90 transition-all"
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {member.user.firstName} {member.user.lastName}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
}
