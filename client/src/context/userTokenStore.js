import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

const userTokenStore = (set) => ({
    userToken: null,
    setUserToken: (token) => set({ userToken: token }),
    removeUserToken: () => set({ userToken: null })
})

const useUserToken = create(
    devtools(
        persist(userTokenStore, {
            name: 'user-token'
        })
    )
)

export default useUserToken;