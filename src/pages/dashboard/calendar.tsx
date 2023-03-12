import Layout from "../../components/Layout/Layout"
import RequireAuth from "../../components/RequireAuth"
import AddEventButton from "../../components/Calendar/AddEventButton"
import Calendar from "../../components/Calendar/Calendar"
import Link from "next/link"

const CalendarScreen: React.FC = () => {
  return (
    <RequireAuth>
      <Layout>
        <div className="flex h-full flex-col gap-4">
          <div className="flex gap-4">
            <Link
              href="/dashboard/today"
              className="rounded-full border border-gray-400 px-6 py-2 text-lg"
            >
              Today
            </Link>
            <Link
              href="/dashboard/calendar"
              className="rounded-full border border-gray-400 bg-black px-6 py-2 text-lg text-white"
            >
              Calendar
            </Link>
          </div>
          <Calendar />
          <AddEventButton />
        </div>
      </Layout>
    </RequireAuth>
  )
}

export default CalendarScreen
