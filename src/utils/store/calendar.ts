import { create } from "zustand"

interface CalendarStore {
  date: Date
  nextMonth: () => void
  prevMonth: () => void
}

const useCalendarStore = create<CalendarStore>((set) => ({
  date: new Date(),
  nextMonth: () =>
    set((state) => ({
      date: new Date(state.date.setMonth(state.date.getMonth() + 1)),
    })),
  prevMonth: () =>
    set((state) => ({
      date: new Date(state.date.setMonth(state.date.getMonth() - 1)),
    })),
}))

export default useCalendarStore
