import { useState } from "react"
import { SearchTab } from "./SearchTab"
import { RequestsTab } from "./RequestsTab"
import { FriendsTab } from "./FriendsTab"

type Tabs = "friends" | "requests" | "search"

export const FriendsScreen: React.FC = () => {
  const [tab, setTab] = useState<Tabs>("friends")

  function getActiveStyles(currentTab: Tabs) {
    if (tab === currentTab) return "bg-black text-white"
    return ""
  }

  return (
    <div className="flex w-full flex-1 flex-col items-center">
      {/* tabs buttons */}
      <div className="flex w-[calc(100%-42px)] rounded-t-3xl border border-b-0 border-black">
        <button
          className={`flex-1 rounded-tl-3xl border-r border-black px-4 py-2 transition-all ${getActiveStyles(
            "friends"
          )}`}
          onClick={() => setTab("friends")}
        >
          Friends
        </button>
        <button
          className={`flex-1 border-r border-black px-4 py-2 transition-all ${getActiveStyles(
            "requests"
          )}`}
          onClick={() => setTab("requests")}
        >
          Requests
        </button>
        <button
          className={`flex-1 rounded-tr-3xl py-2 px-4 transition-all ${getActiveStyles(
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
