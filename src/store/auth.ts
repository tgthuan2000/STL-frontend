import create from 'zustand'
import { persist } from 'zustand/middleware'
import { AuthStore } from '~/@types/auth'

const authStore: AuthStore = (set) => ({
    userProfile: null,
    addUserProfile: (userProfile) => set({ userProfile }),
    removeUserProfile: () => set({ userProfile: null }),
})

const useAuth = create(
    persist(authStore, {
        name: 'STL-auth',
    })
)

export default useAuth
