import clsx from 'clsx'
import React from 'react'

interface Props {
    Icon: React.ForwardRefExoticComponent<
        React.SVGProps<SVGSVGElement> & { title?: string | undefined; titleId?: string | undefined }
    >
    className?: string
}

const CardIcon: React.FC<Props> = (props) => {
    const { Icon, className } = props

    return <Icon className={clsx('h-8 w-8 flex-shrink-0 sm:h-9 sm:w-9', className)} />
}

export default CardIcon
