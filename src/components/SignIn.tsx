"use client";
import { authService } from "@/services/auth";
import { User } from "@/services/users";
import { backendAxios } from "@/utilities/axios";
import { config } from "@/utilities/config";
import { useGoogleLogin } from "@react-oauth/google";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { GoToAppButton } from "./GoToAppButton";
import { Button } from "./shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./shadcn/card";

export function SignIn() {
  const router = useRouter();

  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      axios.get<User>(`${config.backendUrl}users/me`, {
        headers: {
          Authorization: `Bearer ${authService.getJwt()}`,
        },
      }),
  });

  const signInMutation = useMutation({
    mutationFn: authService.signIn,
    onSuccess: jwt => {
      backendAxios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      authService.setJwt(jwt);
      router.push("/dashboard");
    },
  });

  const signIn = useGoogleLogin({
    onSuccess: response => signInMutation.mutate(response),
    flow: "auth-code",
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>PlanITLY</CardTitle>
        <CardDescription>Sign in to continue </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Button onClick={() => signIn()}>
          <Image
            src="/google-logo.png"
            alt="google"
            width={16}
            height={16}
            className="mr-2 rounded-full"
          />
          Sign In with Google
        </Button>
        {userQuery.data?.status === 200 && (
          <GoToAppButton user={userQuery.data.data} />
        )}
      </CardContent>
    </Card>
  );
}
