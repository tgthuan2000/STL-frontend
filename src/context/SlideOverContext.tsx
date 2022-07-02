import React, { createContext, useContext, useState } from 'react'

interface ISlideOverContext {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    title: string
    setTitle: React.Dispatch<React.SetStateAction<string>>
}

const SlideOverContext = createContext<ISlideOverContext>({
    isOpen: false,
    setIsOpen: () => {},
    title: '',
    setTitle: () => {},
})

const SlideOverProvider = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [title, setTitle] = useState('')

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
        throw new Error(
            'useSlideOver must be used within a SlideOverProvider. Using SlideOverHOC to wrap parent component'
        )
    }

    return context
}

const SlideOverHOC = (Component: (props: any) => JSX.Element) => () => {
    return (
        <SlideOverProvider>
            <Component />
        </SlideOverProvider>
    )
}

export { useSlideOver, SlideOverHOC, SlideOverProvider }
