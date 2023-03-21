import { PlusIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { mainGradient } from "../../utils/gradient"

const CreateEventButton: React.FC = () => {
  return (
    <Link
      href="/events/create"
      className={
        "fixed bottom-20 right-4 rounded-full bg-black p-4 text-white " +
        mainGradient
      }
    >
      <PlusIcon className="h-6 w-6" />
    </Link>
  )
}

export default CreateEventButton
