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
          `images/${customAlphabet("1234567890abcdef", 10)()}`
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
})
