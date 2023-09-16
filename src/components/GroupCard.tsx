import { Group } from "@/services/groups";
import { Card, CardContent, CardHeader, CardTitle } from "./shadcn/Card";
import Image from "next/image";
import { GroupMembers } from "./GroupMembers";

interface Props {
  group: Group;
}

export function GroupCard({ group }: Props) {
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Image
            src={group.picture}
            alt="profile"
            width={32}
            height={32}
            className="rounded-full"
          />
          <span>{group.name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p className="text-neutral-700">{group.description}</p>
        <div>
          <p className="font-semibold">Members</p>
          <GroupMembers groupId={group.id} />
        </div>
      </CardContent>
    </Card>
  );
}
