import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query");
  const session_token = req.nextUrl.searchParams.get("session_token");

  if (query === null || query === "")
    return NextResponse.json({ error: "No query provided" }, { status: 400 });

  const res = await fetch(
    `https://api.mapbox.com/search/searchbox/v1/suggest?q=${query}&access_token=${process.env.MAPBOX_API_KEY}&session_token=${session_token}}`
  );

  const data = await res.json();

  let formattedData: ReturnType<typeof formatData>;

  try {
    formattedData = formatData(data.suggestions);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to format data" },
      { status: 500 }
    );
  }

  return NextResponse.json(formattedData);
}

function formatData(suggestions: Suggestion[]) {
  return suggestions.map(suggestion => ({
    id: suggestion.mapbox_id,
    name: suggestion.name_preferred || suggestion.name,
    address: suggestion.address,
    place_formatted: suggestion.place_formatted,
  }));
}

export const searchLocationBodySchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    address: z.string().optional(),
    place_formatted: z.string().optional(),
  })
);

export interface Suggestion {
  name: string;
  mapbox_id: string;
  feature_type: string;
  place_formatted: string;
  context: Context;
  language: string;
  maki: string;
  external_ids: ExternalIDS;
  metadata: Metadata;
  name_preferred?: string;
  address?: string;
  full_address?: string;
  poi_category?: string[];
  poi_category_ids?: string[];
}

export interface Context {
  country: Country;
  region?: Region;
  postcode?: Place;
  place?: Place;
}

export interface Country {
  id?: string;
  name: string;
  country_code: string;
  country_code_alpha_3: string;
}

export interface Place {
  name: string;
}

export interface Region {
  id: string;
  name: string;
  region_code: string;
  region_code_full: string;
}

export interface ExternalIDS {
  foursquare?: string;
}

export interface Metadata {}
