import { ArrowPathIcon, MapPinIcon } from "@heroicons/react/24/outline"
import type { inferRouterOutputs } from "@trpc/server"
import dynamic from "next/dynamic"
import { publicIpv4 } from "public-ip"
import { useEffect, useState } from "react"
import type { LocationsRouter } from "../../server/api/routers/locations"
import { api } from "../../utils/api"

export type LocationItem = {
  name: string
  address: string
  latitude: number
  longitude: number
}

type Results = NonNullable<inferRouterOutputs<LocationsRouter>["searchHereApi"]>

const Map = dynamic(() => import("./Map"), {
  ssr: false,
})

export const LocationSearch: React.FC<{
  onSelect: (location: LocationItem) => void
}> = ({ onSelect }) => {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Results>()
  const [picked, setPicked] = useState<Results[number]>()
  const [ip, setIp] = useState<string>()
  const [focused, setFocused] = useState(false)

  const onFocus = () => setFocused(true)
  const onBlur = () => setTimeout(() => setFocused(false), 200)

  const searchHereApiMutation = api.locations.searchHereApi.useMutation({
    onSuccess(data) {
      setResults(data)
    },
  })

  useEffect(() => {
    void publicIpv4().then((ip) => setIp(ip))
  }, [])

  useEffect(() => {
    if (picked) setQuery(picked.title)
  }, [picked])

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (query.length > 0 && ip) {
        searchHereApiMutation.mutate({ query, ip })
      }
    }, 200)
    return () => clearTimeout(debounce)
  }, [query, ip])

  return (
    <div className="flex flex-col gap-4">
      <div className="relative flex flex-col items-center">
        <input
          type="text"
          className="w-full border-b-2 border-b-gray-200 py-2 placeholder-gray-200 outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {searchHereApiMutation.isLoading && (
          <ArrowPathIcon className="absolute top-[calc(50%-8px)] right-8 h-4 w-4 animate-spin" />
        )}
        {focused && results && results.length > 0 && (
          <div className="w-full absolute top-[42px] z-[1001] rounded-b border-2 border-t-0 border-gray-200 bg-white">
            {results.map((item) => (
              <button
                key={`location-search-${item.id}`}
                className="flex items-center gap-2 p-4 text-left"
                type="button"
                onClick={() => {
                  setPicked(item)
                  onSelect({
                    name: item.title,
                    latitude: item.position.lat,
                    longitude: item.position.lng,
                    address: item.address.label,
                  })
                }}
              >
                <MapPinIcon className="box-content h-6 min-w-[1.5rem] rounded-full bg-yellow-200 p-1 text-black" />
                <p> {item.title} </p>
              </button>
            ))}
          </div>
        )}
      </div>
      <Map location={picked} />
    </div>
  )
}
