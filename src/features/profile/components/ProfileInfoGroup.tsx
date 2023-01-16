import clsx from 'clsx'
import React from 'react'
import { ProfileInfoGroupProps } from '~/@types/profile'

const ProfileInfoGroup: React.FC<ProfileInfoGroupProps> = ({ title, children, className, wrapClassName, hidden }) => {
    if (hidden) return <></>

    return (
        <div className={clsx('p-2 sm:p-3 bg-transparent', wrapClassName)}>
            <h4 className='sm:text-base text-sm sm:text-white text-gray-700 sm:font-medium font-normal'>{title}</h4>
            <div className={clsx('mt-2', className)}>{children}</div>
        </div>
    )
}

export default ProfileInfoGroup
