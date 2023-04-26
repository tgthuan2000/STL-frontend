import { SanityAssetDocument } from '@sanity/client'

export interface Loop {
    _id: string
    name: string
}

export interface ICalendar {
    _id: string
    title: string
    startDate: string
    endDate: string
    textColor: string
    bgColor: string
    image: SanityAssetDocument
    loop: Loop
}
