import { type Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { type AppType } from "next/app"
import { Comfortaa } from "next/font/google"
import Head from "next/head"
import NextNProgress from "nextjs-progressbar"
import "react-datepicker/dist/react-datepicker.css"
import { Toaster } from "react-hot-toast"
import { api } from "../utils/api"

import "../styles/globals.scss"
import "../styles/main.scss"
import { PresenceWrapper } from "../components/PresenceWrapper"

const montserrat = Comfortaa({
  subsets: ["latin"],
  variable: "--font-montserrat",
})

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${montserrat.style.fontFamily};
        }
      `}</style>
      <Head>
        <title>PlanITLY</title>
        <meta
          name="description"
          content="Let's upgrade the way you plan things in your life. Were you looking for a way to manage all tasks, meetings, events, trips in one place easier than ever? Well, you found the way now!"
        />
        <meta property="og:title" content="PlanITLY" />
        <meta
          property="og:description"
          content="Let's upgrade the way you plan things in your life. Were you looking for a way to manage all tasks, meetings, events,
          trips in one place easier than ever? Well, you found the way now!"
        />
        <meta property="og:image" content="/logo.svg" />
        <meta
          name="google-site-verification"
          content="9DFNcZdMN8_VKIEGVoMyRCJskAFzkWutCWGWUNBfXig"
        />
      </Head>
      <NextNProgress />
      <Toaster position="top-center" />
      <SessionProvider session={session}>
        {/* <PresenceWrapper> */}
        <Component {...pageProps} />
        {/* </PresenceWrapper> */}
      </SessionProvider>
    </>
  )
}

export default api.withTRPC(MyApp)
