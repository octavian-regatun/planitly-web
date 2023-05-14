import Providers from "@/components/Providers";
import "../styles/globals.scss";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import ToastContainerWrapper from "@/components/ToastContainerWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PlanITLY",
  description: `With various features it enables people to easily find common
  available dates for groups of people, help them take a common
  advantageous decision about the location, place to stay, time-frame,
  budget and easily share and keep track of the money spent and other
  various aspects of related to the trip.`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainerWrapper />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
