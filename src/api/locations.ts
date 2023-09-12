import { retrieveLocationBodySchema } from "@/app/api/locations/retrieve/route";
import { searchLocationBodySchema } from "@/app/api/locations/search/route";

export const locationsClientApi = {
  searchLocation: async ({
    query,
    session_token,
  }: {
    query: string;
    session_token: string;
  }) => {
    const res = await fetch(
      `/api/locations/search?query=${query}&session_token=${session_token}`
    );

    if (!res.ok) {
      const data = (await res.json()) as { error: string };

      throw new Error(data.error);
    }

    const body = searchLocationBodySchema.safeParse(await res.json());

    if (!body.success) throw new Error("Failed to parse search location data");

    return body.data;
  },
  retrieveLocation: async ({
    id,
    session_token,
  }: {
    id: string;
    session_token: string;
  }) => {
    const res = await fetch(
      `/api/locations/retrieve?id=${id}&session_token=${session_token}`
    );

    if (!res.ok) {
      const data = (await res.json()) as { error: string };

      throw new Error(data.error);
    }

    const body = retrieveLocationBodySchema.safeParse(await res.json());

    if (!body.success)
      throw new Error("Failed to parse retrieve location data");

    return body.data;
  },
};
