import { CredentialResponse } from '@react-oauth/google'
import { SanityAssetDocument, SanityDocument } from '@sanity/client'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import React from 'react'

export interface IUserProfile {
    _id: string
    image: string | undefined
    email: string
    userName: string
    google: string
    isHasPassword: boolean
    allowSendMail: boolean
    enableTwoFactor: boolean
}

type Token = { accessToken?: string | null; refreshToken?: string | null }
type AddToken = (token: Token) => void

export type AuthStore = {
    accessToken: string | null
    refreshToken: string | null
    setToken: AddToken
    removeToken: () => void
}

type AddUserProfile = (userProfile: SanityDocument<IUserProfile>) => void
interface UserProfileStore {
    userProfile: SanityDocument<IUserProfile> | null
    addUserProfile: AddUserProfile
    removeUserProfile: () => void
}

export type IFetchGoogleResponse = (
    res: CredentialResponse,
    addToken: AddToken,
    addUserProfile: AddUserProfile,
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
    addToken: AddToken,
    addUserProfile: AddUserProfile,
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
