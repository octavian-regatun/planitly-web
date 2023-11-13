"use client";
import { GroupCard } from "@/components/GroupCard";
import { GroupSelector } from "@/components/GroupSelector";
import { NewGroupDialog } from "@/components/NewGroupDialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import { Group, groupsService } from "@/services/groups";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function GroupsPage() {
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

  const groupsQuery = useQuery({
    queryKey: ["groups"],
    queryFn: groupsService.find,
  });

  return (
    <div className="p-4 flex flex-wrap md:flex-nowrap gap-4">
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Groups</CardTitle>
          <CardDescription>Manage your groups here.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <NewGroupDialog />
          <GroupSelector
            value={selectedGroup}
            groups={groupsQuery.data?.data || []}
            onChange={group => setSelectedGroup(group)}
          />
        </CardContent>
      </Card>
      {selectedGroup && <GroupCard group={selectedGroup}></GroupCard>}
    </div>
  );
}
