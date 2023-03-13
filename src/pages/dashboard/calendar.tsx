import Layout from "../../components/Layout/Layout"
import RequireAuth from "../../components/RequireAuth"
import AddEventButton from "../../components/Calendar/AddEventButton"
import Calendar from "../../components/Calendar/Calendar"
import Link from "next/link"
import { EventsList } from "../../components/Events/EventsList"
import { api } from "../../utils/api"

const CalendarScreen: React.FC = () => {
  const getEventsQuery = api.events.getEvents.useQuery()

  return (
    <RequireAuth>
      <Layout className="bg-teal-600 !p-0">
        <div className="flex flex-col gap-4 p-4 h-[calc(100vh-192px)]">
          <Buttons />
          <Calendar />
        </div>
        {getEventsQuery.data && <EventsList events={getEventsQuery.data} />}
        <AddEventButton />
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
