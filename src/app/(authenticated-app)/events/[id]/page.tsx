"use client";

import { GroupMembers } from "@/components/GroupMembers";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/Card";
import { useGetEvent } from "@/hooks/use-get-event";
import { CalendarIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import Image from "next/image";

interface Props {
  params: {
    id: string;
  };
}

export default function EventPage({ params: { id } }: Props) {
  const getEvent = useGetEvent({ id: parseInt(id) });

  if (getEvent.isPending) return <div>Loading...</div>;
  if (getEvent.isError) return <div>Error</div>;

  return (
    <div className="flex flex-col pt-4 md:pt-16 mx-auto px-4 gap-4 max-w-screen-sm">
      <Card>
        <CardHeader>
          <CardTitle>{getEvent.data.title}</CardTitle>
          <CardDescription>{getEvent.data.description}</CardDescription>
        </CardHeader>
        {/* display start and end time of the event */}
        <CardContent>
          <p className="flex items-center gap-2">
            <CalendarIcon className="w-6 h-6" />
            {dayjs(getEvent.data.startAt).format("D MMM, YYYY")} -{" "}
            {dayjs(getEvent.data.endAt).format("D MMM, YYYY")}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
