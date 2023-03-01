import { Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router-dom'
import LoadingText from '~/components/Loading/LoadingText'

const Notify = () => {
    const { t } = useTranslation()
    return (
        <Suspense fallback={<LoadingText />}>
            <Outlet />
        </Suspense>
    )
}

export default Notify
