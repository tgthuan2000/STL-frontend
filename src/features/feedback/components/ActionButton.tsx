import clsx from 'clsx'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import LANGUAGE from '~/i18n/language/key'

export interface Props {
    onClick: () => any
    title: string
    className?: string
}

const ActionButton: React.FC<Props> = (props) => {
    const { title, onClick, className } = props
    const { t } = useTranslation()
    const [loading, setLoading] = useState(false)
    const handleClick = () => {
        if (!loading) {
            setLoading(true)
            onClick()
            setTimeout(() => {
                setLoading(false)
            }, 1500)
        }
    }
    return (
        <button
            type='button'
            className={clsx(
                'pt-10 text-cyan-500 hover:opacity-70 dark:text-cyan-400',
                className,
                loading && 'animate-pulse'
            )}
            onClick={handleClick}
        >
            {loading ? t(LANGUAGE.LOADING) : title}
        </button>
    )
}

export default ActionButton
