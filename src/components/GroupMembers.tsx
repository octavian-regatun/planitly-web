import { useGetGroup } from "@/hooks/use-get-group";
import Image from "next/image";
import Link from "next/link";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "./shadcn/hover-card";
import { CalendarIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import { startCase } from "lodash";

interface Props {
  groupId: number;
}

export function GroupMembers({ groupId }: Props) {
  const groupQuery = useGetGroup(groupId);

  return (
    <div className="flex gap-1">
      {groupQuery.data?.data?.groupMembers.map(member => (
        <HoverCard key={member.id}>
          <HoverCardTrigger asChild>
            <Link href={`/users/${member.userId}`}>
              <Image
                src={member.user.picture}
                width={32}
                height={32}
                alt="profile"
                className="rounded-full border hover:brightness-90 transition-all"
              />
            </Link>
          </HoverCardTrigger>
          <HoverCardContent className="flex flex-col text-base w-fit gap-4">
            <div className="flex justify-between space-x-4">
              <Image
                src={member.user.picture}
                alt="profile"
                width={40}
                height={40}
                className="w-[40px] h-[40px] rounded-full border"
              />
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">
                  @{member.user.username}
                </h4>
                <p className="text-sm">
                  Group {startCase(member.role.toLowerCase())}
                </p>
                <div className="flex items-center pt-2">
                  <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                  <span className="text-xs text-muted-foreground">
                    Joined {dayjs(member.createdAt).format("D MMMM, YYYY")}
                  </span>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  );
}
