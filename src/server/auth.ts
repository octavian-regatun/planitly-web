import { PrismaAdapter } from "@next-auth/prisma-adapter"
import type { GetServerSidePropsContext } from "next"
import {
  type DefaultSession,
  getServerSession,
  type NextAuthOptions,
} from "next-auth"
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google"
import { env } from "../env/server.mjs"
import { prisma } from "./db"
import { customAlphabet } from "nanoid"

/**
 * Module augmentation for `next-auth` types.
 * Allows us to add custom properties to the `session` object and keep type
 * safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 **/
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string
      firstName: string
      lastName: string
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"]
  }

  interface User {
    firstName: string
    lastName: string
    // ...other properties
    // role: UserRole;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks,
 * etc.
 *
 * @see https://next-auth.js.org/configuration/options
 **/

export const authOptions: NextAuthOptions = {
  callbacks: {
    // signIn({ account, profile }) {
    //   if (account?.provider === "google") {
    //     return "/dashboard";
    //   }
    //   return true;
    // },
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
        session.user.firstName = user.firstName
        session.user.lastName = user.lastName
        // session.user.role = user.role; <-- put other properties on the session here
      }
      return session
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      profile: (profile: GoogleProfile) => {
        return {
          id: profile.sub,
          firstName: profile.given_name,
          lastName: profile.family_name,
          email: profile.email,
          image: profile.picture,
          username: customAlphabet("1234567890abcdef", 10)(),
        }
      },
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    /**
     * ...add more providers here
     *
     * Most other providers require a bit more work than the Discord provider.
     * For example, the GitHub provider requires you to add the
     * `refresh_token_expires_in` field to the Account model. Refer to the
     * NextAuth.js docs for the provider you want to use. Example:
     * @see https://next-auth.js.org/providers/github
     **/
  ],
}

/**
 * Wrapper for `getServerSession` so that you don't need to import the
 * `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 **/
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"]
  res: GetServerSidePropsContext["res"]
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions)
}
