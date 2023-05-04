import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { ClockIcon, MapPinIcon, UserGroupIcon } from "@heroicons/react/24/solid"
import type { inferRouterOutputs } from "@trpc/server"
import { format } from "date-fns"
import { useSession } from "next-auth/react"
import Link from "next/link"
import type { FC, MouseEvent } from "react"
import { useMemo } from "react"
import type { eventsRouter } from "../../server/api/routers/events"
import { api } from "../../utils/api"
import { EventParticipants } from "./EventParticipantsList"

type Event = inferRouterOutputs<typeof eventsRouter>["getEvents"][number]

export const EventCard: FC<{ event: Event }> = ({ event }) => {
  const session = useSession()

  const currentUserEventMember = useMemo(
    () => event.EventMember.find(x => x.userId === session.data?.user.id),
    [event.EventMember, session.data?.user.id]
  )

  return (
    <Link
      href={`/events/${event.id}`}
      className="flex flex-col gap-4 rounded-2xl bg-amber-200 p-4 drop-shadow-lg"
    >
      {currentUserEventMember?.status === "PENDING" && (
        <EventPendingInvitation eventId={event.id} />
      )}
      <p className="text-lg font-bold text-gray-800">{event.name}</p>
      {event.location && (
        <div className="flex items-center gap-2 text-left text-sm">
          <MapPinIcon className="h-4 w-4 text-gray-800" />
          <p>{event.location.name}</p>
        </div>
      )}
      <div className="flex items-center gap-2 text-sm">
        <ClockIcon className="h-4 w-4 text-gray-800" />
        <p>
          {format(event.startDate, "E, MMMM d, y")} -{" "}
          {format(event.endDate, "E, MMMM d, y")}
        </p>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <UserGroupIcon className="h-4 w-4 text-gray-800 " />
        <EventParticipants eventId={event.id} size={36} />
      </div>
    </Link>
  )
}

const EventPendingInvitation: FC<{ eventId: number }> = ({ eventId }) => {
  const apiContext = api.useContext()

  const acceptEventInvitationMutation =
    api.events.acceptEventInvitation.useMutation({
      onSuccess() {
        void apiContext.events.getEvents.invalidate({})
        void apiContext.events.getEventParticipants.invalidate({
          eventIds: [eventId],
        })
      },
    })

  const declineEventInvitationMutation =
    api.events.declineEventInvitation.useMutation({
      onSuccess() {
        void apiContext.events.getEventParticipants.invalidate({
          eventIds: [eventId],
        })
        void apiContext.events.getEvents.invalidate({})
      },
    })

  const acceptInvitation = (e: MouseEvent) => {
    e.preventDefault()
    acceptEventInvitationMutation.mutate({ eventId })
  }

  const declineInvitation = (e: MouseEvent) => {
    e.preventDefault()
    declineEventInvitationMutation.mutate({ eventId })
  }

  return (
    <div className="flex items-center gap-2 self-center rounded-full bg-white px-4 py-2 text-black">
      <p>PENDING INVITATION</p>
      <button onClick={declineInvitation}>
        <XMarkIcon className="box-content h-5 w-5 rounded-full border border-red-600 p-1 text-red-600" />
      </button>
      <button onClick={acceptInvitation}>
        <CheckIcon className="box-content h-5 w-5 rounded-full border border-green-500 p-1 text-green-500" />
      </button>
    </div>
  )
}
