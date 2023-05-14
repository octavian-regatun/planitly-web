import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  const session_token = req.nextUrl.searchParams.get("session_token");

  const res = await fetch(
    `https://api.mapbox.com/search/searchbox/v1/retrieve/${id}?session_token=${session_token}&access_token=${process.env.MAPBOX_API_KEY}`
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch from Mapbox" },
      { status: 500 }
    );
  }

  const data = await res.json();

  let formattedData: ReturnType<typeof formatData>;
  try {
    formattedData = formatData(data.features[0]);
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to format data" },
      { status: 500 }
    );
  }

  return NextResponse.json(formattedData);
}

export const retrieveLocationBodySchema = z.object({
  name: z.string(),
  address: z.string(),
  place_formatted: z.string(),
  latitude: z.number(),
  longitude: z.number(),
});

function formatData(feature: Feature) {
  return {
    name: feature.properties.name_preferred || feature.properties.name,
    address: feature.properties.address,
    place_formatted: feature.properties.place_formatted,
    latitude: feature.properties.coordinates.latitude,
    longitude: feature.properties.coordinates.longitude,
  };
}

export interface Feature {
  type: string;
  geometry: Geometry;
  properties: Properties;
}

export interface Geometry {
  coordinates: number[];
  type: string;
}

export interface Properties {
  name: string;
  name_preferred?: string;
  mapbox_id: string;
  feature_type: string;
  address: string;
  full_address: string;
  place_formatted: string;
  context: Context;
  coordinates: Coordinates;
  maki: string;
  poi_category: string[];
  poi_category_ids: string[];
  external_ids: ExternalIDS;
  metadata: Metadata;
}

export interface Context {
  country: Country;
  postcode: Place;
  place: Place;
  street: Place;
}

export interface Country {
  name: string;
  country_code: string;
  country_code_alpha_3: string;
}

export interface Place {
  name: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
  routable_points: RoutablePoint[];
}

export interface RoutablePoint {
  name: string;
  latitude: number;
  longitude: number;
}

export interface ExternalIDS {
  foursquare: string;
}

export interface Metadata {}
