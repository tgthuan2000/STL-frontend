import { Howl } from 'howler'
import { Quill } from 'react-quill'
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

export const reactQuillOptions = {
    modules: {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            ['link', 'image'],
            ['clean'],
        ],
        imageResize: {
            parchment: Quill.import('parchment'),
            modules: ['Resize', 'DisplaySize'],
        },
        clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
        },
    },
    formats: [
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'align',
    ],
}
export const acceptImageType = ['image/jpeg', 'image/png', 'image/jpg']

export const notifySound = new Howl({
    src: ['notify-sound.wav'],
})

export const getSizeAvatarUser = {
    small: 'h-8 w-8',
    medium: 'h-10 w-10',
    large: 'h-12 w-12',
    custom: '',
}

export const people = [
    { _id: 1, name: 'Wade Cooper' },
    { _id: 2, name: 'Arlene Mccoy' },
    { _id: 3, name: 'Devon Webb' },
    { _id: 4, name: 'Tom Cook' },
    { _id: 5, name: 'Tanya Fox' },
    { _id: 6, name: 'Hellen Schmidt' },
    { _id: 7, name: 'Caroline Schultz' },
    { _id: 8, name: 'Mason Heaney' },
    { _id: 9, name: 'Claudie Smitham' },
    { _id: 10, name: 'Emil Schaefer' },
]
