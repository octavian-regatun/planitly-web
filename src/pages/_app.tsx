import { type Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { type AppType } from "next/app"
import NextNProgress from "nextjs-progressbar"

import { api } from "../utils/api"

import Head from "next/head"
import { Toaster } from "react-hot-toast"
import "../styles/globals.css"
import "rsuite/dist/rsuite.min.css"

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
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
      <SessionProvider session={session}>
        <NextNProgress />
        <Toaster position="top-center" />
        <Component {...pageProps} />
      </SessionProvider>
    </>
  )
}

export default api.withTRPC(MyApp)
