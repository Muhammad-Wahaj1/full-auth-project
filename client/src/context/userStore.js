import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

const userStore = (set) => ({
    user: null,
    setUser: (userData) => set({ user: userData }),
    removeUser: () => set({ user: null })
})
const useUserStore = create(
    devtools(
        persist(userStore, {
            name: 'user-data'
        })
    )
)
export default useUserStore;