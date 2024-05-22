import { FC, PropsWithChildren } from "react";
import Navbar from "~/components/Navbar";
import Sidebar from "~/components/Sidebar";

const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="bg-neutral-50 pl-20 pt-16">{children}</main>
      <Sidebar />
    </>
  );
};

export default AppLayout;
