"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import React, { FC, PropsWithChildren } from "react";
import { TRPCReactProvider } from "~/trpc/react";
import { Toaster } from "./ui/sonner";

type Props = PropsWithChildren & {
  session: Session | null;
};

const Providers: FC<Props> = ({ session, children }) => {
  return (
    <TRPCReactProvider>
      <Toaster />
      <SessionProvider session={session}>{children}</SessionProvider>
    </TRPCReactProvider>
  );
};

export default Providers;
