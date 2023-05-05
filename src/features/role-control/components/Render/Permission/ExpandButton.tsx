import clsx from 'clsx'
import React from 'react'

interface ExpandButtonProps {
    className?: string
    expand?: boolean
    Icon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const ExpandButton: React.FC<ExpandButtonProps> = (props) => {
    const { expand, className, Icon, onClick } = props

    return (
        <button
            type='button'
            onClick={onClick}
            className={clsx(
                'text-gray-700 transition dark:text-slate-300 sm:group-hover:opacity-100',
                expand ? 'opacity-100' : 'sm:opacity-0',
                className
            )}
        >
            <Icon className='h-5 w-5' />
        </button>
    )
}

export default ExpandButton
