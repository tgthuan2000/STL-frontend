import React from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Transaction } from '~/components'
import LANGUAGE from '~/i18n/language/key'

const AnnounceConfigFeature = React.lazy(() => import('./pages/AnnounceConfig'))
const Dashboard = React.lazy(() => import('./pages/Dashboard'))
const Create = React.lazy(() => import('./pages/Create'))
const Detail = React.lazy(() => import('./pages/Detail'))

const AnnounceConfig = () => {
    const { t } = useTranslation()
    return (
        <Routes>
            <Route path='/' element={<AnnounceConfigFeature />}>
                <Route
                    index
                    element={
                        <Transaction title={t(LANGUAGE.NOTIFY_MANAGEMENT)} hasBack={false}>
                            <Dashboard />
                        </Transaction>
                    }
                />
                <Route
                    path='create'
                    element={
                        <Transaction title={t(LANGUAGE.CREATE_NOTIFY)}>
                            <Create />
                        </Transaction>
                    }
                />
                <Route
                    path=':id'
                    element={
                        <Transaction title={t(LANGUAGE.NOTIFY_MANAGEMENT)}>
                            <Detail />
                        </Transaction>
                    }
                />
            </Route>
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    )
}

export default AnnounceConfig
