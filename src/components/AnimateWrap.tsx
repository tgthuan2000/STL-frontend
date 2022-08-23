import React from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { AnimateWrapProps } from '~/@types/components'

const AnimateWrap: React.FC<AnimateWrapProps> = ({ children, className }) => {
    const [parent] = useAutoAnimate<HTMLDivElement>()

    return (
        <div className={className} ref={parent}>
            {children}
        </div>
    )
}

export default AnimateWrap
