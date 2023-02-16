import { useState } from "react"
import { SearchTab } from "./SearchTab"
import { RequestsTab } from "./RequestsTab"
import { FriendsTab } from "./FriendsTab"

type Tabs = "friends" | "requests" | "search"

export const Friends: React.FC = () => {
  const [tab, setTab] = useState<Tabs>("friends")

  function getActiveStyles(currentTab: Tabs) {
    if (tab === currentTab) return "bg-black text-white"
    return ""
  }

  return (
    <div className="flex w-full flex-1 flex-col items-center">
      <h1 className="mb-2 text-2xl font-bold">Friends</h1>
      {/* tabs buttons */}
      <div className="flex w-[calc(100%-42px)] rounded-t-3xl border border-b-0 border-black">
        <button
          className={`flex-1 rounded-tl-3xl border-r border-black px-4 py-2 ${getActiveStyles(
            "friends"
          )}`}
          onClick={() => setTab("friends")}
        >
          Friends
        </button>
        <button
          className={`flex-1 border-r border-black px-4 py-2 ${getActiveStyles(
            "requests"
          )}`}
          onClick={() => setTab("requests")}
        >
          Requests
        </button>
        <button
          className={`flex-1 rounded-tr-3xl px-4 py-2 ${getActiveStyles(
            "search"
          )}`}
          onClick={() => setTab("search")}
        >
          Search
        </button>
      </div>
      {/* tabs content */}
      {tab === "friends" && <FriendsTab />}
      {tab === "requests" && <RequestsTab />}
      {tab === "search" && <SearchTab />}
    </div>
  )
}
