import { MapPinIcon } from "@heroicons/react/24/outline"
import type { inferRouterOutputs } from "@trpc/server"
import dynamic from "next/dynamic"
import { publicIpv4 } from "public-ip"
import { useEffect, useState } from "react"
import type { LocationsRouter } from "../../server/api/routers/locations"
import { api } from "../../utils/api"

export type LocationItem = {
  title: string
  address: string
  lat: number
  lon: number
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
  const onBlur = () => setTimeout(() => setFocused(false), 0)

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
    }, 1000)
    return () => clearTimeout(debounce)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, ip])

  return (
    <div className="flex flex-col gap-4">
      <div className="relative flex flex-col items-center">
        <input
          type="text"
          className="w-full rounded-full border border-black p-2"
          placeholder="Search for a location..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {focused && results && results.length > 0 && (
          <div className="absolute top-[38px] z-[401] w-[calc(100%-2rem)] rounded-b-3xl border border-t-0 border-black bg-white">
            {results.map((item) => (
              <button
                key={`location-search-${item.id}`}
                className="flex items-center gap-2 p-4 text-left"
                type="button"
                onClick={() => {
                  setPicked(item)
                  onSelect({
                    title: item.title,
                    lat: item.position.lat,
                    lon: item.position.lng,
                    address: item.address.label,
                  })
                }}
              >
                <MapPinIcon className="box-content h-6 w-6 rounded-full bg-black p-1 text-white" />
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
