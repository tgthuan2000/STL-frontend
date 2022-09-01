import clsx from 'clsx'
import React from 'react'
import { AvatarUserProps } from '~/@types/components'
import { urlFor } from '~/sanityConfig'
import SuspenseAnimate from './SuspenseAnimate'

const UserSvg = React.lazy(() => import('./UserSvg'))

const AvatarUser: React.FC<AvatarUserProps> = ({ image, size = 'medium' }) => {
    const getSize = {
        small: 'h-8 w-8',
        medium: 'h-10 w-10',
        large: 'h-12 w-12',
    }
    return (
        <>
            {image ? (
                <div
                    style={{
                        backgroundImage: `url(${urlFor(image)})`,
                    }}
                    className={clsx(
                        'flex-shrink-0 rounded-full bg-no-repeat bg-center bg-cover bg-gray-200',
                        getSize[size]
                    )}
                />
            ) : (
                <SuspenseAnimate
                    className={clsx(
                        'inline-block flex-shrink-0 overflow-hidden rounded-full bg-gray-100',
                        getSize[size]
                    )}
                >
                    <UserSvg />
                </SuspenseAnimate>
            )}
        </>
    )
}

export default AvatarUser
