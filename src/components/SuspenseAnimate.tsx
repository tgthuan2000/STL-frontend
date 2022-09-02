import React, { Suspense } from 'react'
import { SuspenseAnimateProps } from '~/@types/components'
import AnimateWrap from './AnimateWrap'

const SuspenseAnimate: React.FC<SuspenseAnimateProps> = ({ className, children, fallback = <div>Loading...</div> }) => {
    return (
        <AnimateWrap className={className}>
            <Suspense fallback={fallback}>{children}</Suspense>
        </AnimateWrap>
    )
}

export default SuspenseAnimate
