import { type Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { type AppType } from "next/app"

import { api } from "../utils/api"

import "../styles/globals.css"
import Head from "next/head"

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <Head>
        <title>PlanITLY</title>
        <meta property="og:title" content="PlanITLY" />
        <meta
          property="og:description"
          content="Let's upgrade the way you plan things in your life. If you were looking for a way to manage all tasks, meetings, events,
          trips in one place easier than ever? Well, you found the way now!"
        />
        <meta property="og:image" content="/logo.svg" />
      </Head>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  )
}

export default api.withTRPC(MyApp)
