import { LanguageIcon } from '@heroicons/react/24/outline'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SettingComponentProps } from '~/@types/setting'
import { LOCAL_STORAGE_KEY } from '~/constant/localStorage'
import { useLocalStorage } from '~/hook'
import languages from '~/i18n/language'

const languageFlat = languages.flat()

const Language: React.FC<SettingComponentProps> = (props) => {
    const { i18n } = useTranslation()
    const [, setLanguageStorage] = useLocalStorage(LOCAL_STORAGE_KEY.STL_LANGUAGE)
    const [label, setLabel] = useState(languageFlat.find((l) => l.code === i18n.language))

    const handleChangeLanguageClick = () => {
        const index = languageFlat.findIndex((l) => l.code === i18n.language)
        const nextIndex = index + 1 >= languageFlat.length ? 0 : index + 1
        const language = languageFlat[nextIndex]
        i18n.changeLanguage(language.code)
        setLanguageStorage(language.code)
        setLabel(language)
        window.location.reload()
    }

    return (
        <button type='button' {...props} onClick={handleChangeLanguageClick}>
            <LanguageIcon className='w-6 h-6 flex-shrink-0' />
            <p>{label?.name}</p>
        </button>
    )
}

export default Language
