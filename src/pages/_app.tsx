import { type Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { type AppType } from "next/app"
import { Comfortaa, Inter } from "next/font/google"
import Head from "next/head"
import NextNProgress from "nextjs-progressbar"
import "react-datepicker/dist/react-datepicker.css"
import { Toaster } from "react-hot-toast"
import { api } from "../utils/api"

import "../styles/globals.scss"
import "../styles/main.scss"
import { SocketWrapper } from "../components/SocketWrapper"
import { StyleProvider } from "@ant-design/cssinjs"
import { ConfigProvider } from "antd"

const inter = Inter({ subsets: ["latin"] })

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
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
      <Toaster position="top-center" containerClassName="!z-[99999999]" />
      <StyleProvider hashPriority="high">
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#0F9488",
            },
          }}
        >
          <SessionProvider session={session}>
            <SocketWrapper>
              <Component {...pageProps} />
            </SocketWrapper>
          </SessionProvider>
        </ConfigProvider>
      </StyleProvider>
    </>
  )
}

export default api.withTRPC(MyApp)
