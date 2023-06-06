"use client";

import { deleteEvent } from "@/api/events";
import { Event } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface Props {
  event: Event;
}

export default function AdminButtons({ event }: Props) {
  const deleteMutation = useMutation({ mutationFn: deleteEvent });
  const router = useRouter();

  const onDelete = () => {
    deleteMutation.mutateAsync({ eventId: event.id }).then(() => {
      router.push("/events");
      router.refresh();
    });
  };

  return (
    <div className="flex w-fit flex-col gap-2 self-center">
      <button className="w-fit self-center rounded border border-teal-500 bg-teal-500 px-4 py-2 text-white transition-colors hover:bg-white hover:text-teal-500">
        Edit Event
      </button>
      <button
        className="w-full self-center rounded bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
        onClick={onDelete}
      >
        Delete
      </button>
    </div>
  );
}
