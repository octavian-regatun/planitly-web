import { User } from "@prisma/client"
import type { Blob } from "buffer"
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadString,
} from "firebase/storage"
import { readFile } from "fs/promises"
import { customAlphabet } from "nanoid"
import { z } from "zod"
import { firebaseStorage } from "../firebase"
import { createTRPCRouter, protectedProcedure } from "../trpc"

export const usersRouter = createTRPCRouter({
  getMe: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    })
  }),

  updateMe: protectedProcedure
    .input(
      z.object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        username: z.string().optional(),
        email: z.string().optional(),
        image: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { image } = input

      let imageUrl

      if (image) {
        const imageRef = ref(
          firebaseStorage,
          `images/users/${ctx.session.user.id}/${customAlphabet(
            "1234567890abcdef",
            16
          )()}`
        )

        await uploadString(imageRef, image, "data_url")

        imageUrl = await getDownloadURL(imageRef)
      }

      return ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          ...input,
          image: imageUrl || (ctx.session.user.image as string),
        },
      })
    }),

  search: protectedProcedure
    .input(z.object({ query: z.string() }))
    .query(({ input, ctx }) => {
      const { query } = input

      return ctx.prisma.user.findMany({
        where: {
          id: {
            not: ctx.session.user.id,
          },
          OR: [
            {
              username: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              firstName: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              lastName: {
                contains: query,
                mode: "insensitive",
              },
            },
          ],
        },
      })
    }),

  searchFriends: protectedProcedure
    .input(z.object({ query: z.string() }))
    .query(async ({ input, ctx }) => {
      const { query } = input

      const friends1 = await ctx.prisma.friendship.findMany({
        where: {
          status: "ACCEPTED",
          requesterId: ctx.session.user.id,
          recipient: {
            OR: [
              {
                username: {
                  contains: query,
                  mode: "insensitive",
                },
              },
              {
                firstName: {
                  contains: query,
                  mode: "insensitive",
                },
              },
              {
                lastName: {
                  contains: query,
                  mode: "insensitive",
                },
              },
            ],
          },
        },
        select: {
          recipient: true,
        },
      })

      const friends2 = await ctx.prisma.friendship.findMany({
        where: {
          status: "ACCEPTED",
          recipientId: ctx.session.user.id,
          requester: {
            OR: [
              {
                username: {
                  contains: query,
                  mode: "insensitive",
                },
              },
              {
                firstName: {
                  contains: query,
                  mode: "insensitive",
                },
              },
              {
                lastName: {
                  contains: query,
                  mode: "insensitive",
                },
              },
            ],
          },
        },
        select: {
          requester: true,
        },
      })

      const mappedFriends1 = friends1.map((friend) => friend.recipient)
      const mappedFriends2 = friends2.map((friend) => friend.requester)

      return [...mappedFriends1, ...mappedFriends2]
    }),
})
