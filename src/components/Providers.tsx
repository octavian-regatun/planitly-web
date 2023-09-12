"use client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { Toaster } from "./shadcn/Toaster";

export function Providers({ children }: PropsWithChildren) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId="609375541803-7gd5g5rs79tk1t1oup0rhv4t9j4n7h0s.apps.googleusercontent.com">
        {children}
        <Toaster />
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
}
