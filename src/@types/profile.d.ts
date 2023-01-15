import React from 'react'

export interface ProfileInfoGroupProps {
    title: string
    children: React.ReactNode
    className?: string
    wrapClassName?: string
}
type profileData = string | number | React.ReactNode
type profileId = string | number
export interface ProfileInfoProps {
    label: string
    data: profileData
}
export interface profileValue {
    id: profileId
    title: string
    data: profileData
}
export interface profileOption {
    id: profileId
    title: string
    className: string
    values: profileValue[]
}
export type profileOptionFn = () => profileOption[]
