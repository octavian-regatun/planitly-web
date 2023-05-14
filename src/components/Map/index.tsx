import maplibregl, { Map as MapLibre } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef, useState } from "react";

export default function Map() {
  const mapContainer = useRef<HTMLElement | string>("");
  const map = useRef<MapLibre | null>(null);
  const [lng] = useState(27.6014);
  const [lat] = useState(47.1585);
  const [zoom] = useState(11);
  const [API_KEY] = useState("YOUR_MAPTILER_API_KEY_HERE");

  useEffect(() => {
    if (map.current) return; //stops map from intializing more than once
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          osm: {
            type: "raster",
            tiles: ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
            tileSize: 256,
            attribution: "&copy; OpenStreetMap Contributors",
            maxzoom: 19,
          },
        },
        layers: [
          {
            id: "osm",
            type: "raster",
            source: "osm", // This must match the source key above
          },
        ],
      },
      center: [lng, lat],
      zoom: zoom,
    });
  });

  return <div ref={mapContainer as any} className="h-full w-full" />;
}
