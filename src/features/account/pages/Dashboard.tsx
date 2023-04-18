import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { DataListViewTable } from '~/@types/components'
import { Table, Transaction } from '~/components'
import LANGUAGE from '~/i18n/language/key'
import Skeleton from '../components/Skeleton'
import useDashboard from '../hook/useDashboard'
import { useColumns } from '../hook/dataListView'

const Dashboard = () => {
    const { t } = useTranslation()
    const [parent] = useAutoAnimate<HTMLDivElement>()
    const columns = useColumns()

    const [{ account }, , reloadData, { getMore }] = useDashboard()

    const tableProps: DataListViewTable = useMemo(() => ({ columns }), [])

    const handleScrollGetMore = () => {
        const length = account?.data?.length

        if (length) {
            getMore(length)
            reloadData('account')
        }
    }

    return (
        <Transaction hasBack={false} title={t(LANGUAGE.ACCOUNT_MANAGEMENT)}>
            <div className='-mx-4' ref={parent}>
                <Table
                    hasNextPage={false}
                    data={account.data}
                    loading={account.loading}
                    onGetMore={handleScrollGetMore}
                    onRowClick={() => ''}
                    SkeletonTable={(loading) => <Skeleton elNumber={loading ? 2 : 10} />}
                    {...tableProps}
                />
            </div>
        </Transaction>
    )
}

export default Dashboard
