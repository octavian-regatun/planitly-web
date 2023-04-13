import {
  CalendarIcon,
  MapPinIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline"
import { format, isSameDay as isSameDayDateFns } from "date-fns"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import type { FC } from "react"
import { EventParticipants } from "../../components/Events/EventParticipantsList"
import Layout from "../../components/Layout/Layout"
import RequireAuth from "../../components/RequireAuth"
import { api } from "../../utils/api"
import { Button } from "antd"
import dynamic from "next/dynamic"

const LocationPreview = dynamic(
  () => import("../../components/Events/LocationPreview"),
  { ssr: false }
)

const EventPage: FC = () => {
  const session = useSession()
  const router = useRouter()
  const { id } = router.query

  const getEventQuery = api.events.getEvent.useQuery(
    { id: parseInt(id as string) },
    { enabled: typeof id === "string" }
  )

  const currentUserIsAdmin = getEventQuery.data?.EventMember.find(
    member => member.userId === session.data?.user.id && member.role === "ADMIN"
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
          <div className="relative -top-6 flex flex-col gap-4 rounded-t-3xl bg-white p-4">
            <p className="text-xl font-bold">{getEventQuery.data?.name}</p>
            {currentUserIsAdmin && (
              <Link className="absolute -top-6 right-0" href={`/events/edit/${getEventQuery.data.id}`}>
                <PencilSquareIcon className="box-content h-6 w-6 rounded-full bg-teal-600 p-4 text-white" />
              </Link>
            )}
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
            <div className="flex bg-gray-100 drop-shadow-lg border p-4 rounded-xl">
              <div className="flex flex-1 flex-col gap-2">
                <p>Participants ({getEventQuery.data?.EventMember.length})</p>
                <EventParticipants eventId={getEventQuery.data.id} />
              </div>
              {getEventQuery.data && (
                <LocationPreview
                  location={{
                    lat: getEventQuery.data.location.latitude,
                    lon: getEventQuery.data.location.longitude,
                  }}
                />
              )}
            </div>
            {getEventQuery.data.description && (
              <>
                <p className="">About Event</p>
                <div
                  className="-mt-2 break-words text-sm text-gray-600"
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
