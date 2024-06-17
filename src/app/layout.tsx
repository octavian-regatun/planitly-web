import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import Providers from "~/components/Providers";
import { getServerAuthSession } from "~/server/auth";

export const metadata = {
  title: "PlanITLY",
  description: "PlanITLY - Plan your life with ease",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
