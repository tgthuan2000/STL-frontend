import React, { useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { MenuButtonProps } from '~/@types/components'
import { useSlideOver } from '~/context'
import LoadingText from '../Loading/LoadingText'

const DesktopButtonV1 = React.lazy(() => import('./desktop/Button/v1'))
const MobileButtonV1 = React.lazy(() => import('./mobile/Button/v1'))
const MobileButtonV2 = React.lazy(() => import('./mobile/Button/v2'))

type Props = Omit<MenuButtonProps, 'link' | 'onClick'> & { mobile?: boolean; mode?: 'v1' | 'v2' }

const ButtonItem: React.FC<Props> = (props) => {
    const { data, mobile = false, mode = 'v1' } = props
    const { slide, to, children, title, action } = data
    const [searchParams, setSearchParams] = useSearchParams()
    const { set } = useSlideOver()

    const setDataSlideOVer = () => {
        set({
            slide,
            title,
            content: children,
            fallback: <LoadingText className='p-5' />,
        })
    }

    const link = useMemo(() => {
        const paramsUrl = new URLSearchParams(searchParams)
        let link = to ?? ''

        if (slide) {
            paramsUrl.set('slide', slide)

            link += `?${paramsUrl.toString()}`
        }
        return link
    }, [searchParams])

    const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
        if (!slide && !action) return

        e.preventDefault()

        if (slide) {
            setDataSlideOVer()
            setSearchParams((searchParams) => {
                const paramsUrl = new URLSearchParams(searchParams)

                if (slide) {
                    paramsUrl.set('slide', slide)
                }
                return paramsUrl
            })
        }

        action?.()
    }

    useEffect(() => {
        const slideParam = searchParams.get('slide')

        if (slideParam && slideParam === slide) {
            setDataSlideOVer()
        }
    }, [])

    const _props = {
        data,
        link,
        onClick: handleClick,
    }

    return (
        <>
            {mobile ? (
                <>
                    {mode === 'v1' && <MobileButtonV1 {..._props} />}
                    {mode === 'v2' && <MobileButtonV2 {..._props} />}
                </>
            ) : (
                <>
                    {mode === 'v1' && <DesktopButtonV1 {..._props} />}
                    {/* {mode === 'v2' && <DesktopButton.v2 {..._props} />} */}
                </>
            )}
        </>
    )
}

export default ButtonItem
