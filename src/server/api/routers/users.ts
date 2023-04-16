import { getDownloadURL, ref, uploadString } from "firebase/storage"
import { customAlphabet } from "nanoid"
import { z } from "zod"
import { firebaseStorage } from "../../firebase"
import { createTRPCRouter, protectedProcedure } from "../trpc"
import { searchFriends } from "../../../utils/users"
import sharp from "sharp"

export const usersRouter = createTRPCRouter({
  getMe: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    })
  }),

  getUser: protectedProcedure
    .input(z.object({ username: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findUnique({
        where: {
          username: input.username,
        },
        select: {
          id: true,
          username: true,
          firstName: true,
          lastName: true,
          image: true,
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
        const imageMetadata = image.split(";base64,")[0] as string

        const imageBuffer = Buffer.from(
          image.split(";base64,")[1] as string,
          "base64"
        )

        const compressedImage = await sharp(imageBuffer)
          .webp({ quality: 10 })
          .toBuffer()
          .then(x => x.toString("base64"))

        const imageRef = ref(
          firebaseStorage,
          `images/users/${ctx.session.user.id}/${customAlphabet(
            "1234567890abcdef",
            16
          )()}`
        )

        console.log(imageMetadata)

        await uploadString(
          imageRef,
          imageMetadata + ";base64," + compressedImage,
          "data_url"
        )

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

      return await searchFriends(query, ctx.session.user.id)
    }),
})
