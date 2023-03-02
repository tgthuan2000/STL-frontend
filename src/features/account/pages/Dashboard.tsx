import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { DataListViewTable } from '~/@types/components'
import { Table, Transaction } from '~/components'
import LANGUAGE from '~/i18n/language/key'
import useDashboard from '../hook/useDashboard'
import * as __services from '../services/dataListView'

const Dashboard = () => {
    const { t } = useTranslation()
    const [parent] = useAutoAnimate<HTMLDivElement>()

    const [{ account }, , , { getMore }] = useDashboard()

    const tableProps: DataListViewTable = useMemo(
        () => ({
            columns: __services.columns(),
        }),
        []
    )

    return (
        <Transaction hasBack={false} title={t(LANGUAGE.ACCOUNT_MANAGEMENT)}>
            <div className='-mx-4' ref={parent}>
                <Table
                    hasNextPage={false}
                    data={account.data}
                    loading={account.loading}
                    onGetMore={getMore}
                    onRowClick={() => ''}
                    {...tableProps}
                />
            </div>
        </Transaction>
    )
}

export default Dashboard
