import clsx from 'clsx'
import numeral from 'numeral'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SeeMoreButtonProps } from '~/@types/feedback'
import LANGUAGE from '~/i18n/language/key'

const SeeMoreButton: React.FC<SeeMoreButtonProps> = ({ replyNum, onClick }) => {
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
            className={clsx('pt-10 text-cyan-500 hover:opacity-70 dark:text-cyan-400', loading && 'animate-pulse')}
            onClick={handleClick}
        >
            {loading
                ? t(LANGUAGE.LOADING)
                : `${t(LANGUAGE.SEE_MORE)} ${numeral(replyNum).format()} ${t(LANGUAGE.L_REPLIES)}`}
        </button>
    )
}

export default SeeMoreButton
