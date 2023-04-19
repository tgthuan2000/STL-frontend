import React from 'react'
import { FallbackProps } from 'react-error-boundary'
import { useNavigate } from 'react-router-dom'
import Button from './Button'
import { useTranslation } from 'react-i18next'

const ErrorFallback: React.ComponentType<FallbackProps> = ({ error, resetErrorBoundary }) => {
    const navigate = useNavigate()
    const { t } = useTranslation()

    if (error.message.includes('dynamically imported module')) {
        return (
            <div className='p-4'>
                <div className='rounded-lg bg-cyan-400 p-2 text-white'>
                    <h4 className='text-lg font-medium sm:text-xl'>Thông báo</h4>
                    <span className='text-sm font-normal sm:text-base'>
                        Đã có bản cập nhật mới, vui lòng{' '}
                        <Button type='button' color='cyan' onClick={() => window.location.reload()}>
                            Nhấn để tải lại
                        </Button>{' '}
                        trang.
                    </span>
                </div>
            </div>
        )
    }

    if (import.meta.env.VITE_PRODUCTION === 'true') {
        return (
            <div className='p-4'>
                <div className='rounded-lg bg-radical-red-400 p-2 text-white'>
                    <h4 className='text-lg font-medium sm:text-xl'>Lỗi</h4>
                    <span className='text-sm font-normal sm:text-base'>
                        Đã có lỗi xảy ra!{' '}
                        <Button type='button' color='radicalRed' onClick={() => navigate('/')}>
                            Quay lại trang chủ
                        </Button>
                    </span>
                </div>
            </div>
        )
    }

    return (
        <div className='p-4'>
            <div className='rounded-lg bg-radical-red-400 p-2 text-white'>
                <h4 className='text-base font-medium'>Đã có lỗi xảy ra!</h4>
                <pre>{error.message}</pre>
            </div>
        </div>
    )
}

export default ErrorFallback
