"use client";

import { MyUserProfile } from "@/components/MyUserProfile";
import { PublicUserProfile } from "@/components/PublicUserProfile";
import { User } from "@/services/users";

import { useStore } from "@/store/store";

interface Props {
  params: {
    id: string;
  };
}

export default function UserPage({ params }: Props) {
  const me = useStore(store => store.me) as User;
  const id = parseInt(params.id);

  if (me.id === id) return <MyUserProfile id={id} />;
  return <PublicUserProfile id={id} />;
}
