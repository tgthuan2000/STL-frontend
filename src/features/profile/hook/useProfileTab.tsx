import { lazy, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { PERMISSION } from '~/constant/permission'
import { useConfig } from '~/context'
import LANGUAGE from '~/i18n/language/key'

const Achievement = lazy(() => import('../components/Tab/Achievement'))
const Rights = lazy(() => import('../components/Tab/Rights'))
const Statistics = lazy(() => import('../components/Tab/Statistics'))

const useProfileTab = () => {
    const { t } = useTranslation()
    const { hasPermissions } = useConfig()

    const tabs = useMemo(() => {
        const tabs = [
            {
                id: 'achievement',
                label: t(LANGUAGE.ACHIEVEMENT),
                content: <Achievement />,
                permissions: [PERMISSION.ACHIEVEMENT_PROFILE],
            },
            {
                id: 'rights',
                label: t(LANGUAGE.RIGHTS),
                content: <Rights />,
                permissions: [PERMISSION.PROFILE_RECEIVE_EMAIL],
            },
            {
                id: 'statistics',
                label: t(LANGUAGE.STATISTICS),
                content: <Statistics />,
                permissions: [PERMISSION.PROFILE_STATISTIC],
            },
        ]

        return tabs.filter((tab) => hasPermissions(tab.permissions))
    }, [t, hasPermissions])

    return tabs
}

export default useProfileTab
