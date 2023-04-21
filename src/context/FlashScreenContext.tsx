import React, { createContext, useCallback, useContext, useState } from 'react'
import { IFlashScreen } from '~/@types/context'
import { FlashScreen as FlashScreenComp } from '~/components'

const FlashScreen = createContext<IFlashScreen>({
    show: false,
    content: <></>,
    showFlashScreen: (content) => {},
    hiddenFlashScreen: () => {},
})

const FlashScreenProvider = ({ children }: { children: React.ReactNode }) => {
    const [show, setShow] = useState(false)
    const [content, setContent] = useState<React.ReactNode>(<></>)

    const showFlashScreen = useCallback((content: React.ReactNode) => {
        setShow(true)
        setContent(content)
    }, [])

    const hiddenFlashScreen = useCallback(() => {
        setShow(false)
    }, [])

    const value: IFlashScreen = {
        show,
        content,
        showFlashScreen,
        hiddenFlashScreen,
    }

    return (
        <FlashScreen.Provider value={value}>
            <FlashScreenComp />
            {children}
        </FlashScreen.Provider>
    )
}

const useFlashScreen = () => {
    const context = useContext(FlashScreen)

    if (!context) {
        throw new Error('useFlashScreen must be used within a FlashScreenProvider')
    }

    return context
}

export { useFlashScreen, FlashScreenProvider }
