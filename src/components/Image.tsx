import clsx from 'clsx'
import React from 'react'
import { ImageProps } from '~/@types/components'
import { getSizeAvatarUser } from '~/constant/component'
import { UserSvg } from './_constant'

const Image: React.FC<ImageProps> = ({ size = 'medium', src, alt, errorComp = <UserSvg />, className }) => {
    const [img, setImg] = React.useState<string | undefined>(src)
    const handleError = () => {
        setImg(undefined)
    }

    return img ? (
        <img
            className={clsx('inline-block flex-shrink-0 rounded-full', getSizeAvatarUser[size], className)}
            onError={handleError}
            src={img}
            alt={alt}
        />
    ) : (
        <div
            className={clsx(
                'flex-shrink-0 overflow-hidden rounded-full bg-gray-400',
                getSizeAvatarUser[size],
                className
            )}
        >
            {errorComp}
        </div>
    )
}

export default Image
