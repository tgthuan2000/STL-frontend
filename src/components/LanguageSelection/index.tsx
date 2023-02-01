import { useEffect, useRef } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { LOCAL_STORAGE_KEY } from '~/constant/localStorage'
import { useLocalStorage, useMounted } from '~/hook'
import languages, { Language } from '~/i18n/language'
import { Dropdown } from '../_base'

const LanguageSelection = () => {
    const { i18n } = useTranslation()
    const [, setLanguageStorage] = useLocalStorage(LOCAL_STORAGE_KEY.STL_LANGUAGE)
    const mounted = useMounted()
    const form = useForm({
        defaultValues: {
            language: languages.flat().find((l) => l.code === i18n.language),
        },
    })

    const handleSubmit: SubmitHandler<{
        language: Language | undefined
    }> = ({ language }) => {
        if (language) {
            i18n.changeLanguage(language.code)
            setLanguageStorage(language.code)
        }
    }

    useEffect(() => {
        if (mounted) {
            const language = form.watch('language')
            handleSubmit({ language })
        }
    }, [JSON.stringify(form.watch('language'))])

    return (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            <Dropdown
                form={form}
                customButtonClassName='inline-flex w-full justify-center rounded-md bg-gray-800 dark:bg-slate-700 disabled:bg-slate-500 dark:text-teal-500 lg:px-4 px-2 lg:py-2 py-1 text-sm font-medium text-white hover:opacity-80'
                name='language'
                data={languages}
                idKey='code'
                valueKey='name'
                showValueOnLabel
            />
        </form>
    )
}

export default LanguageSelection
