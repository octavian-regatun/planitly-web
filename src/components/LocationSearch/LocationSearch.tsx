import type { inferRouterOutputs } from "@trpc/server"
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

export const LocationSearch: React.FC<{
  onSelect: (location: LocationItem) => void
}> = ({ onSelect }) => {
  const [query, setQuery] = useState("")
  const [results, setResults] =
    useState<
      NonNullable<inferRouterOutputs<LocationsRouter>["searchHereApi"]>
    >()
  const [picked, setPicked] =
    useState<
      NonNullable<inferRouterOutputs<LocationsRouter>["searchHereApi"][number]>
    >()
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
  })

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
    <div className="flex flex-col items-center">
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
        <div className="w-[calc(100%-2rem)] rounded-b-3xl border border-t-0 border-black">
          {results.map((item) => (
            <button
              key={`location-search-${item.id}`}
              className="flex items-center gap-2 p-4"
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
              {item.title}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
