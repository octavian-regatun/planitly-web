import Image from "next/image"

const ProfilePicture: React.FC<{ size?: number }> = ({ size }) => {
  return (
    <Image
      src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
      width={size || 42}
      height={size || 42}
      alt="Profile Picture"
      className="rounded-full"
    />
  )
}

export default ProfilePicture
