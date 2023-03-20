import Link from "next/link"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { CalendarWrapper } from "../../components/Calendar/CalendarWrapper"
import CreateEventButton from "../../components/Calendar/CreateEventButton"
import { EventsList } from "../../components/Events/EventsList"
import Layout from "../../components/Layout/Layout"
import RequireAuth from "../../components/RequireAuth"
import { api } from "../../utils/api"

const CalendarScreen: React.FC = () => {
  const getEventsQuery = api.events.getEvents.useQuery({})

  return (
    <RequireAuth>
      <Layout className="bg-teal-600 !p-0">
        <div className="flex h-[calc(100vh-192px)] flex-col gap-4 p-4">
          <Buttons />
          <CalendarWrapper events={getEventsQuery.data} />
        </div>
        {getEventsQuery.data && <EventsList events={getEventsQuery.data} />}
        <CreateEventButton />
      </Layout>
    </RequireAuth>
  )
}

const Buttons: React.FC = () => {
  return (
    <div className="flex gap-4">
      <Link
        href="/dashboard/today"
        className="rounded-full border border-gray-200 px-6 py-2 text-lg text-gray-200"
      >
        Today
      </Link>
      <Link
        href="/dashboard/calendar"
        className="rounded-full bg-yellow-200 px-6 py-2 text-lg text-black"
      >
        Calendar
      </Link>
    </div>
  )
}

export default CalendarScreen
