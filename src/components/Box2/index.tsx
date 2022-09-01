import React, { Suspense } from 'react'
import { Box2Props } from '~/@types/components'
import { ContentUserLoan, ContentLoan } from './Content'

const Title = React.lazy(() => import('./Title'))
const AnimateWrap = React.lazy(() => import('../AnimateWrap'))

const Box2 = ({ data, label, onReload, loading = false, children }: Box2Props) => {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <Title label={label} onReload={onReload} loading={loading} />
                <AnimateWrap className='flex lg:flex-wrap gap-4 w-full overflow-x-auto overflow-y-hidden pb-6'>
                    {children?.({ data, loading })}
                </AnimateWrap>
            </Suspense>
        </div>
    )
}

Box2.Content1 = ContentUserLoan
Box2.ContentLoan = ContentLoan

export default Box2
