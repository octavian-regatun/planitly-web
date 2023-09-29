import { devtools } from "zustand/middleware";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";
import { UsersStore, createUsersStoreSlice } from "./users";

export interface GlobalStore extends UsersStore {}

export const useStore = createWithEqualityFn<GlobalStore>()(
  devtools(
    (...a) => ({
      ...createUsersStoreSlice(...a),
    }),
    {
      name: "users-storage",
    }
  ),
  shallow
);
