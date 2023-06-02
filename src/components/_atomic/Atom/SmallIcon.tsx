import clsx from 'clsx'
import React from 'react'

interface Props {
    Icon: React.ForwardRefExoticComponent<
        React.SVGProps<SVGSVGElement> & { title?: string | undefined; titleId?: string | undefined }
    >
    type?: 'button' | 'submit'
    title?: string
    disabled?: boolean
    className?: string
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const SmallIcon: React.FC<Props> = (props) => {
    const { type = 'button', disabled, className, Icon, title, onClick } = props

    return (
        <button
            type={type}
            title={title}
            className={clsx('group cursor-pointer disabled:cursor-wait', className)}
            onClick={onClick}
            disabled={disabled}
        >
            <Icon className='h-4 w-4 text-gray-500 group-hover:text-gray-400 group-disabled:text-gray-300 dark:text-slate-200' />
        </button>
    )
}

export default SmallIcon
