import PageToggle from "@/components/SocialLayout/PageToggle";
import { ReactNode } from "react";

export default function SocialLayout({ children }: { children: ReactNode }) {
  return (
    <div className="pt-4 px-4">
      <PageToggle />
      {children}
    </div>
  );
}
