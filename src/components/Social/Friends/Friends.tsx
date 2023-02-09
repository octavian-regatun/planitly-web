import { useState } from "react"
import { Search } from "./Search"
import { Requests } from "./Requests"

type Tabs = "friends" | "requests" | "search"

export const Friends: React.FC = () => {
  const [tab, setTab] = useState<Tabs>("friends")

  return (
    <div className="flex w-full flex-1 flex-col items-center">
      <h1 className="mb-2 text-4xl font-bold">Friends</h1>
      {/* tabs buttons */}
      <div className="flex w-[calc(100%-42px)] rounded-t-3xl border border-b-0 border-black">
        <button
          className="flex-1 border-r border-black px-4 py-2"
          onClick={() => setTab("friends")}
        >
          Friends
        </button>
        <button
          className="flex-1 border-r border-black px-4 py-2"
          onClick={() => setTab("requests")}
        >
          Requests
        </button>
        <button className="flex-1 px-4 py-2" onClick={() => setTab("search")}>
          Search
        </button>
      </div>
      {/* tabs content */}
      {tab === "friends" && <div>Friends</div>}
      {tab === "requests" && <Requests />}
      {tab === "search" && <Search />}
    </div>
  )
}
