import clsx from 'clsx'
import React, { Suspense } from 'react'

const LoadingButton = React.lazy(() => import('~/components/Loading/LoadingButton'))
const AnimateWrap = React.lazy(() => import('../AnimateWrap'))

const Title: React.FC<{ label?: string; onReload: () => void; loading: boolean }> = ({ label, onReload, loading }) => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AnimateWrap className={clsx('flex items-center gap-3', loading ? 'mb-4' : 'mb-2')}>
                {loading ? (
                    <h4 className='animate-pulse w-60 h-8 rounded-md bg-gray-200' />
                ) : (
                    <h4 className='text-gray-900 font-normal text-lg'>{label}</h4>
                )}
                <LoadingButton onReload={onReload} disabled={loading} />
            </AnimateWrap>
        </Suspense>
    )
}

export default Title
