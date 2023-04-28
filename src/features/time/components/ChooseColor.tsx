import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import React, { useCallback, useMemo } from 'react'
import { UseFormReturn, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { AnimateWrap } from '~/components'
import { Input } from '~/components/_base'
import LANGUAGE from '~/i18n/language/key'

interface Props {
    form: UseFormReturn<any, object>
    textColorName: string
    bgColorName: string
}
const ChooseColor: React.FC<Props> = (props) => {
    const { form, bgColorName, textColorName } = props
    const { t } = useTranslation()

    const __loopValid = form.watch('__loopValid') ?? true
    const __loopError = !!form.formState.errors.__loopValid

    const localForm = useForm({
        defaultValues: {
            textColor: form.getValues(textColorName),
            bgColor: form.getValues(bgColorName),
        },
    })

    const Icon = useMemo(() => (__loopValid ? LockClosedIcon : LockOpenIcon), [__loopValid])
    const title = useMemo(() => (__loopValid ? t(LANGUAGE.EDIT) : t(LANGUAGE.SAVE)), [__loopValid])

    const handleClick = useCallback(() => {
        if (!__loopValid) {
            form.setValue(textColorName, localForm.getValues('textColor'))
            form.setValue(bgColorName, localForm.getValues('bgColor'))
        }
        form.setValue('__loopValid', !__loopValid)
    }, [__loopValid])

    return (
        <div className=''>
            <div className='relative flex items-end gap-6'>
                <Input
                    disabled={__loopValid}
                    className='flex-1'
                    name='textColor'
                    type='color'
                    form={localForm}
                    label={t(LANGUAGE.TEXT_COLOR)}
                />
                <Input
                    disabled={__loopValid}
                    className='flex-1'
                    name='bgColor'
                    type='color'
                    form={localForm}
                    label={t(LANGUAGE.BG_COLOR)}
                />
                <span
                    className='pointer-events-none mb-1.5 inline-flex h-5 flex-1 select-none items-center rounded-l-full px-2'
                    style={{ background: localForm.watch('bgColor'), color: localForm.watch('textColor') }}
                >
                    <span className='text-sm'>{t(LANGUAGE.PLACEHOLDER_TEXT)}</span>
                </span>
                <button
                    className='absolute right-0 top-0 hover:opacity-70'
                    type='button'
                    onClick={handleClick}
                    title={title}
                >
                    <Icon
                        className={clsx(
                            'h-5 w-5 sm:h-6 sm:w-6',
                            { 'text-gray-500 dark:text-slate-200': __loopValid },
                            { 'text-orange-400': !__loopValid },
                            { '!text-red-500': !__loopValid && __loopError }
                        )}
                    />
                </button>
            </div>

            <AnimateWrap className='mt-1 flex flex-col'>
                {!__loopValid && (
                    <span className={clsx('font-medium', __loopError ? 'text-red-500' : 'text-orange-400')}>
                        {t(LANGUAGE.NEED_SAVE_TO_UPDATED)}
                    </span>
                )}
            </AnimateWrap>
        </div>
    )
}

export default ChooseColor
