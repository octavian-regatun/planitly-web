import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { DefaultSession, NextAuthOptions, getServerSession } from "next-auth";
import Google, { GoogleProfile } from "next-auth/providers/google";
import { prisma } from "./db";
import { customAlphabet } from "nanoid";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session({ user, token, session }) {
      session.user.id = token.sub as string;
      return session;
    },
  },
  adapter: {
    ...PrismaAdapter(prisma),
    createUser: (user: any): any => {
      return prisma.user.create({
        data: {
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          image: user.image,
        },
      });
    },
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      profile: (profile: GoogleProfile) => {
        return {
          id: profile.sub,
          firstName: profile.given_name,
          lastName: profile.family_name,
          email: profile.email,
          image: profile.picture,
          username: customAlphabet("1234567890abcdef", 10)(),
        };
      },
    }),
  ],
};

export const getServerAuthSession = () => getServerSession(authOptions);
