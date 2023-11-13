"use client";

import { QueryError } from "@/components/QueryError";
import { UsersList } from "@/components/UsersList";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import { useGetEvent } from "@/hooks/use-get-event";
import { CalendarIcon, MapPinIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";

interface Props {
  params: {
    id: string;
  };
}

export default function EventPage({ params: { id } }: Props) {
  const { data, isPending, isError, error } = useGetEvent({ id: parseInt(id) });

  if (isError) return <QueryError message={error.message} />;
  if (isPending) return <div>Loading...</div>;

  const participants = data.response.groups
    .map(group => group.groupMembers)
    .flat()
    .map(groupMember => groupMember.user);

  console.log(participants);

  return (
    <div className="flex flex-col pt-4 md:pt-16 mx-auto px-4 gap-4 max-w-screen-sm">
      <Card>
        <CardHeader>
          <CardTitle>{data.response.title}</CardTitle>
          <CardDescription>{data.response.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 flex-col">
            <p className="flex items-center gap-2 text-sm">
              <CalendarIcon className="w-4 h-4" />
              {dayjs(data.response.startAt).format("D MMM, YYYY")} -{" "}
              {dayjs(data.response.endAt).format("D MMM, YYYY")}
            </p>
            <p className="flex items-center gap-2 text-sm">
              <MapPinIcon className="w-4 h-4" />
              Master Club, Iasi
            </p>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium">
                Participants
              </p>
              <UsersList users={participants} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
