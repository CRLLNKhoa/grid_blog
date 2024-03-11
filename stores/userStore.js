import { create } from 'zustand'

export const useUserStore = create((set) => ({
  uid: undefined,
  dashboardData: undefined,
  info: undefined,
  setInfo: (data) => set((state) => ({ info: data })),
  setUid: (id) => set((state) => ({ uid: id })),
  setDashboard: (data) => set((state) => ({ dashboardData: data })),
}))