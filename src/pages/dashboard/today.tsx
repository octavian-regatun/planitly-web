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
          <Buttons />
        </div>
      </Layout>
    </RequireAuth>
  )
}

const Buttons: React.FC = () => {
  return (
    <div className="flex gap-4">
      <Link
        href="/dashboard/today"
        className="rounded-full bg-yellow-200 px-6 py-2 text-lg text-black"
      >
        Today
      </Link>
      <Link
        href="/dashboard/calendar"
        className="rounded-full border border-gray-200 px-6 py-2 text-lg text-gray-200"
      >
        Calendar
      </Link>
    </div>
  )
}

export default CalendarPage
