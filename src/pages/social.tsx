import RequireAuth from "../components/RequireAuth"
import Layout from "../components/Layout/Layout"
import { Friends as FriendsTab } from "../components/Social/Friends/Friends"
import { useState } from "react"
import { Groups as GroupsTab } from "../components/Social/Groups/Groups"

type Tab = "FRIENDS" | "GROUPS"

const SocialPage: React.FC = () => {
  const [tab, setTab] = useState<Tab>("FRIENDS")

  function getActiveTabStyles(activeTab: Tab) {
    return tab === activeTab ? "bg-black text-white" : ""
  }

  return (
    <RequireAuth>
      <Layout>
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-2">
            <button
              className={
                "rounded-full border border-black px-8 py-2 text-lg transition-all " +
                getActiveTabStyles("FRIENDS")
              }
              onClick={() => setTab("FRIENDS")}
            >
              FRIENDS
            </button>
            <button
              className={
                "rounded-full border border-black px-8 py-2 text-lg transition-all " +
                getActiveTabStyles("GROUPS")
              }
              onClick={() => setTab("GROUPS")}
            >
              GROUPS
            </button>
          </div>
          {tab === "FRIENDS" && <FriendsTab />}
          {tab === "GROUPS" && <GroupsTab />}
        </div>
      </Layout>
    </RequireAuth>
  )
}

export default SocialPage
