"use client";

import { AuthGuard } from "@/components/AuthGuard";
import { groupsService } from "@/services/groups";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

interface Props {
  params: {
    id: string;
  };
}

export default function GroupPage({ params: { id } }: Props) {
  const groupQuery = useQuery({
    queryKey: ["group", id],
    queryFn: () => groupsService.findById(parseInt(id)),
  });

  if (groupQuery.isPending) return <div>Loading...</div>;
  if (groupQuery.isError) return <div>Error</div>;

  return (
    <div className="flex flex-col items-center pt-4">
      <Image
        src={groupQuery.data.data.picture}
        alt="group"
        width={128}
        height={128}
        className="rounded-full border"
      />
      <p className="text-xl mt-4">{groupQuery.data.data.name}</p>
      <p className="text-neutral-700">{groupQuery.data.data.description}</p>
    </div>
  );
}
