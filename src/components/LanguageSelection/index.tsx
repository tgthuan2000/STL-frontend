import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { LOCAL_STORAGE_KEY } from '~/constant/localStorage'
import { useLocalStorage, useMounted } from '~/hook'
import { Language, languages } from '~/i18n'
import { ButtonGroup } from '../_base'

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
            // window.location.reload()
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
            <ButtonGroup form={form} name='language' data={languages} idKey='code' valueKey='name' />
        </form>
    )
}

export default LanguageSelection
