import Link from "next/link"
import { useState } from "react"
import CalendarScreen from "./calendar"
import Layout from "../../components/Layout/Layout"
import RequireAuth from "../../components/RequireAuth"

type Page = "today" | "calendar"

const CalendarPage: React.FC = () => {
  return (
    <RequireAuth>
      <Layout>
        <div className="flex h-full flex-col gap-4">
          <div className="flex gap-4">
            <Link
              href="/dashboard/today"
              className="rounded-full border border-gray-400 bg-black px-6 py-2 text-lg text-white"
            >
              Today
            </Link>
            <Link
              href="/dashboard/calendar"
              className="rounded-full border border-gray-400 px-6 py-2 text-lg"
            >
              Calendar
            </Link>
          </div>
        </div>
      </Layout>
    </RequireAuth>
  )
}

export default CalendarPage
