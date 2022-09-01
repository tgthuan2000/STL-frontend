import React, { createContext, Suspense, useCallback, useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { SlideParams } from '~/@types/components'
import { ISlideOverContext } from '~/@types/context'
import { SuspenseAnimate } from '~/components'
import { useEventListener } from '~/hook'

const SlideOverContext = createContext<ISlideOverContext>({
    isOpen: false,
    setIsOpen: () => {},
    title: '',
    setTitle: () => {},
})

const SlideOverProvider = ({
    children,
    query,
    title: _title,
}: {
    children: React.ReactNode
    query?: SlideParams
    title?: string
}) => {
    const location = useLocation()
    const [isOpen, setIsOpen] = useState(() => {
        if (location.search) {
            const search = location.search.substring(1)
            if (search.includes('slide')) {
                const parse = JSON.parse(
                    '{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}'
                )
                return parse.slide === query?.slide
            }
        }
        return false
    })
    const [title, setTitle] = useState(_title || '')

    const value: ISlideOverContext = {
        isOpen,
        setIsOpen,
        title,
        setTitle,
    }
    return <SlideOverContext.Provider value={value}>{children}</SlideOverContext.Provider>
}

const useSlideOver = () => {
    const context = useContext(SlideOverContext)

    if (!context) {
        throw new Error('useSlideOver must be used within a SlideOverProvider')
    }

    return context
}

const SlideOverHOC = (Component: (props: any) => JSX.Element) => () => {
    const { setIsOpen } = useSlideOver()

    const handler = useCallback(() => {
        setIsOpen(false)
    }, [])

    useEventListener('popstate', handler)

    return (
        <SuspenseAnimate>
            <Component />
        </SuspenseAnimate>
    )
}
export { useSlideOver, SlideOverHOC, SlideOverProvider }
