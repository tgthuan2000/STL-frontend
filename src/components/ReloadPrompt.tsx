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
                <div className='fixed z-50 sm:bottom-10 sm:top-auto sm:right-0 sm:left-auto top-32 left-0 m-4 p-3 border border-[#8885] rounded text-left shadow-md bg-white dark:bg-slate-800'>
                    <div className='mb-2 text-gray-900 dark:text-slate-200'>
                        {offlineReady ? (
                            <span>{t(LANGUAGE.APP_READY_WORK_OFFLINE)}</span>
                        ) : (
                            <span>{t(LANGUAGE.RELOAD_TEXT)}</span>
                        )}
                    </div>
                    <div className='flex justify-between items-center'>
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
