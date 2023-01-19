import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { ICheckingContext } from '~/@types/context'

const CheckingContext = createContext<ICheckingContext>({
    check: false,
    checkWhenLeave: false,
    needCheck: () => {},
    needCheckWhenLeave: () => {},
    cancelCheck: () => {},
})

const CheckingProvider = ({ children }: { children: React.ReactNode }) => {
    const [check, setCheck] = useState<boolean>(false)
    const [checkWhenLeave, setCheckWhenLeave] = useState<boolean>(false)

    const needCheck = () => {
        if (!check) {
            setCheck(true)
        }
    }

    const needCheckWhenLeave = () => {
        if (!checkWhenLeave) {
            setCheckWhenLeave(true)
        }
    }

    const cancelCheck = () => {
        if (check) {
            setCheck(false)
        }
        if (checkWhenLeave) {
            setCheckWhenLeave(false)
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
            if (checkWhenLeave) {
                ctx.needCheck()
            }
        }
    }, [checkWhenLeave])

    useEffect(() => {
        if (ctx.check && cbRef.current) {
            cbRef.current?.()
            ctx.cancelCheck()
        }
    }, [ctx, cbRef.current])

    return ctx
}

export { useCheck, CheckingProvider }
