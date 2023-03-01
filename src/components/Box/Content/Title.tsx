import React from 'react'
import { BoxTitleProps } from '~/@types/components'
import LoadingButton from '~/components/Loading/LoadingButton'

const Title: React.FC<BoxTitleProps> = ({ title, onReload, loading, customEvent }) => {
    if (!title) return null
    return (
        <div className='flex items-center justify-between border-b border-gray-200 bg-white px-4 py-2 dark:border-slate-700 dark:bg-slate-700'>
            <h4 className='text-base font-normal text-gray-900 dark:text-white sm:text-lg'>{title}</h4>
            <div className='inline-flex gap-2'>
                {customEvent}
                {onReload && <LoadingButton onReload={onReload} disabled={loading} />}
            </div>
        </div>
    )
}

export default Title
