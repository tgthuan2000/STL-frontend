import { useAutoAnimate } from '@formkit/auto-animate/react'
import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { yupResolver } from '@hookform/resolvers/yup'
import { SanityDocument } from '@sanity/client'
import { isEmpty } from 'lodash'
import { useMemo, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import { IUserProfile, Step2Props } from '~/@types/auth'
import { Button, Image } from '~/components'
import { Input } from '~/components/_base'
import { UserSvg } from '~/components/_constant'
import { useLoading } from '~/context'
import LANGUAGE from '~/i18n/language/key'

const useSchema = () => {
    const { t } = useTranslation()
    const schema = useMemo(() => {
        return yup.object().shape({
            password: yup.string().required(t(LANGUAGE.REQUIRED_FIELD) as string),
        })
    }, [t])
    return schema
}

const Step2: React.FC<Step2Props> = ({ previewData, onSubmit }) => {
    const { t } = useTranslation()
    const [parent] = useAutoAnimate<HTMLDivElement>()
    const [chose, setChose] = useState<SanityDocument<IUserProfile> | null | undefined>(previewData?.[0])
    const { loading } = useLoading()
    const schema = useSchema()
    const form = useForm<{ password: string }>({
        mode: 'onBlur',
        defaultValues: {
            password: '',
        },
        resolver: yupResolver(schema),
    })
    const handleSubmit: SubmitHandler<{ password: string }> = (data) => {
        if (!chose) return
        onSubmit(data, chose)
    }

    return (
        <div className='space-y-3'>
            {!isEmpty(previewData) && (
                <div className='select-none overflow-hidden rounded-lg bg-white shadow-md dark:bg-slate-800'>
                    {previewData?.map((data) => {
                        const checked = data._id === chose?._id
                        return (
                            <div
                                key={data._id}
                                className='flex cursor-pointer items-center gap-2 px-4 py-2'
                                onClick={() => !checked && setChose(data)}
                            >
                                <Image
                                    src={data.image}
                                    alt={data.userName}
                                    avatar={{ roundFull: true, size: 'custom' }}
                                    className='h-8 w-8'
                                />

                                <div className='max-w-[250px] flex-1'>
                                    <p className='truncate font-medium text-gray-900 dark:text-slate-200'>
                                        {data.userName}
                                    </p>
                                    <small className='block truncate font-normal text-gray-500'>{data.email}</small>
                                </div>
                                {checked && <CheckCircleIcon className='h-6 text-cyan-500' />}
                            </div>
                        )
                    })}
                </div>
            )}
            <div ref={parent}>
                {chose?.isHasPassword ? (
                    <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-2'>
                        <Input
                            name='password'
                            form={form}
                            label={t(LANGUAGE.PASSWORD)}
                            type='password'
                            disabled={loading.config}
                            autoFocus
                        />
                        <Button className='!text-xs' color='cyan' type='submit' disabled={loading.config}>
                            {t(LANGUAGE.LOGIN)}
                        </Button>
                    </form>
                ) : (
                    <div className='flex select-none items-center gap-2 rounded-md bg-yellow-500 p-3 text-white'>
                        <ExclamationTriangleIcon className='h-6' />
                        <p className='font-normal'>{t(LANGUAGE.ACCOUNT_NOT_HAVE_PASSWORD)}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Step2
