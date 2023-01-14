import { Howl } from 'howler'
import { DATE_FORMAT } from '.'

export enum DATA_LIST_MODE {
    TABLE = 1,
    LIST = 2,
}

export enum DATA_LIST_GROUP {
    DATE = 1,
    MONTH = 2,
    YEAR = 3,
}

export const __groupBy = {
    1: DATE_FORMAT.D_DATE,
    2: DATE_FORMAT.MONTH,
    3: DATE_FORMAT.YEAR,
}

export const toolbarRichText = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image'],
    ['clean'],
]

export const acceptImageType = ['image/jpeg', 'image/png', 'image/jpg']

export const notifySound = new Howl({
    src: ['notify-sound-2.wav'],
})

export const getSizeAvatarUser = {
    small: 'h-8 w-8',
    medium: 'h-10 w-10',
    large: 'h-12 w-12',
    custom: '',
}
