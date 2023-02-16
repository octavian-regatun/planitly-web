import Image from "next/image"

const ProfilePicture: React.FC<{ size?: number; src: string }> = ({
  size,
  src,
}) => {
  return (
    <Image
      src={src}
      width={size || 42}
      height={size || 42}
      alt="Profile Picture"
      className="rounded-full"
    />
  )
}

export default ProfilePicture
