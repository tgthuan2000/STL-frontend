import { useAutoAnimate } from '@formkit/auto-animate/react'
import React from 'react'
import { AnimateWrapProps } from '~/@types/components'

const AnimateWrap: React.FC<AnimateWrapProps> = (props) => {
    const { children, className, style } = props
    const [parent] = useAutoAnimate<HTMLDivElement>()

    return (
        <div className={className} style={style} ref={parent}>
            {children}
        </div>
    )
}

export default AnimateWrap
