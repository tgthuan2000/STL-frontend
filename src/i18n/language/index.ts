export { default as en } from './en'
export { default as vi } from './vi'

export interface Language {
    code: string
    name: string
}

const languages: Array<Language> = [
    {
        code: 'en',
        name: 'English',
    },
    {
        code: 'vi',
        name: 'Tiếng Việt',
    },
]

export default languages
