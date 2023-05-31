import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useWindowSize } from '~/hook'
import LANGUAGE from '~/i18n/language/key'
import Content from './Content'

const WatchCache = () => {
    const [show, setShow] = useState(false)
    const { t } = useTranslation()
    const { width } = useWindowSize()

    if (width < 1280) {
        return <></>
    }

    return (
        <div className='fixed bottom-0 right-1 z-30 w-96 overflow-hidden rounded-t-md border dark:border-slate-700'>
            <div
                onClick={() => setShow(!show)}
                className='flex w-full cursor-pointer items-center justify-between bg-gray-300 p-2 text-gray-700 hover:bg-gray-400 dark:bg-slate-800 dark:text-gray-200 dark:hover:bg-slate-900'
            >
                <h1 className='text-base font-medium'>{t(LANGUAGE.CACHE_MANAGEMENT)}</h1>
            </div>
            <AnimatePresence>
                {show && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className='dark:bg-slate-200'
                    >
                        <Content />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default WatchCache
