import BottomNav from "./BottomNav"
import Navbar from "./Navbar"

const Layout: React.FC<{
  children: any
  className?: string
}> = ({ children, className }) => {
  className ??= ""
  return (
    <div className="mx-auto max-w-screen-sm">
      <Navbar />
      <main className={`p-4 pb-28 ${className}`}>{children}</main>
      <BottomNav />
    </div>
  )
}

export default Layout
