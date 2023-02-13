import React, { createContext, useContext, useState } from 'react'
import { IFilePreview } from '~/@types/context'

const FilePreview = createContext<IFilePreview>({
    file: null,
    type: null,
    onPreview: () => {},
    clear: () => {},
})

type OnPreview = (options: OnPreviewOption) => void

interface OnPreviewOption {
    file: any
    type: string
}

const FilePreviewProvider = ({ children }: { children: React.ReactNode }) => {
    const [file, setFile] = useState<any | null>(null)
    const [type, setType] = useState<string | null>(null)

    const onPreview: OnPreview = (options) => {
        setFile(options.file)
        setType(options.type)
    }

    const clear = () => {
        setFile(null)
        setType(null)
    }

    const value: IFilePreview = {
        file,
        type,
        onPreview,
        clear,
    }

    return <FilePreview.Provider value={value}>{children}</FilePreview.Provider>
}

const useFilePreviewConfig = () => {
    const context = useContext(FilePreview)

    if (!context) {
        throw new Error('useFilePreviewConfig must be used within a FilePreviewProvider')
    }

    const { onPreview, ...ctx } = context
    return ctx
}

const useFilePreview = () => {
    const context = useContext(FilePreview)

    if (!context) {
        throw new Error('useFilePreview must be used within a FilePreviewProvider')
    }

    return context.onPreview
}

export { useFilePreview, useFilePreviewConfig, FilePreviewProvider }
