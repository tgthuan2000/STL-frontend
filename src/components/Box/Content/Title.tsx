import clsx from 'clsx'
import React from 'react'
import LoadingButton from '~/components/Loading/LoadingButton'

const Title: React.FC<{ title?: string; onReload?: () => void; loading?: boolean }> = ({
    title,
    onReload,
    loading,
}) => {
    if (!title) return null
    return (
        <div className='flex justify-between items-center border-b border-gray-200 bg-gray-50 px-4 py-2'>
            <h4 className={clsx('text-base font-medium text-gray-500', { 'animate-pulse': loading })}>
                {loading ? 'Đang tải... ' : title}
            </h4>
            {onReload && <LoadingButton onReload={onReload} disabled={loading} />}
        </div>
    )
}

export default Title
