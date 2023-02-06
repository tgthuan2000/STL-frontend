import { LockClosedIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { SettingComponentProps } from '~/@types/setting'

const ChangePassword: React.FC<SettingComponentProps> = (props) => {
    const navigate = useNavigate()
    return (
        <button
            type='button'
            {...props}
            onClick={() => {
                navigate('change-password')
            }}
        >
            <LockClosedIcon className='w-6 h-6 flex-shrink-0' />
            <p>Đổi mật khẩu</p>
        </button>
    )
}
export default ChangePassword
