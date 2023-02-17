import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AuthStore, UserProfileStore } from '~/@types/auth'
import { LOCAL_STORAGE_KEY } from '~/constant/localStorage'

const authStore: AuthStore = (set) => ({
    accessToken: null,
    addAccessToken: (accessToken) => {
        set({ accessToken })
    },
    removeAccessToken: () => {
        set({ accessToken: null })
    },
})

export const useAccessToken = create(
    persist(authStore, {
        name: LOCAL_STORAGE_KEY.STL_AUTH,
        version: 1,
    })
)

const useAuth = create<UserProfileStore>((set) => ({
    userProfile: null,
    addUserProfile: (userProfile) => {
        set({ userProfile })
    },
    removeUserProfile: () => {
        set({ userProfile: null })
    },
}))

export default useAuth
