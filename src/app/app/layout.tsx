import { redirect } from "next/navigation";
import { FC, PropsWithChildren } from "react";
import Navbar from "~/components/Navbar";
import Sidebar from "~/components/Sidebar";
import { getServerAuthSession } from "~/server/auth";

const AppLayout: FC<PropsWithChildren> = async ({ children }) => {
  const session = await getServerAuthSession();

  if (!session) redirect("/");

  return (
    <>
      <Navbar />
      <main className="bg-neutral-50 pl-20 pt-16">{children}</main>
      <Sidebar />
    </>
  );
};

export default AppLayout;
