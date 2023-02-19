import BottomNav from "./BottomNav"
import Navbar from "./Navbar"

const Layout: React.FC<{ children: JSX.Element }> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="h-[calc(100vh-128px)] p-4 overflow-y-auto">{children}</main>
      <BottomNav />
    </>
  )
}

export default Layout
