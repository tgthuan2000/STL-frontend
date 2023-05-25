import React from 'react'
import LoadingIcon from '~/components/Loading/LoadingIcon'

interface TwoFactorImageProps {
    data: string
    loading: boolean
}

const TwoFactorImage: React.FC<TwoFactorImageProps> = ({ data, loading }) => {
    if (loading) {
        return (
            <div className='flex h-full w-full items-center justify-center'>
                <LoadingIcon />
            </div>
        )
    }
    return (
        <img
            src={data}
            alt='#qr-code'
            className='inline-block h-full w-full rounded-md border-none bg-pink-500 outline-none'
        />
    )
}

export default TwoFactorImage
