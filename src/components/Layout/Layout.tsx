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
      <main
        className={`h-[calc(100vh-128px)] overflow-y-auto p-4 ${className}`}
      >
        {children}
      </main>
      <BottomNav />
    </div>
  )
}

export default Layout
