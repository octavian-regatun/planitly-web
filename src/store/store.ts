import { create } from "zustand";
import { UsersStore, createUsersStoreSlice } from "./users";
import { devtools, persist } from "zustand/middleware";
import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";

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
