import { LogoutIcon } from '@heroicons/react/outline'
import React from 'react'
import { SettingComponentProps } from '~/@types/setting'
import useAuth from '~/store/auth'

const Logout: React.FC<SettingComponentProps> = (props) => {
    const { removeUserProfile } = useAuth()
    return (
        <button
            type='button'
            onClick={() => {
                removeUserProfile()
            }}
            {...props}
        >
            <LogoutIcon className='w-6 h-6 flex-shrink-0' />
            <p>Đăng xuất</p>
        </button>
    )
}
export default Logout
