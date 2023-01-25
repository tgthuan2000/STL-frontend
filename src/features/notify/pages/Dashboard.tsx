import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useMemo } from 'react'
import { DataListViewList } from '~/@types/components'
import { List, Transaction } from '~/components'
import { DATE_FORMAT } from '~/constant'
import { useNotify } from '~/context'
import * as __services from '../services/dataListView'

const Dashboard = () => {
    const { notify, hasNextPage, loading, getMore } = useNotify()
    const [parent] = useAutoAnimate<HTMLDivElement>()

    const listProps: DataListViewList & { onRowClick: (data: any) => string } = useMemo(
        () => ({
            groupBy: __services.groupBy(DATE_FORMAT.D_DATE),
            renderList: __services.renderList,
            renderTitle: __services.renderTitle,
            onRowClick: __services.rowClick,
        }),
        []
    )

    return (
        <Transaction hasBack={false} title='Thông báo'>
            <div className='-mx-4' ref={parent}>
                <List hasNextPage={hasNextPage} data={notify} loading={loading} onGetMore={getMore} {...listProps} />
            </div>
        </Transaction>
    )
}

export default Dashboard
