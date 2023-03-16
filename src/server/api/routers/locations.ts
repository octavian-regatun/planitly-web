import { TRPCError } from "@trpc/server"
import axios from "axios"
import { z } from "zod"
import { env } from "../../../env/server.mjs"
import type { HereApiData } from "../../../types/hereApi"
import { IpApiData } from "../../../types/ipApi.js"
import { getLatLonFromIp } from "../../../utils/location"
import { createTRPCRouter, protectedProcedure } from "../trpc"

export const locationsRouter = createTRPCRouter({
  searchHereApi: protectedProcedure
    .input(z.object({ query: z.string().min(1), ip: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { query, ip } = input

      let ipApiData: IpApiData
      try {
        ipApiData = await getLatLonFromIp(ip)
      } catch (e) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Could not get location from IP address",
        })
      }

      try {
        const { data } = await axios.get<HereApiData>(
          "https://autosuggest.search.hereapi.com/v1/autosuggest",
          {
            params: {
              apiKey: env.HERE_API_KEY,
              q: query,
              limit: 5,
              lang: "en",
              at: `${ipApiData.lat},${ipApiData.lon}`,
            },
          }
        )

        return data.items
      } catch (e) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Could not get suggestions from HERE API",
        })
      }
    }),
})

export type LocationsRouter = typeof locationsRouter
