import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AuthStore } from '~/@types/auth'
import { LOCAL_STORAGE_KEY } from '~/constant/localStorage'

const authStore: AuthStore = (set) => ({
    userProfile: null,
    addUserProfile: (userProfile) => set({ userProfile }),
    removeUserProfile: () => set({ userProfile: null }),
})

const useAuth = create(
    persist(authStore, {
        name: LOCAL_STORAGE_KEY.STL_AUTH,
    })
)

export default useAuth
