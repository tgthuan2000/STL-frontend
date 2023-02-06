import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { LOCAL_STORAGE_KEY } from '~/constant/localStorage'
import languages, * as AllResources from './language'

const { default: _, ...resources } = AllResources

let languageStorage = localStorage.getItem(LOCAL_STORAGE_KEY.STL_LANGUAGE)
const languageOptions = languages.flat().map((language) => language.code)
let lng = languageOptions[1] // vi
if (languageStorage) {
    languageStorage = JSON.parse(languageStorage) as string
    if (languageOptions.includes(languageStorage)) {
        lng = languageStorage
    }
}

i18n.use(initReactI18next).init<string>({
    resources: resources as any,
    lng,
    fallbackLng: 'vi',
})

export default i18n
