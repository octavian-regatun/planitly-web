import Link from "next/link"
import { mainGradient } from "../../utils/gradient"
import Icon from "../Icon"

const AddEventButton: React.FC = () => {
  return (
    <Link
      href="/events/create"
      className={
        "absolute bottom-20 right-4 rounded-full bg-black p-4 text-white " +
        mainGradient
      }
    >
      <Icon type="plus" className="h-8 w-8" />
    </Link>
  )
}

export default AddEventButton
