import Image from "next/image"

const ProfilePicture: React.FC<{
  size?: number
  src: string
  className?: string
}> = ({ size, src, className }) => {
  return (
    <Image
      src={src}
      width={size || 42}
      height={size || 42}
      alt="Profile Picture"
      className={`rounded-full ${className || ""}`}
      style={{
        width: size || 42,
        height: size || 42,
      }}
    />
  )
}

export default ProfilePicture
