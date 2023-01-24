import React, { createContext, useCallback, useContext, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { IScrollToTopContext } from '~/@types/context'

const ScrollToTopContext = createContext<IScrollToTopContext>({
    scrollToTop: () => {},
})

const ScrollToTopProvider = ({ children }: { children: React.ReactNode }) => {
    const ref = useRef<HTMLDivElement>(null)
    const { pathname } = useLocation()

    const scrollToTop = useCallback(() => {
        if (ref.current) {
            ref.current.scrollIntoView({
                behavior: 'smooth',
            })
        }
    }, [ref.current, pathname])

    useEffect(() => {
        return () => {
            scrollToTop()
        }
    }, [pathname])

    const value: IScrollToTopContext = {
        scrollToTop,
    }

    return (
        <ScrollToTopContext.Provider value={value}>
            <div ref={ref} className='h-16 -mt-16' />
            {children}
        </ScrollToTopContext.Provider>
    )
}

const useScrollToTop = () => {
    const context = useContext(ScrollToTopContext)

    if (!context) {
        throw new Error('useScrollToTop must be used within a ScrollToTopProvider')
    }

    return context
}

export { useScrollToTop, ScrollToTopProvider }
