import i18n from 'i18next'
import I18NextHttpBackend, { HttpBackendOptions } from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'
import { LOCAL_STORAGE_KEY } from '~/constant/localStorage'

export interface Language {
    code: string
    name: string
}

export const languages: Array<Language> = [
    {
        code: 'en',
        name: 'English',
    },
    {
        code: 'vi',
        name: 'Tiếng Việt',
    },
]

let languageStorage = localStorage.getItem(LOCAL_STORAGE_KEY.STL_LANGUAGE)
const languageOptions = languages.flat().map((language) => language.code)
let lng = languageOptions[1] // vi
if (languageStorage) {
    languageStorage = JSON.parse(languageStorage) as string
    if (languageOptions.includes(languageStorage)) {
        lng = languageStorage
    }
}

i18n.use(initReactI18next)
    .use(I18NextHttpBackend)
    .init<HttpBackendOptions>({
        lng,
        fallbackLng: 'vi',
        backend: {
            loadPath: '/locales/{{lng}}.json',
        },
    })
