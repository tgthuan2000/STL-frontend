import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { DataListViewTable } from '~/@types/components'
import { AnimateWrap, Table, Transaction } from '~/components'
import LANGUAGE from '~/i18n/language/key'
import Skeleton from '../components/Skeleton'
import { useColumns } from '../hook/dataListView'
import useDashboard from '../hook/useDashboard'
import { client } from '~/sanityConfig'
import EmptyTable from '~/components/Table/Empty'
import { toast } from 'react-toastify'

const Dashboard = () => {
    const { t } = useTranslation()
    const [{ account }, deleteCache, reloadData, { getMore }] = useDashboard()

    const toggleActive = async (id: string, active: boolean) => {
        try {
            await client.patch(id, { set: { active: !active } }).commit()
            deleteCache('account')
            reloadData()
            toast.success(t(LANGUAGE.NOTIFY_UPDATE_SUCCESS))
        } catch (error) {
            console.log(error)
            toast.error(t(LANGUAGE.NOTIFY_UPDATE_FAILED))
        }
    }
    const columns = useColumns({ toggleActive })
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
                    overflowScroll
                    data={account.data}
                    loading={false}
                    onGetMore={handleScrollGetMore}
                    onRowClick={(data) => data._id ?? ''}
                    SkeletonTable={(loading) => <Skeleton elNumber={loading ? 2 : 10} />}
                    EmptyTable={<EmptyTable colSpan={6} />}
                    {...tableProps}
                />
            </AnimateWrap>
        </Transaction>
    )
}

export default Dashboard
