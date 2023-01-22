import clsx from 'clsx'
import React from 'react'
import LoadingButton from '~/components/Loading/LoadingButton'
import AnimateWrap from '../AnimateWrap'

const Title: React.FC<{ label?: string; onReload: () => void; loading: boolean }> = ({ label, onReload, loading }) => {
    return (
        <AnimateWrap className={clsx('flex items-center gap-3', loading ? 'mb-4' : 'mb-2')}>
            {loading ? (
                <h4 className='animate-pulse w-60 h-8 rounded-md bg-gray-200 dark:bg-slate-700' />
            ) : (
                <h4 className='text-gray-900 dark:text-white font-normal text-lg'>{label}</h4>
            )}
            <LoadingButton onReload={onReload} disabled={loading} />
        </AnimateWrap>
    )
}

export default Title
