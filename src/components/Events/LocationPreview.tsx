import Leaflet from "leaflet"
import "leaflet/dist/leaflet.css"
import { useEffect } from "react"
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet"

const markerIcon = new Leaflet.Icon({
  iconUrl: "/assets/images/pages/events/create/map-pin.svg",
  iconAnchor: [16, 32],
  popupAnchor: [0, -28],
  iconSize: [32, 32],
})

type Location = { lat: number; lon: number; label?: string }

const LocationPreview: React.FC<{
  location?: Location
  className?: string
}> = ({ location, className }) => {
  return (
    <MapContainer
      center={[0, 0]}
      zoom={12}
      scrollWheelZoom={true}
      className={`pointer-events-none h-24 w-24 rounded-xl ${className || ""}}`}
      zoomControl={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {location && <PickedLocationMarker location={location} />}
    </MapContainer>
  )
}

const PickedLocationMarker: React.FC<{
  location: Location
}> = ({ location }) => {
  const map = useMap()

  map.dragging.disable()
  map.touchZoom.disable()
  map.doubleClickZoom.disable()
  map.scrollWheelZoom.disable()
  map.boxZoom.disable()
  map.keyboard.disable()

  useEffect(() => {
    map.setView([location.lat, location.lon], 12, {
      animate: true,
    })
  }, [location])

  return <Marker position={[location.lat, location.lon]} icon={markerIcon} />
}

export default LocationPreview
