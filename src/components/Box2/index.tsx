import React from 'react'
import { Box2Props } from '~/@types/components'
import AnimateWrap from '../AnimateWrap'
import { ContentUserLoan, ContentLoan } from './Content'
import Title from './Title'

const Box2 = ({ data, label, onReload, loading = false, children }: Box2Props) => {
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
