import clsx from 'clsx'
import React from 'react'
import { AvatarUserProps } from '~/@types/components'
import { getSizeAvatarUser } from '~/constant/component'
import { urlFor } from '~/sanityConfig'
import UserSvg from './_constant/UserSvg'

const AvatarUser: React.FC<AvatarUserProps> = ({ image, size = 'medium' }) => {
    return image ? (
        <div
            style={{
                backgroundImage: `url(${urlFor(image)})`,
            }}
            className={clsx(
                'flex-shrink-0 rounded-full bg-gray-200 bg-cover bg-center bg-no-repeat',
                getSizeAvatarUser[size]
            )}
        />
    ) : (
        <div
            className={clsx(
                'inline-block flex-shrink-0 overflow-hidden rounded-full bg-gray-100',
                getSizeAvatarUser[size]
            )}
        >
            <UserSvg />
        </div>
    )
}

export default AvatarUser
