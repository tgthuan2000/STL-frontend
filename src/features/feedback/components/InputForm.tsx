import { useAutoAnimate } from '@formkit/auto-animate/react'
import { PaperAirplaneIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { InputFormProps } from '~/@types/feedback'
import LANGUAGE from '~/i18n/language/key'

const InputForm: React.FC<InputFormProps> = ({ onSubmit, defaultMessage = '' }) => {
    const { t } = useTranslation()
    const [submitRef] = useAutoAnimate<HTMLDivElement>()
    const form = useForm({
        defaultValues: {
            message: defaultMessage,
        },
    })

    const handleSubmit = (data: { message: string }) => {
        const message = data.message.trim()
        if (!message) return
        onSubmit(message)
        form.reset()
    }

    return (
        <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='relative flex gap-2 dark:bg-slate-700 bg-white items-center border border-gray-400 dark:border-slate-700 dark:text-white pl-2 pr-3 h-10 w-full rounded-full'
        >
            <Controller
                name='message'
                control={form.control}
                render={({ field }) => (
                    <input
                        type='text'
                        autoFocus
                        placeholder={t(LANGUAGE.TYPE_YOUR_MESSAGE) as string}
                        autoComplete='off'
                        className='w-full flex-1 sm:text-base text-sm border-none outline-none bg-transparent focus:ring-transparent'
                        {...field}
                    />
                )}
            />
            <div className='flex-shrink-0 inline-flex items-center' ref={submitRef}>
                {form.watch('message').trim() && (
                    <button type='submit' className='text-indigo-500 hover:opacity-50 font-bold'>
                        <PaperAirplaneIcon className='h-6' />
                    </button>
                )}
            </div>
        </form>
    )
}

export default InputForm
