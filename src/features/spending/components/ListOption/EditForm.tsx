import { useAutoAnimate } from '@formkit/auto-animate/react'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { Button, CheckName } from '~/components'
import { Input } from '~/components/_base'
import i18n from '~/i18n'
import LANGUAGE from '~/i18n/language/key'

const { t } = i18n
const schema = yup.object().shape({
    name: yup.string().required(t(LANGUAGE.REQUIRED_FIELD) as string),
})

interface EditFormProps {
    name: any
    onCancel: () => void
    onSubmit: (data: any) => Promise<void>
    origin: any[]
}
const EditForm: React.FC<EditFormProps> = ({ name, origin, onCancel, onSubmit }) => {
    const { t } = useTranslation()
    const [parent] = useAutoAnimate<HTMLDivElement>()
    const [loading, setLoading] = useState(false)
    const form = useForm({
        defaultValues: {
            name,
        },
        resolver: yupResolver(schema),
    })
    const watchName = form.watch('name')
    const handleSubmit = async (data: any) => {
        const _name = data.name.trim()
        if (_name === name) {
            toast.warn(t(LANGUAGE.NOTIFY_NO_CHANGE))
            return
        }
        try {
            setLoading(true)
            await onSubmit({ name: _name })
            onCancel()
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const sameList = useMemo(() => {
        return origin?.filter((item) => {
            return item.name.toLowerCase().includes(watchName.toLowerCase())
        })
    }, [watchName])

    return (
        <form className='p-3' onSubmit={form.handleSubmit(handleSubmit)}>
            <div className='p-5 flex flex-col gap-2 rounded border shadow-md'>
                <Input form={form} name='name' label={t(LANGUAGE.NAME)} autoFocus disabled={loading} />
                <CheckName show={Boolean(!loading && watchName.length >= 2)} list={sameList} watchValue={watchName} />
                <div className='flex gap-2' ref={parent}>
                    {loading ? (
                        <span className='animate-pulse text-gray-900 dark:text-slate-200 font-normal'>
                            {t(LANGUAGE.LOADING)}
                        </span>
                    ) : (
                        <>
                            <Button type='submit' color='cyan' disabled={loading}>
                                {t(LANGUAGE.SAVE)}
                            </Button>
                            <Button type='button' color='primary' onClick={onCancel} disabled={loading}>
                                {t(LANGUAGE.CANCEL)}
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </form>
    )
}

export default EditForm
