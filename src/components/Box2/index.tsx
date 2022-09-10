import React from 'react'
import { Box2Props } from '~/@types/components'
import { AnimateWrap } from '~/components'
import LoadingButton from '../Loading/LoadingButton'
import { ContentUserLoan, ContentLoan } from './Content'
import Title from './Title'

const Box2 = ({ data, label, onReload, loading = false, children, fallback }: Box2Props) => {
    return (
        <div>
            <Title label={label} onReload={onReload} loading={loading} />
            <AnimateWrap className='flex lg:flex-wrap gap-4 w-full overflow-x-auto overflow-y-hidden pb-6'>
                {children?.({ data, loading, fallback })}
            </AnimateWrap>
        </div>
    )
}

Box2.Content1 = ContentUserLoan
Box2.ContentLoan = ContentLoan

export default Box2

interface FallbackProps {
    children: React.ReactNode
}
const Fallback: React.FC<FallbackProps> = ({ children }) => {
    return (
        <div>
            <div className='flex items-center gap-3 mb-4'>
                <h4 className='animate-pulse w-60 h-8 rounded-md bg-gray-200' />
                <LoadingButton onReload={() => {}} disabled />
            </div>
            <div className='flex lg:flex-wrap gap-4 w-full overflow-x-auto overflow-y-hidden pb-6'>{children}</div>
        </div>
    )
}
