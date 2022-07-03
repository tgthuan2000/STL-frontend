import create from 'zustand'
import { persist } from 'zustand/middleware'
import { AuthStore } from '~/@types/auth'

const authStore: AuthStore = (set) => ({
    userProfile: null,
    addUserProfile: (userProfile) => set({ userProfile }),
})

const useAuth = create(
    persist(authStore, {
        name: 'auth',
    })
)

export default useAuth
