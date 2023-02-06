import { useRegisterSW } from 'virtual:pwa-register/react'

const ReloadPrompt = () => {
    const {
        offlineReady: [offlineReady, setOfflineReady],
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        onRegistered(r) {
            console.log('SW Registered: ' + r)
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
        <div>
            {(offlineReady || needRefresh) && (
                <div className='fixed r-0 b-0 m-4 p-3 border border-[#8885] rounded z-[1] text-left shadow-md bg-white'>
                    <div className='mb-2'>
                        {offlineReady ? (
                            <span>App ready to work offline</span>
                        ) : (
                            <span>New content available, click on reload button to update.</span>
                        )}
                    </div>
                    {needRefresh && (
                        <button
                            className='border border-[#8885] outline-none mr-1 rounded py-1 px-2'
                            onClick={() => updateServiceWorker(true)}
                        >
                            Reload
                        </button>
                    )}
                    <button
                        className='border border-[#8885] outline-none mr-1 rounded py-1 px-2'
                        onClick={() => close()}
                    >
                        Close
                    </button>
                </div>
            )}
        </div>
    )
}

export default ReloadPrompt
