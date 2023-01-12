import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PermissionCheckProps } from '~/@types/components'
import WarningGif from '~/assets/warning.gif'
import { useConfig } from '~/context'

const PermissionCheck: React.FC<PermissionCheckProps> = ({ permissions, children }) => {
    const { hasPermissions } = useConfig()
    const navigation = useNavigate()
    if (hasPermissions(permissions)) {
        return <>{children}</>
    }

    return (
        <div className='flex flex-col gap-2 max-w-4xl mx-auto items-center justify-center bg-white rounded-lg p-5'>
            <img src={WarningGif} className='w-80' />
            <p className='font-normal text-radical-red-500 text-lg text-center'>
                Bạn thể truy cập trang này do tài khoản không có quyền!
            </p>
            <button
                className='hover:underline hover:text-prussian-blue-400 transition-colors text-base'
                onClick={() => navigation('/')}
            >
                Quay lại trang chủ
            </button>
        </div>
    )
}

export default PermissionCheck
