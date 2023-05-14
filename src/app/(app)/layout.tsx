import BottomNav from "@/components/BottomNav";
import Navbar from "@/components/Navbar";

interface Props {
  children: React.ReactNode;
}

export default function AppLayout({ children }: Props) {
  return (
    <>
      {/* @ts-expect-error */}
      <Navbar />
      <main className="pt-20">{children}</main>
      <BottomNav />
    </>
  );
}
