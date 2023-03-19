import { PlusIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { mainGradient } from "../../utils/gradient"

const CreateEventButton: React.FC = () => {
  return (
    <Link
      href="/events/create"
      className={
        "absolute bottom-20 right-4 rounded-full bg-black p-4 text-white " +
        mainGradient
      }
    >
      <PlusIcon className="h-8 w-8" />
    </Link>
  )
}

export default CreateEventButton
