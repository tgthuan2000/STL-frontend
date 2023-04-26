import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/24/outline'
import React, { useCallback, useMemo, useState } from 'react'
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
    const [fix, setFix] = useState(false)

    const localForm = useForm({
        defaultValues: {
            textColor: form.getValues(textColorName),
            bgColor: form.getValues(bgColorName),
        },
    })

    const Icon = useMemo(() => (fix ? LockOpenIcon : LockClosedIcon), [fix])

    const handleClick = useCallback(() => {
        if (fix) {
            form.setValue(textColorName, localForm.getValues('textColor'))
            form.setValue(bgColorName, localForm.getValues('bgColor'))
        }
        setFix((prev) => !prev)
    }, [fix])

    const title = useMemo(() => (fix ? t(LANGUAGE.SAVE) : t(LANGUAGE.EDIT)), [fix])

    return (
        <div className=''>
            <div className='relative flex items-end gap-6'>
                <Input
                    disabled={!fix}
                    className='flex-1'
                    name='textColor'
                    type='color'
                    form={localForm}
                    label={t(LANGUAGE.TEXT_COLOR)}
                />
                <Input
                    disabled={!fix}
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
                    <Icon className='h-5 w-5 text-gray-500 dark:text-slate-200 sm:h-6 sm:w-6' />
                </button>
            </div>

            <AnimateWrap className='mt-1'>
                {fix && <span className='font-medium text-orange-400'>{t(LANGUAGE.NEED_SAVE_TO_UPDATED)}</span>}
            </AnimateWrap>
        </div>
    )
}

export default ChooseColor
