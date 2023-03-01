import BottomNav from "./BottomNav"
import Navbar from "./Navbar"

const Layout: React.FC<{ children: JSX.Element }> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="h-[calc(100vh-128px)] overflow-y-auto p-4">
        {children}
      </main>
      <BottomNav />
    </>
  )
}

export default Layout
