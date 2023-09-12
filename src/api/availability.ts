import { AvailableDate } from "@/app/(app)/availability/page";

export const availabilitiesClientApi = {
  createAvailability: async (availableDate: AvailableDate) => {
    const response = await fetch("/api/availability", {
      method: "POST",
      body: JSON.stringify(availableDate),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error);
    }

    return response.json();
  },
  getAvailabilities: async () => {
    const response = await fetch("/api/availability");

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error);
    }

    return response.json();
  },
};
