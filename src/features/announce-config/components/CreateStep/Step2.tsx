import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import { CreateStep2Props } from '~/@types/announce-config'
import { DraftNotify, NotifyTitleDescForm } from '~/@types/notify'
import { Input, RichText } from '~/components/_base'
import { LOCAL_STORAGE_KEY } from '~/constant/localStorage'
import { useLocalStorage } from '~/hook'
import i18n from '~/i18n'
import LANGUAGE from '~/i18n/language/key'

const { t } = i18n

const schema = yup.object().shape({
    title: yup.string().required(t(LANGUAGE.REQUIRED_NOTIFY_TITLE) as string),
    description: yup.string(),
})

const Step2: React.FC<CreateStep2Props> = ({ id, onSubmit }) => {
    const { t } = useTranslation()
    const [draftNotify] = useLocalStorage<DraftNotify>(LOCAL_STORAGE_KEY.STL_DRAFT_NOTIFY)
    const form = useForm<NotifyTitleDescForm>({
        defaultValues: {
            title: draftNotify?.title ?? '',
            description: draftNotify?.description ?? '',
        },
        resolver: yupResolver(schema),
    })
    const handleSubmit = async (data: NotifyTitleDescForm) => {
        onSubmit(data)
    }
    return (
        <form
            id={id}
            onSubmit={form.handleSubmit(handleSubmit)}
            className='mx-auto flex h-full w-full max-w-xl flex-col'
        >
            <div className='mb-5 space-y-5'>
                <Input label={t(LANGUAGE.TITLE)} form={form} name='title' autoFocus />
                <RichText
                    label={t(LANGUAGE.SHORT_DESCRIPTION)}
                    form={form}
                    name='description'
                    placeholder={t(LANGUAGE.PLACEHOLDER_SHORT_DESCRIPTION)}
                    className='xs'
                />
            </div>
        </form>
    )
}

export default Step2
