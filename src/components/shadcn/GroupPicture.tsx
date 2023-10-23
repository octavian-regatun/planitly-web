import { useGetGroup } from "@/hooks/use-get-group";
import Image from "next/image";

interface Props {
  groupId: number;
  size?: number;
}

export function GroupPicture({ groupId, size }: Props) {
  const { data, isPending, isError } = useGetGroup(groupId);

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  const { data: group } = data;

  return (
    <Image
      src={group.picture}
      alt={`${group.name} picture`}
      height={size}
      width={size}
      style={{ height: size, width: size }}
      className="rounded-full border hover:brightness-90 transition-all"
    />
  );
}
