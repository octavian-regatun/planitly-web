"use client";
import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "./shadcn/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./shadcn/Card";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth";
import { backendAxios } from "@/utilities/axios";

export function SignIn() {
  const router = useRouter();

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
        <CardDescription>Sign in to continue</CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={() => signIn()}>Sign In with Google</Button>
      </CardContent>
    </Card>
  );
}
