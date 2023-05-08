import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { DataListViewTable } from '~/@types/components'
import { AnimateWrap, Divider, Table, Transaction } from '~/components'
import EmptyTable from '~/components/Table/Empty'
import { useCheck } from '~/context'
import { useTDF } from '~/hook'
import LANGUAGE from '~/i18n/language/key'
import { client } from '~/sanityConfig'
import { MobileMenu, Skeleton } from '../components'
import { useColumns, useDashboard } from '../hook'

const Dashboard = () => {
    const { t } = useTranslation()
    const [{ account }, deleteCache, reloadData, { getMore }] = useDashboard()

    useCheck(() => {
        deleteCache('account')
        reloadData()
    })

    const toggleActive = useTDF<{ id: string; active: boolean }>((transaction, params) => {
        const { id, active } = params
        const patch = client.patch(id, { set: { active: !active } })
        transaction.patch(patch)

        const commit = () => transaction.commit()

        const resolved = () => {
            deleteCache('account')
            reloadData()
            toast.success(t(LANGUAGE.NOTIFY_UPDATE_SUCCESS))
        }

        const error = (err: any) => {
            toast.error(t(LANGUAGE.NOTIFY_UPDATE_FAILED))
        }

        return { commit, resolved, error }
    }, 800)

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
            <MobileMenu />

            <Divider className='py-6 xl:hidden' dashed />

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
