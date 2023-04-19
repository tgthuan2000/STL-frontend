import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { DataListViewTable } from '~/@types/components'
import { AnimateWrap, Table, Transaction } from '~/components'
import LANGUAGE from '~/i18n/language/key'
import Skeleton from '../components/Skeleton'
import { useColumns } from '../hook/dataListView'
import useDashboard from '../hook/useDashboard'

const Dashboard = () => {
    const { t } = useTranslation()
    const columns = useColumns()

    const [{ account }, , reloadData, { getMore }] = useDashboard()

    const tableProps: DataListViewTable = useMemo(() => ({ columns }), [columns])

    const handleScrollGetMore = () => {
        const length = account?.data?.length

        if (length) {
            getMore(length)
            reloadData('account')
        }
    }

    return (
        <Transaction hasBack={false} title={t(LANGUAGE.ACCOUNT_MANAGEMENT)}>
            <AnimateWrap className='-mx-4'>
                <Table
                    hasNextPage={false}
                    data={account.data}
                    loading={account.loading}
                    onGetMore={handleScrollGetMore}
                    onRowClick={() => ''}
                    SkeletonTable={(loading) => <Skeleton elNumber={loading ? 2 : 10} />}
                    {...tableProps}
                />
            </AnimateWrap>
        </Transaction>
    )
}

export default Dashboard
