import { useTranslation } from 'react-i18next'
import { useRegisterSW } from 'virtual:pwa-register/react'
import LANGUAGE from '~/i18n/language/key'
import { client } from '~/sanityConfig'
import Button from './Button'

const ReloadPrompt = () => {
    const { t } = useTranslation()
    const {
        offlineReady: [offlineReady, setOfflineReady],
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        async onRegistered(r) {
            if (r) {
                let subscription = await r.pushManager.getSubscription()
                if (!subscription) {
                    subscription = await r.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: import.meta.env.VITE_SERVER_PUBLIC_KEY,
                    })
                    // send subscription to server
                }
            }
        },
        onRegisterError(error) {
            console.log('SW registration error', error)
        },
    })

    const close = () => {
        setOfflineReady(false)
        setNeedRefresh(false)
    }

    return (
        <>
            {(offlineReady || needRefresh) && (
                <div className='fixed top-32 left-0 z-50 m-4 rounded border border-[#8885] bg-white p-3 text-left shadow-md dark:bg-slate-800 sm:bottom-10 sm:top-auto sm:right-0 sm:left-auto'>
                    <div className='mb-2 text-gray-900 dark:text-slate-200'>
                        {offlineReady ? (
                            <span>{t(LANGUAGE.APP_READY_WORK_OFFLINE)}</span>
                        ) : (
                            <span>{t(LANGUAGE.RELOAD_TEXT)}</span>
                        )}
                    </div>
                    <div className='flex items-center justify-between'>
                        <div className='space-x-2'>
                            {needRefresh && (
                                <Button type='button' color='cyan' onClick={() => updateServiceWorker(true)}>
                                    {t(LANGUAGE.RELOAD)}
                                </Button>
                            )}
                            <Button type='button' color='outline' onClick={() => close()}>
                                {t(LANGUAGE.CLOSE)}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ReloadPrompt
