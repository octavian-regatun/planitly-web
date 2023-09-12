import { AuthGuard } from "@/components/AuthGuard";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { PropsWithChildren } from "react";

export default function AuthenticatedAppLayout({
  children,
}: PropsWithChildren) {
  return (
    <AuthGuard>
      <>
        <Navbar />
        <Sidebar />
        <main className="pt-20 pl-64 h-screen">{children}</main>
      </>
    </AuthGuard>
  );
}
