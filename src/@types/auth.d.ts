import { CredentialResponse } from '@react-oauth/google'
import { SanityDocument } from '@sanity/client'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import React from 'react'

export interface IUserProfile {
    _id: string
    _type: string
    image: string
    email: string
    userName: string
}

interface SetUserProfile {
    userProfile: SanityDocument<IUserProfile> | null
}

type AddUserProfile = (userProfile: SanityDocument<IUserProfile>) => void

export type AuthStore = (set: (user: SetUserProfile) => void) => {
    userProfile: SanityDocument<IUserProfile> | null
    addUserProfile: AddUserProfile
    removeUserProfile: () => void
}

export type IFetchGoogleResponse = (
    res: CredentialResponse,
    addUser: AddUserProfile,
    setLoading: (value: boolean) => void
) => void

export interface GoogleData {
    sub: string
    picture: string
    name: string
    email: string
}
