import { ArrowPathIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { LoadingButtonProps } from '~/@types/components'
import LANGUAGE from '~/i18n/language/key'
import { SmallIcon } from '../_atomic/Atom'

const LoadingButton: React.FC<LoadingButtonProps> = (props) => {
    const { onReload, disabled } = props
    const { t } = useTranslation()

    return (
        <SmallIcon
            title={t(LANGUAGE.RELOAD) as string}
            Icon={ArrowPathIcon}
            className='disabled:animate-spin'
            disabled={disabled}
            onClick={onReload}
        />
    )
}

export default LoadingButton
