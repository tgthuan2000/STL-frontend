import clsx from 'clsx'
import React from 'react'
import { ImageProps } from '~/@types/components'
import { getSizeAvatarUser } from '~/constant/component'
import { UserSvg } from './_constant'

const Image: React.FC<ImageProps> = ({ avatar, src, alt, fallback = <UserSvg />, className }) => {
    const [img, setImg] = React.useState<string | undefined>(src)
    const _avatar = avatar
        ? clsx({ 'rounded-full': avatar.roundFull }, getSizeAvatarUser[avatar.size ?? 'medium'])
        : undefined

    const _className = clsx('inline-block flex-shrink-0', _avatar, className)

    const handleError = () => {
        setImg(undefined)
    }

    return img ? (
        <img className={_className} onError={handleError} src={img} alt={alt} />
    ) : (
        <div className={_className}>{fallback}</div>
    )
}

export default Image
