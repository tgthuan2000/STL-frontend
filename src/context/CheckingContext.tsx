import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { ICheckingContext } from '~/@types/context'

const CheckingContext = createContext<ICheckingContext>({
    check: false,
    checkWhenLeave: { current: false },
    needCheck: () => {},
    needCheckWhenLeave: () => {},
    cancelCheck: () => {},
})

const CheckingProvider = ({ children }: { children: React.ReactNode }) => {
    const [check, setCheck] = useState<boolean>(false)
    const checkWhenLeave = useRef<boolean>(false)

    const needCheck = () => {
        if (!check) {
            setCheck(true)
        }
    }

    const needCheckWhenLeave = () => {
        if (!checkWhenLeave.current) {
            checkWhenLeave.current = true
        }
    }

    const cancelCheck = () => {
        if (check) {
            setCheck(false)
        }
        if (checkWhenLeave.current) {
            checkWhenLeave.current = false
        }
    }

    const value: ICheckingContext = {
        check,
        needCheck,
        cancelCheck,
        needCheckWhenLeave,
        checkWhenLeave,
    }

    return <CheckingContext.Provider value={value}>{children}</CheckingContext.Provider>
}

const useCheck = (callback?: Function) => {
    const context = useContext(CheckingContext)

    if (!context) {
        throw new Error('useCheck must be used within a CheckingProvider')
    }

    const cbRef = useRef(callback)
    const { checkWhenLeave, ...ctx } = context

    useEffect(() => {
        return () => {
            if (checkWhenLeave.current) {
                ctx.needCheck()
            }
        }
    }, [])

    useEffect(() => {
        if (ctx.check && cbRef.current) {
            cbRef.current?.()
            ctx.cancelCheck()
        }
    }, [ctx, cbRef.current])

    return ctx
}

export { useCheck, CheckingProvider }
