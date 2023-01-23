import React, { createContext, useContext, useState } from 'react'
import { ISideBarContext } from '~/@types/context'

const SideBarContext = createContext<ISideBarContext>({
    desktop: {
        set: () => {},
        open: false,
    },
    mobile: {
        set: () => {},
        open: false,
    },
})

const SideBarProvider = ({ children }: { children: React.ReactNode }) => {
    const [openSideBarMobile, setOpenSideBarMobile] = useState(false)
    const [openSideBarDesktop, setOpenSideBarDesktop] = useState(false)

    const value: ISideBarContext = {
        desktop: {
            open: openSideBarDesktop,
            set: setOpenSideBarDesktop,
        },
        mobile: {
            open: openSideBarMobile,
            set: setOpenSideBarMobile,
        },
    }

    return <SideBarContext.Provider value={value}>{children}</SideBarContext.Provider>
}

const useSideBar = () => {
    const context = useContext(SideBarContext)

    if (!context) {
        throw new Error('useSideBar must be used within a SideBarProvider')
    }

    return context
}

export { useSideBar, SideBarProvider }
