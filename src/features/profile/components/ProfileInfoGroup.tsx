import clsx from 'clsx'
import React from 'react'
import { ProfileInfoGroupProps } from '~/@types/profile'

const ProfileInfoGroup: React.FC<ProfileInfoGroupProps> = ({ title, children, className, wrapClassName, hidden }) => {
    if (hidden) return <></>

    return (
        <div className={clsx('bg-transparent p-2 sm:p-3', wrapClassName)}>
            <h4 className='text-sm font-normal text-gray-700 dark:text-slate-200 sm:text-base sm:font-medium sm:text-white dark:sm:text-slate-900'>
                {title}
            </h4>
            <div className={clsx('mt-2', className)}>{children}</div>
        </div>
    )
}

export default ProfileInfoGroup
