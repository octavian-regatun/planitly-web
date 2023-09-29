import { create } from "zustand";

interface LayoutState {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const useLayoutStore = create<LayoutState>()(set => ({
  sidebarOpen: false,
  setSidebarOpen: open => set({ sidebarOpen: open }),
}));
