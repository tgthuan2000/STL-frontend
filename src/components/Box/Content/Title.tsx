import React from 'react'
import { BoxTitleProps } from '~/@types/components'
import LoadingButton from '~/components/Loading/LoadingButton'

const Title: React.FC<BoxTitleProps> = ({ title, onReload, loading, customEvent }) => {
    if (!title) return null
    return (
        <div className='flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-2 dark:border-slate-600 dark:bg-slate-700'>
            <h4 className='text-base font-medium text-gray-500 dark:text-white'>{title}</h4>
            <div className='inline-flex gap-2'>
                {customEvent}
                {onReload && <LoadingButton onReload={onReload} disabled={loading} />}
            </div>
        </div>
    )
}

export default Title
