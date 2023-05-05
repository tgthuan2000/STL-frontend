import { PaperAirplaneIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { AnimateWrap } from '~/components'
import LANGUAGE from '~/i18n/language/key'

export interface Props {
    onSubmit: (message: string) => Promise<void>
    defaultMessage?: string
    disabled?: boolean
    autoFocus?: boolean
}

const InputForm: React.FC<Props> = ({ onSubmit, defaultMessage = '', disabled, autoFocus = true }) => {
    const { t } = useTranslation()
    const [disabledSubmit, setDisabledSubmit] = useState(false)
    const form = useForm({
        defaultValues: {
            message: defaultMessage,
        },
    })

    const handleSubmit = async (data: { message: string }) => {
        const message = data.message.trim()
        if (!message) return
        setDisabledSubmit(true)
        form.reset()
        await onSubmit(message)
        setTimeout(() => {
            setDisabledSubmit(false)
        }, 1000)
    }

    return (
        <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='relative flex h-10 w-full items-center gap-2 rounded-full border border-gray-400 bg-white pl-2 pr-3 dark:border-slate-700 dark:bg-slate-700 dark:text-white'
        >
            <Controller
                name='message'
                control={form.control}
                render={({ field }) => (
                    <input
                        type='text'
                        autoFocus={autoFocus}
                        placeholder={t(LANGUAGE.TYPE_YOUR_MESSAGE) as string}
                        autoComplete='off'
                        className='w-full flex-1 border-none bg-transparent text-sm outline-none focus:ring-transparent disabled:opacity-50 sm:text-base'
                        disabled={disabled}
                        {...field}
                    />
                )}
            />
            <AnimateWrap className='inline-flex flex-shrink-0 items-center'>
                {form.watch('message').trim() && (
                    <button
                        type='submit'
                        className='font-bold text-indigo-500 hover:opacity-50 disabled:opacity-30'
                        disabled={disabledSubmit}
                    >
                        <PaperAirplaneIcon className='h-6' />
                    </button>
                )}
            </AnimateWrap>
        </form>
    )
}

export default InputForm
