import { groupsService } from "@/services/groups";
import { useQuery } from "@tanstack/react-query";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./shadcn/Tooltip";
import Image from "next/image";

interface Props {
  groupId: number;
}

// FIXME: This component is not working properly
export function GroupMembers({ groupId }: Props) {
  const groupQuery = useQuery({
    queryKey: ["groups", groupId],
    queryFn: () => groupsService.findById(groupId),
  });

  console.log(groupQuery.data?.data?.groupMembers);

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
