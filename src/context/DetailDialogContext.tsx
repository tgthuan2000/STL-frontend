import React, { createContext, useContext, useState } from 'react'
import { DetailDialog } from '~/components'

interface IDetailDialogContext {
    title: string | React.ReactNode
    isOpen: boolean
    content: React.ReactNode
    fallback: React.ReactNode
    set(option: setOption): void
    close(): void
}

const DetailDialogContext = createContext<IDetailDialogContext>({
    title: '',
    isOpen: false,
    content: <></>,
    fallback: <></>,
    set: () => {},
    close: () => {},
})

interface Props {
    children: React.ReactNode
}

interface setOption {
    title: string | React.ReactNode
    content?: React.ReactNode
    fallback?: React.ReactNode
}

const DetailDialogProvider: React.FC<Props> = ({ children }) => {
    const [title, setTitle] = useState<string | React.ReactNode>('')
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [content, setContent] = useState<React.ReactNode>(<></>)
    const [fallback, setFallback] = useState<React.ReactNode>(<></>)

    const set = (option: setOption) => {
        const { title, content, fallback } = option

        setTitle(title)
        setIsOpen(true)
        setContent(content)
        setFallback(fallback)
    }

    const close = () => {
        setIsOpen(false)
    }

    const value = {
        title,
        isOpen,
        content,
        fallback,
        set,
        close,
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

    const { title, isOpen, content, fallback, close } = context

    return {
        title,
        isOpen,
        content,
        fallback,
        close,
    }
}

const useDetailDialog = () => {
    const context = useContext(DetailDialogContext)

    if (context === undefined) {
        throw new Error('useDetailDialog must be used within a DetailDialogProvider')
    }

    const { set, close } = context

    return {
        set,
        close,
    }
}

export { DetailDialogProvider, useDetailDialog, useConfigDetailDialog }
