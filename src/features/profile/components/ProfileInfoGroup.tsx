import clsx from 'clsx'
import React from 'react'
import { ProfileInfoGroupProps } from '~/@types/profile'

const ProfileInfoGroup: React.FC<ProfileInfoGroupProps> = ({ title, children, className, wrapClassName }) => {
    return (
        <div className={clsx('bg-slate-50 p-2 sm:p-3 rounded-lg', wrapClassName)}>
            <h4 className='sm:text-base text-sm text-gray-500 font-normal'>{title}</h4>
            <hr />
            <div className={clsx('mt-2', className)}>{children}</div>
        </div>
    )
}

export default ProfileInfoGroup
