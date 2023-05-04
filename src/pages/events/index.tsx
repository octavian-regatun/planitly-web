import { EventCard } from "../../components/Events/EventCard"
import Layout from "../../components/Layout/Layout"
import RequireAuth from "../../components/RequireAuth"
import { api } from "../../utils/api"

export default function EventsPage() {
  const getEventsQuery = api.events.getEvents.useQuery({})
  return (
    <RequireAuth>
      <Layout>
        <div className="flex flex-col gap-4">
          <p className="font-bold text-gray-800">Upcoming</p>
          {getEventsQuery.data &&
            getEventsQuery.data.map(event => (
              <EventCard event={event} key={`event-card-${event.id}`} />
            ))}
        </div>
      </Layout>
    </RequireAuth>
  )
}
