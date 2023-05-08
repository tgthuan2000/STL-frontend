import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
    ISlideOverContext,
    SlideOverContent,
    SlideOverFallback,
    SlideOverSetOptions,
    SlideOverTitle,
} from '~/@types/context'
import { SlideOver } from '~/components'

const SlideOverContext = createContext<ISlideOverContext>({
    isOpen: false,
    title: <></>,
    content: <></>,
    fallback: <></>,
    set: () => {},
    close: () => {},
})

interface Props {
    children: React.ReactNode
}

const SlideOverProvider: React.FC<Props> = (props) => {
    const { children } = props
    const [title, setTitle] = useState<SlideOverTitle>()
    const [content, setContent] = useState<SlideOverContent>()
    const [fallback, setFallback] = useState<SlideOverFallback>()
    const [slide, setSlide] = useState('')
    const [searchParams, setSearchParams] = useSearchParams()
    const slideParam = searchParams.get('slide')

    const isOpen = useMemo(() => {
        if (slideParam && slide) {
            return slideParam === slide
        }
        return false
    }, [slideParam, slide])

    const close = useCallback(() => {
        setSearchParams((prev) => {
            const url = new URLSearchParams(prev)
            url.delete('slide')
            return url
        })
    }, [])

    const set = useCallback((options: SlideOverSetOptions) => {
        const { slide, content, title, fallback } = options
        setTitle(title)
        setContent(content)

        if (slide) {
            setSlide(slide)
        }
        if (fallback) {
            setFallback(fallback)
        }
    }, [])

    const value: ISlideOverContext = {
        isOpen,
        title,
        content,
        fallback,
        close,
        set,
    }
    return (
        <SlideOverContext.Provider value={value}>
            <SlideOver />
            {children}
        </SlideOverContext.Provider>
    )
}

const useSlideOverConfig = () => {
    const context = useContext(SlideOverContext)

    if (!context) {
        throw new Error('useSlideOverConfig must be used within a SlideOverProvider')
    }

    const { isOpen, title, content, fallback, close } = context

    return {
        isOpen,
        title,
        content,
        fallback,
        close,
    }
}

const useSlideOver = () => {
    const context = useContext(SlideOverContext)

    if (!context) {
        throw new Error('useSlideOver must be used within a SlideOverProvider')
    }

    const { set, close } = context

    return {
        set,
        close,
    }
}

export { useSlideOver, useSlideOverConfig, SlideOverProvider }
