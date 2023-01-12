import { CredentialResponse } from '@react-oauth/google'
import { SanityDocument } from '@sanity/client'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import React from 'react'

export interface IUserProfile {
    _id: string
    image: string
    email: string
    userName: string
    google: string
    isHasPassword: boolean
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
) => Promise<void>

export interface GoogleData {
    sub: string
    picture: string
    name: string
    email: string
}

export interface LoginForm {
    password: string
    data: SanityDocument<IUserProfile>
}
export type ILoginByEmailPassword = (
    data: LoginForm,
    addUser: AddUserProfile,
    setLoading: (value: boolean) => void
) => Promise<void>

export interface LoginByEmailPasswordFormProps {
    onSubmit: (data: LoginForm) => Promise<void>
    onBack: () => void
}

export interface Step1Props {
    onSubmit: (data: { email: string }) => void
}

export type SubmitPassword = (payloads: { password: string }, data: SanityDocument<IUserProfile>) => void
export interface Step2Props {
    previewData: SanityDocument<IUserProfile>[] | null
    onSubmit: SubmitPassword
}
