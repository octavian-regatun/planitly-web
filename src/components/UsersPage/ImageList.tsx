import Image from "next/image";

export default function ImageList() {
  return (
    <div className="grid grid-cols-3 gap-4 mt-4 px-4">
      <Image
        src="https://placehold.co/800x600.png"
        className="aspect-[4/3] rounded-lg"
        width={800}
        height={600}
        alt="profile cover"
      />
      <Image
        src="https://placehold.co/800x600.png"
        className="aspect-[4/3] rounded-lg"
        width={800}
        height={600}
        alt="profile cover"
      />
      <Image
        src="https://placehold.co/800x600.png"
        className="aspect-[4/3] rounded-lg"
        width={800}
        height={600}
        alt="profile cover"
      />
      <Image
        src="https://placehold.co/800x600.png"
        className="aspect-[4/3] rounded-lg"
        width={800}
        height={600}
        alt="profile cover"
      />
      <Image
        src="https://placehold.co/800x600.png"
        className="aspect-[4/3] rounded-lg"
        width={800}
        height={600}
        alt="profile cover"
      />
    </div>
  );
}
