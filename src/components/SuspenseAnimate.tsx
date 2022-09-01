import React, { Suspense } from 'react'
import { SuspenseAnimateProps } from '~/@types/components'
import AnimateWrap from './AnimateWrap'

const SuspenseAnimate: React.FC<SuspenseAnimateProps> = ({ className, children }) => {
    return (
        <AnimateWrap className={className}>
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </AnimateWrap>
    )
}

export default SuspenseAnimate
