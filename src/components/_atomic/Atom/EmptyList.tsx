import { ArchiveBoxXMarkIcon } from '@heroicons/react/24/outline'
import { DefaultTFuncReturn } from 'i18next'
import React from 'react'
import { useTranslation } from 'react-i18next'
import LANGUAGE from '~/i18n/language/key'

interface Props {
    icon?: any
    text?: DefaultTFuncReturn
    children?: React.ReactNode
}

const EmptyList: React.FC<Props> = (props) => {
    const { t } = useTranslation()
    const { text = t(LANGUAGE.EMPTY_DATA), icon: Icon = ArchiveBoxXMarkIcon, children } = props

    return (
        <div className='p-6 text-center text-gray-400 hover:text-gray-600 dark:text-slate-300 dark:hover:text-slate-200'>
            <div className='flex flex-col items-center gap-4'>
                <Icon className='h-12 w-12' />
                {text}
                {children}
            </div>
        </div>
    )
}

export default EmptyList
