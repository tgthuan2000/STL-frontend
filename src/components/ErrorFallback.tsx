import React from 'react'
import { FallbackProps } from 'react-error-boundary'
import { useNavigate } from 'react-router-dom'
import Button from './Button'

const ErrorFallback: React.ComponentType<FallbackProps> = ({ error, resetErrorBoundary }) => {
    const navigate = useNavigate()

    if (error.name === 'ChunkLoadError') {
        return (
            <div className='p-4'>
                <div className='p-2 rounded-lg bg-cyan-400 text-white'>
                    <h4 className='font-medium sm:text-xl text-lg'>Thông báo</h4>
                    <span className='font-normal sm:text-base text-sm'>
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
                <div className='p-2 rounded-lg bg-radical-red-400 text-white'>
                    <h4 className='font-medium sm:text-xl text-lg'>Lỗi</h4>
                    <span className='font-normal sm:text-base text-sm'>
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
            <div className='p-2 rounded-lg bg-radical-red-400 text-white'>
                <h4 className='font-medium text-base'>Đã có lỗi xảy ra!</h4>
                <pre>{error.message}</pre>
            </div>
        </div>
    )
}

export default ErrorFallback
