import type { inferRouterOutputs } from "@trpc/server"
import Leaflet from "leaflet"
import "leaflet/dist/leaflet.css"
import { publicIpv4 } from "public-ip"
import { useEffect } from "react"
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet"
import type { LocationsRouter } from "../../server/api/routers/locations"
import { getLatLonFromIp } from "../../utils/location"

const markerIcon = new Leaflet.Icon({
  iconUrl: "/assets/images/pages/events/create/map-pin.svg",
  iconAnchor: [16, 32],
  popupAnchor: [0, -28],
  iconSize: [32, 32],
})

type Location = NonNullable<
  inferRouterOutputs<LocationsRouter>["searchHereApi"]
>[number]

const Map: React.FC<{
  location?: Location
}> = ({ location }) => {
  return (
    <MapContainer
      center={[0, 0]}
      zoom={12}
      scrollWheelZoom={true}
      className="h-96 w-full rounded-xl"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {location && <PickedLocationMarker location={location} />}
      <CenterToUserLocation />
    </MapContainer>
  )
}

const CenterToUserLocation = () => {
  const map = useMap()

  useEffect(() => {
    void publicIpv4().then((ip) =>
      getLatLonFromIp(ip).then((data) => {
        console.log(data)
        map.setView([data.lat, data.lon], 12)
      })
    )
  }, [])

  return null
}

const PickedLocationMarker: React.FC<{
  location: Location
}> = ({ location }) => {
  const map = useMap()

  useEffect(() => {
    map.setView([location.position.lat, location.position.lng], 12, {
      animate: true,
    })
  }, [location])

  return (
    <Marker
      position={[location.position.lat, location.position.lng]}
      icon={markerIcon}
    >
      <Popup>
        <div className="flex flex-col gap-2">
          <div className="text-center text-lg font-bold">Picked location</div>
          <div>{location.address.label}</div>
        </div>
      </Popup>
    </Marker>
  )
}

export default Map
