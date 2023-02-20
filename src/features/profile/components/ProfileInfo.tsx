import React from 'react'
import { ProfileInfoProps } from '~/@types/profile'

const ProfileInfo: React.FC<ProfileInfoProps> = ({ label, data, hidden }) => {
    if (hidden) return <></>

    return (
        <button className='flex w-full flex-1 cursor-pointer flex-col items-start gap-1 overflow-hidden rounded bg-slate-100 p-1.5 hover:bg-slate-200 dark:bg-slate-700 sm:rounded-md sm:p-2'>
            <label
                className='block w-full flex-shrink-0 truncate text-left text-sm text-gray-700 dark:text-slate-200'
                title={label}
            >
                {label}
            </label>
            <div className='w-full flex-1'>{data}</div>
        </button>
    )
}

export default ProfileInfo
