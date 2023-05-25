import { CubeTransparentIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { Button } from '~/components'
import LoadingText from '~/components/Loading/LoadingText'
import Atom from '~/components/_atomic/Atom'
import { useSlideOver } from '~/context'
import LANGUAGE from '~/i18n/language/key'

const MakeLongBudget = React.lazy(() => import('../MakeLongBudget'))

const EmptyData = () => {
    const { t } = useTranslation()
    const [, setSearchParams] = useSearchParams()
    const { set } = useSlideOver()

    const handleClick = () => {
        setSearchParams((prev) => {
            const url = new URLSearchParams(prev)
            url.set('slide', 'long-budget')
            return url
        })
        set({
            title: t(LANGUAGE.MAKE_LONG_BUDGET),
            content: <MakeLongBudget />,
            slide: 'long-budget',
            fallback: <LoadingText className='p-6' />,
        })
    }

    return (
        <Atom.EmptyList icon={CubeTransparentIcon} text={t(LANGUAGE.EMPTY_LONG_BUDGET)}>
            <Button type='button' onClick={handleClick} color='outline-yellow'>
                {t(LANGUAGE.CREATE)}
            </Button>
        </Atom.EmptyList>
    )
}

export default EmptyData
