import { SanityAssetDocument } from '@sanity/client'

export interface Loop {
    _id: string
    key: string
    name: string
}

export interface ICalendar {
    _id: string
    title: string
    startDate: string
    endDate: string
    textColor: string
    bgColor: string
    loop: Loop
}

export interface ICalendarDetail extends ICalendar {
    description?: string
    image?: SanityAssetDocument
}
