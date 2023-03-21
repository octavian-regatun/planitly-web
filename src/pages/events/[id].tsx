import { CalendarIcon, MapPinIcon } from "@heroicons/react/24/outline"
import type { inferRouterOutputs } from "@trpc/server"
import { format, isSameDay as isSameDayDateFns } from "date-fns"
import Image from "next/image"
import { useRouter } from "next/router"
import Layout from "../../components/Layout/Layout"
import ProfilePicture from "../../components/ProfilePicture"
import RequireAuth from "../../components/RequireAuth"
import type { eventsRouter } from "../../server/api/routers/events"
import { api } from "../../utils/api"

type Event = inferRouterOutputs<typeof eventsRouter>["getEvents"][number]

const EventPage: React.FC = () => {
  const router = useRouter()
  const { id } = router.query

  const getEventQuery = api.events.getEvent.useQuery(
    { id: parseInt(id as string) },
    { enabled: typeof id === "string" }
  )

  return (
    <RequireAuth>
      <Layout className="p-0">
        <Image
          alt="cover"
          width={2560}
          height={1440}
          src="https://picsum.photos/2560/1440"
        />
        {getEventQuery.data && (
          <div className="relative -top-6 flex flex-col gap-4 rounded-3xl bg-white p-8">
            <p className="text-center text-xl">{getEventQuery.data?.name}</p>
            <div className="flex flex-col gap-2 text-gray-600">
              <div className="flex gap-2">
                <MapPinIcon className="h-5 w-5" />
                <p className="text-sm">{getEventQuery.data?.location?.name}</p>
              </div>
              <EventDate
                startDate={getEventQuery.data.startDate}
                endDate={getEventQuery.data.endDate}
              />
            </div>
            <EventParticipants eventId={getEventQuery.data.id} />
            {getEventQuery.data.description && (
              <>
                <p className="">About Event</p>
                <div
                  className="-mt-2 text-sm text-gray-600"
                  dangerouslySetInnerHTML={{
                    __html: getEventQuery.data.description,
                  }}
                ></div>
              </>
            )}
          </div>
        )}
      </Layout>
    </RequireAuth>
  )
}

const EventParticipants: React.FC<{ eventId: number }> = ({ eventId }) => {
  const getEventParticipantsQuery = api.events.getEventParticipants.useQuery({
    eventId,
  })

  return (
    <div className="flex flex-col gap-2">
      <p>Participants</p>
      <div className="flex">
        {getEventParticipantsQuery.data?.map((participant) => (
          <ProfilePicture
          size={32}
            key={`participant-${participant.id}`}
            firstName={participant.firstName}
            lastName={participant.lastName}
          />
        ))}
      </div>
    </div>
  )
}

const EventDate: React.FC<{ startDate: Date; endDate: Date }> = ({
  startDate,
  endDate,
}) => {
  const startString = format(startDate, "E, MMMM d, y")
  const endString = format(endDate, "E, MMMM d, y")

  const isSameDay = isSameDayDateFns(startDate, endDate)

  return (
    <div className="flex gap-2">
      <CalendarIcon className="h-5 w-5" />
      <p className="text-sm">
        {startString}
        {!isSameDay && (
          <>
            {" "}
            -<br />
            {endString}
          </>
        )}
      </p>
    </div>
  )
}

export default EventPage
