import React from 'react'
import AnimateWrap from '../AnimateWrap'
import { ContentUserLoan, ContentLoan } from './Content'
import Title from './Title'

const Box2 = ({
    data,
    label,
    onReload,
    loading = false,
    children,
}: {
    children?: (data: { data: any[] | undefined; loading: boolean }) => React.ReactNode
    data: any[] | undefined
    label?: string
    loading?: boolean
    onReload: () => void
}) => {
    return (
        <div>
            <Title label={label} onReload={onReload} loading={loading} />
            <AnimateWrap className='flex lg:flex-wrap gap-4 w-full overflow-x-auto overflow-y-hidden pb-6'>
                {children?.({ data, loading })}
            </AnimateWrap>
        </div>
    )
}

Box2.Content1 = ContentUserLoan
Box2.ContentLoan = ContentLoan

export default Box2
