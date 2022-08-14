import { useAutoAnimate } from '@formkit/auto-animate/react'
import React from 'react'
import { AnimateWrapProps } from '~/@types/loan'

const AnimateWrap: React.FC<AnimateWrapProps> = ({ children }) => {
    const [parent] = useAutoAnimate<HTMLDivElement>()

    return <div ref={parent}>{children}</div>
}

export default AnimateWrap
