import { LanguageIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import { SettingComponentProps } from '~/@types/setting'
import { LOCAL_STORAGE_KEY } from '~/constant/localStorage'
import { useLocalStorage } from '~/hook'
import { languages } from '~/i18n'
import LANGUAGE from '~/i18n/language/key'

const languageFlat = languages.flat()

const Language: React.FC<SettingComponentProps> = (props) => {
    const { className } = props
    const { i18n, t } = useTranslation()
    const [, setLanguageStorage] = useLocalStorage(LOCAL_STORAGE_KEY.STL_LANGUAGE)

    const handleChange = () => {
        const index = languageFlat.findIndex((l) => l.code === i18n.language)
        const nextIndex = index + 1 >= languageFlat.length ? 0 : index + 1
        const language = languageFlat[nextIndex]
        i18n.changeLanguage(language.code)
        setLanguageStorage(language.code)
    }

    return (
        <button type='button' className={className} onClick={handleChange}>
            <LanguageIcon className='h-6 w-6 flex-shrink-0 sm:h-8 sm:w-8' />
            <p className='text-sm sm:text-base'>{t(LANGUAGE.LANGUAGE_CHOOSE)}</p>
        </button>
    )
}

export default Language
