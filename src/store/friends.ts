import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface FriendsStore {
  query: string;
  setQuery: (query: string) => void;
}

export const useFriendsStore = create<FriendsStore>()(
  devtools(
    set => ({
      query: "",
      setQuery(query) {
        set({ query });
      },
    }),
    {
      name: "friends-storage",
    }
  )
);
