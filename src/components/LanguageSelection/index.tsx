import i18next from 'i18next'
import { get } from 'lodash'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { LOCAL_STORAGE_KEY } from '~/constant/localStorage'
import { useLocalStorage } from '~/hook'
import { Language, languages } from '~/i18n'
import { ButtonGroup } from '../_base'

const LanguageSelection = () => {
    const { i18n } = useTranslation()
    const [, setLanguageStorage] = useLocalStorage(LOCAL_STORAGE_KEY.STL_LANGUAGE)
    const form = useForm({
        defaultValues: {
            language: languages.flat().find((l) => l.code === i18n.language),
        },
    })

    const handleSubmit: SubmitHandler<{
        language: Language | undefined
    }> = ({ language }) => {
        if (language) {
            i18next.changeLanguage(language.code)
            setLanguageStorage(language.code)
        }
    }

    return (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            <ButtonGroup
                type='submit'
                form={form}
                name='language'
                data={languages}
                getItemKey={(item) => get(item, 'code')}
                getItemLabel={(item) => get(item, 'name')}
            />
        </form>
    )
}

export default LanguageSelection
