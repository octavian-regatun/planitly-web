import { StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { GlobalStore } from "./store";
import { User } from "@/services/users";

export interface UsersStore {
  me?: User;
  setMe: (user: User) => void;
}

export const createUsersStoreSlice: StateCreator<
  GlobalStore,
  [],
  [],
  UsersStore
> = set => ({
  me: undefined,
  setMe: user => set({ me: user }),
});

// export const useUsersStore = create<UsersState>()(
//   devtools(
//     persist(
//       set => ({
//         me: undefined,
//         setMe(user) {
//           set({ me: user });
//         },
//       }),
//       {
//         name: "users-storage",
//       }
//     )
//   )
// );
