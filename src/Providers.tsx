import React, { Suspense } from 'react'
import { ReloadPrompt } from './components'
import LoadingText from './components/Loading/LoadingText'
import {
    CacheProvider,
    CheckingProvider,
    ConfigProvider,
    DetailDialogProvider,
    FilePreviewProvider,
    FlashScreenProvider,
    LoadingProvider,
    NotifyProvider,
    ThemeProvider,
} from './context'

interface Props {
    children: React.ReactNode
}

export const AppProviders: React.FC<Props> = (props) => {
    const { children } = props

    return (
        <ThemeProvider>
            <FlashScreenProvider>
                <LoadingProvider>
                    <CheckingProvider>
                        <FilePreviewProvider>
                            <Suspense fallback={<LoadingText />}>{children}</Suspense>
                        </FilePreviewProvider>
                    </CheckingProvider>
                </LoadingProvider>
            </FlashScreenProvider>
        </ThemeProvider>
    )
}

export const LayoutProviders: React.FC<Props> = (props) => {
    const { children } = props

    return (
        <ConfigProvider>
            <CacheProvider>
                <NotifyProvider>
                    <DetailDialogProvider>
                        <ReloadPrompt />
                        {children}
                    </DetailDialogProvider>
                </NotifyProvider>
            </CacheProvider>
        </ConfigProvider>
    )
}
