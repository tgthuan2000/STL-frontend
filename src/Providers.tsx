import React, { Suspense } from 'react'
import { ReloadPrompt } from './components'
import LoadingText from './components/Loading/LoadingText'
import {
    CacheProvider,
    CheckingProvider,
    ConfigProvider,
    FilePreviewProvider,
    FlashScreenProvider,
    LoadingProvider,
    NotifyProvider,
} from './context'

interface Props {
    children: React.ReactNode
}

export const AppProviders: React.FC<Props> = (props) => {
    const { children } = props

    return (
        <FlashScreenProvider>
            <LoadingProvider>
                <CheckingProvider>
                    <FilePreviewProvider>
                        <Suspense fallback={<LoadingText />}>{children}</Suspense>
                    </FilePreviewProvider>
                </CheckingProvider>
            </LoadingProvider>
        </FlashScreenProvider>
    )
}

export const LayoutProviders: React.FC<Props> = (props) => {
    const { children } = props

    return (
        <ConfigProvider>
            <CacheProvider>
                <NotifyProvider>
                    <ReloadPrompt />
                    {children}
                </NotifyProvider>
            </CacheProvider>
        </ConfigProvider>
    )
}
