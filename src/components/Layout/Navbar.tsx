import { useRouter } from "next/router"
import { getNavbarTitle } from "../../utils/navbar"
import ProfilePicture from "../ProfilePicture"

const Navbar: React.FC = () => {
  const router = useRouter()

  return (
    <nav className="flex h-16 items-center justify-center border-b-2 border-b-black p-4 text-2xl font-bold">
      {/* offset the (ProfilePicture width)/2 so title can be absolutely centered */}
      <h1 className="relative -right-[21px] mx-auto uppercase">
        {getNavbarTitle(router.pathname)}
      </h1>
      <button className="transition-all hover:brightness-90">
        <ProfilePicture />
      </button>
    </nav>
  )
}

export default Navbar
