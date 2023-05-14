import { yupResolver } from '@hookform/resolvers/yup'
import React, { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { AnimateWrap, Button, CheckName } from '~/components'
import { Input } from '~/components/_base'
import LANGUAGE from '~/i18n/language/key'

const useSchema = () => {
    const { t } = useTranslation()
    const schema = useMemo(() => {
        return yup.object().shape({
            name: yup.string().required(t(LANGUAGE.REQUIRED_FIELD) as string),
        })
    }, [t])
    return schema
}

interface EditFormProps {
    name: any
    onCancel: () => void
    onSubmit: (data: any) => Promise<void>
    origin: any[]
}
const EditForm: React.FC<EditFormProps> = ({ name, origin, onCancel, onSubmit }) => {
    const { t } = useTranslation()
    const [loading, setLoading] = useState(false)
    const schema = useSchema()
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
            return item.name.toLowerCase().includes(watchName.toLowerCase()) && item.name !== name
        })
    }, [watchName])

    return (
        <form className='p-3' onSubmit={form.handleSubmit(handleSubmit)}>
            <div className='flex flex-col gap-2 rounded border p-5 shadow-md dark:border-slate-700'>
                <Input form={form} name='name' label={t(LANGUAGE.NAME)} autoFocus disabled={loading} />
                <CheckName show={Boolean(!loading && watchName.length >= 2)} list={sameList} watchValue={watchName} />
                <AnimateWrap className='flex gap-2'>
                    {loading ? (
                        <span className='animate-pulse font-normal text-gray-900 dark:text-slate-200'>
                            {t(LANGUAGE.SAVING)}
                        </span>
                    ) : (
                        <>
                            <Button type='submit' color='cyan' disabled={loading}>
                                {t(LANGUAGE.SAVE)}
                            </Button>
                            <Button type='button' color='outline' onClick={onCancel} disabled={loading}>
                                {t(LANGUAGE.CANCEL)}
                            </Button>
                        </>
                    )}
                </AnimateWrap>
            </div>
        </form>
    )
}

export default EditForm
