import { useState } from "react"
import CalendarScreen from "../components/Calendar/CalendarScreen"
import Layout from "../components/Layout/Layout"
import RequireAuth from "../components/RequireAuth"

type Pages = "today" | "calendar"

const CalendarPage: React.FC = () => {
  const [page, setPage] = useState<Pages>("today")

  return (
    <RequireAuth>
      <Layout>
        <div className="flex h-full flex-col gap-4">
          <div className="flex gap-4">
            <button
              className={`rounded-full border border-gray-400 px-6 py-2 text-lg ${
                page === "today" ? "bg-black text-white" : ""
              }`}
              onClick={() => setPage("today")}
            >
              Today
            </button>
            <button
              className={`rounded-full border border-gray-400 px-6 py-2 text-lg ${
                page === "calendar" ? "bg-black text-white" : ""
              }`}
              onClick={() => setPage("calendar")}
            >
              Calendar
            </button>
          </div>

          {page === "calendar" && <CalendarScreen />}
        </div>
      </Layout>
    </RequireAuth>
  )
}

export default CalendarPage
