import { CredentialResponse } from '@react-oauth/google'

interface IUserProfile {
    _id: string
    userName: string
    image: string
}

interface SetUserProfile {
    userProfile: IUserProfile
}

type AddUserProfile = (userProfile: IUserProfile) => void

export type AuthStore = (set: (user: SetUserProfile) => void) => {
    userProfile: IUserProfile | null
    addUserProfile: AddUserProfile
}

export type IFetchGoogleResponse = (res: CredentialResponse, addUser: AddUserProfile) => void

export interface GoogleData {
    sub: string
    image: string
    userName: string
}
