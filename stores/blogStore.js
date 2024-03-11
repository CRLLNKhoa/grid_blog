import { create } from 'zustand'

export const useBlogStore = create((set) => ({
  list: [],
  setList: (data) => set((state) => ({ list: data})),
  addList: (newBlog) => set((state) => ({ list: [...state.list,newBlog ]})),
//   removeAllBears: () => set({ bears: 0 }),
}))