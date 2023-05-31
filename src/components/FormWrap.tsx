import clsx from 'clsx'
import React from 'react'

interface Props {
    onSubmit?: React.FormEventHandler<HTMLFormElement>
    children: React.ReactNode
    renderButton?: React.ReactNode
    className?: string
}

const FormWrap: React.FC<Props> = (props) => {
    const { onSubmit, children, renderButton, className } = props

    return (
        <form onSubmit={onSubmit} className={clsx('flex h-full flex-col', className)}>
            <div className='h-0 flex-1 space-y-6 overflow-y-auto overflow-x-hidden px-4 pt-3 pb-5 sm:px-6'>
                {children}
            </div>
            {renderButton}
        </form>
    )
}

export default FormWrap
