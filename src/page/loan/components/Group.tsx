import clsx from 'clsx'
import React from 'react'

interface GroupProps {
    children: React.ReactNode
    label: string
    className?: string
}

const Group: React.FC<GroupProps> = ({ children, label, className }) => {
    return (
        <div className={clsx('flex gap-2', className)}>
            {label && <h4 className='inline-block font-medium text-gray-900'>{label}</h4>}
            {children}
        </div>
    )
}

export default Group
