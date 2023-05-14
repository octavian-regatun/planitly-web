import PageToggle from "@/components/SocialLayout/PageToggle";
import { ReactNode } from "react";

export default function SocialLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <PageToggle />
      {children}
    </>
  );
}
