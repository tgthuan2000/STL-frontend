import React from 'react'

interface TwoFactorImageProps {
    data: string
    loading: boolean
}

const TwoFactorImage: React.FC<TwoFactorImageProps> = ({ data, loading }) => {
    return <span className='inline-block h-full w-full bg-pink-500' />
}

export default TwoFactorImage
