"use client";

import { getEventApi } from "@/server/api/events";
import { Avatar, Tooltip } from "@mantine/core";

interface Props {
  event: NonNullable<Awaited<ReturnType<typeof getEventApi>>>;
}

export default function ParticipantsList({ event }: Props) {
  return (
    <Avatar.Group>
      {event.eventMembers.map(participant => (
        <Tooltip
          key={`participant-${participant.id}`}
          label={`${participant.user.firstName} ${participant.user.lastName}`}
        >
          <Avatar
            src={participant.user.image}
            alt={`avatar-${participant.user.firstName} ${participant.user.lastName}`}
            radius="xl"
          />
        </Tooltip>
      ))}
    </Avatar.Group>
  );
}
