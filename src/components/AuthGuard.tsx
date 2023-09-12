"use client";
import { authService } from "@/services/auth";
import { usersService } from "@/services/users";
import { useStore } from "@/store/store";
import { backendAxios } from "@/utilities/axios";
import { useQuery } from "@tanstack/react-query";
import { PropsWithChildren, useEffect, useState } from "react";
import { shallow } from "zustand/shallow";

export function AuthGuard({ children }: PropsWithChildren) {
  const [me, setMe] = useStore(state => [state.me, state.setMe]);
  const [jwt, setJwt] = useState<string | null>(null);

  backendAxios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

  const { data: user } = useQuery({
    queryKey: ["user", "me"],
    queryFn: usersService.findMe,
    enabled: jwt !== null,
  });

  useEffect(() => {
    const jwt = authService.getJwt();
    setJwt(jwt);
  }, []);

  useEffect(() => {
    if (user) setMe(user);
  }, [user]);

  if (jwt === null) return null;
  if (me === undefined) return null;

  return children;
}
