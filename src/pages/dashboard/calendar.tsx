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
      <Layout className="!px-0 !pt-0">
        <div className="flex h-[calc(100vh-6rem)] flex-col gap-4 bg-teal-600 p-4 pb-10">
          <CalendarWrapper events={getEventsQuery.data} />
        </div>
        {getEventsQuery.data && <EventsList events={getEventsQuery.data} />}
        <CreateEventButton />
      </Layout>
    </RequireAuth>
  )
}

export default CalendarScreen
