import React from 'react'
import { ProfileInfoProps } from '~/@types/profile'

const ProfileInfo: React.FC<ProfileInfoProps> = ({ label, data }) => {
    return (
        <button className='w-full overflow-hidden flex flex-col items-start gap-1 sm:p-2 p-1 bg-slate-100 hover:bg-slate-200 rounded-md cursor-pointer'>
            <label className='flex-shrink-0 sm:text-sm text-xs text-gray-700 block w-full text-left truncate'>
                {label}
            </label>
            <div className='flex-1 w-full'>{data}</div>
        </button>
    )
}

export default ProfileInfo
