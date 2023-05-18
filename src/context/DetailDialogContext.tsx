import { isEmpty } from 'lodash'
import React, { createContext, useContext, useRef, useState } from 'react'
import { DetailDialog } from '~/components'

interface IDetailDialogContext {
    title: string | React.ReactNode
    isOpen: boolean
    content: React.ReactNode
    fallback: React.ReactNode
    set(option: setOption): void
    append(option: setOption): void
    back(): void
    close(option?: closeOption): void
    haveBack: boolean
}

const DetailDialogContext = createContext<IDetailDialogContext>({
    title: '',
    isOpen: false,
    content: <></>,
    fallback: <></>,
    set: () => {},
    append: () => {},
    back: () => {},
    close: () => {},
    haveBack: false,
})

interface Props {
    children: React.ReactNode
}

interface setOption {
    title: string | React.ReactNode
    content?: React.ReactNode
    fallback?: React.ReactNode
    close?(): void
}

interface closeOption {
    cancelCallback: boolean
}

const DetailDialogProvider: React.FC<Props> = ({ children }) => {
    const [title, setTitle] = useState<string | React.ReactNode>('')
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [content, setContent] = useState<React.ReactNode>(<></>)
    const [fallback, setFallback] = useState<React.ReactNode>(<></>)
    const closeCallback = useRef<(() => void) | undefined>(undefined)
    const store = useRef<Array<setOption>>([])

    const _setCloseCallback = (close: (() => void) | undefined) => {
        if (close) {
            closeCallback.current = close
        }
    }

    const _callCloseCallback = (cancelCallback: boolean | undefined) => {
        if (!cancelCallback) {
            closeCallback.current?.()
        }
    }

    const _clearCloseCallback = () => {
        if (closeCallback.current) {
            closeCallback.current = undefined
        }
    }

    const _checkStore = () => {
        return !isEmpty(store.current)
    }

    const _appendStore = () => {
        store.current.push({
            title,
            content,
            fallback,
            close: closeCallback.current,
        })
    }

    const _popStore = () => {
        if (_checkStore()) {
            return store.current.pop()
        }
    }

    const _clearStore = () => {
        if (_checkStore()) {
            store.current = []
        }
    }

    const set = (option: setOption) => {
        const { title, content, fallback, close } = option

        setTitle(title)
        setIsOpen(true)
        setContent(content)
        setFallback(fallback)
        _setCloseCallback(close)
    }

    const append = (option: setOption) => {
        _appendStore()
        set(option)
    }

    const back = () => {
        const latest = _popStore()

        if (latest) {
            set(latest)
        }
    }

    const close = (option?: closeOption) => {
        setIsOpen(false)
        _clearStore()
        _callCloseCallback(option?.cancelCallback)
        _clearCloseCallback()
    }

    const value = {
        title,
        isOpen,
        content,
        fallback,
        set,
        close,
        append,
        back,
        haveBack: _checkStore(),
    }

    return (
        <DetailDialogContext.Provider value={value}>
            <DetailDialog />
            {children}
        </DetailDialogContext.Provider>
    )
}

const useConfigDetailDialog = () => {
    const context = useContext(DetailDialogContext)

    if (context === undefined) {
        throw new Error('useDetailDialog must be used within a DetailDialogProvider')
    }

    const { title, isOpen, content, fallback, close, back, haveBack } = context

    return {
        title,
        isOpen,
        content,
        fallback,
        close,
        back,
        haveBack,
    }
}

const useDetailDialog = () => {
    const context = useContext(DetailDialogContext)

    if (context === undefined) {
        throw new Error('useDetailDialog must be used within a DetailDialogProvider')
    }

    const { set, close, append } = context

    return {
        set,
        close,
        append,
    }
}

export { DetailDialogProvider, useDetailDialog, useConfigDetailDialog }
