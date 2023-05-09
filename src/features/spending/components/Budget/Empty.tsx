import { CubeTransparentIcon } from '@heroicons/react/24/outline'
import { DefaultTFuncReturn } from 'i18next'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { Button } from '~/components'
import LoadingText from '~/components/Loading/LoadingText'
import { useSlideOver } from '~/context'
import LANGUAGE from '~/i18n/language/key'

const MakeBudget = React.lazy(() => import('../MakeBudget'))

interface Props {
    text: DefaultTFuncReturn
    slide: string
}

const Empty: React.FC<Props> = (props) => {
    const { text, slide } = props
    const { t } = useTranslation()
    const { set } = useSlideOver()
    const [, setSearchParams] = useSearchParams()

    const handleClick = () => {
        if (slide) {
            setSearchParams((prev) => {
                const url = new URLSearchParams(prev)
                url.set('slide', slide)
                return url
            })
            set({
                title: t(LANGUAGE.MAKE_BUDGET),
                content: <MakeBudget />,
                slide,
                fallback: <LoadingText className='p-6' />,
            })
        }
    }

    return (
        <div className='p-6 text-center text-gray-400 hover:text-gray-600 dark:text-slate-300 dark:hover:text-slate-200'>
            <div className='flex flex-col items-center gap-4'>
                <CubeTransparentIcon className='h-12 w-12' />
                {text}
                <Button type='button' onClick={handleClick} color='outline-yellow'>
                    {t(LANGUAGE.CREATE)}
                </Button>
            </div>
        </div>
    )
}

export default Empty
