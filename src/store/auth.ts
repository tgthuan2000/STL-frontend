import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AuthStore, UserProfileStore } from '~/@types/auth'
import { LOCAL_STORAGE_KEY } from '~/constant/localStorage'

export const useAuth = create<AuthStore, [['zustand/persist', AuthStore]]>(
    persist(
        (set) => ({
            accessToken: null,
            refreshToken: null,
            setToken: (token) => {
                set((prev) => ({ ...prev, ...token }))
            },
            removeToken: () => {
                set({ accessToken: null, refreshToken: null })
            },
        }),
        {
            name: LOCAL_STORAGE_KEY.STL_AUTH,
            version: 1,
        }
    )
)

export const useProfile = create<UserProfileStore>((set) => ({
    userProfile: null,
    addUserProfile: (userProfile) => {
        set({ userProfile })
    },
    removeUserProfile: () => {
        set({ userProfile: null })
    },
}))
