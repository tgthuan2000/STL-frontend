import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { DataListViewList } from '~/@types/components'
import { List, Transaction } from '~/components'
import { DATE_FORMAT } from '~/constant'
import { useNotify } from '~/context'
import LANGUAGE from '~/i18n/language/key'
import * as __services from '../services/dataListView'
import { useRenderList } from '../hook/dataListView'

const Dashboard = () => {
    const { t } = useTranslation()
    const { notify, hasNextPage, loading, getMore } = useNotify()
    const [parent] = useAutoAnimate<HTMLDivElement>()
    const renderList = useRenderList()
    const listProps: DataListViewList & { onRowClick: (data: any) => string } = useMemo(
        () => ({
            groupBy: __services.groupBy(DATE_FORMAT.D_DATE),
            renderList,
            renderTitle: __services.renderTitle,
            onRowClick: __services.rowClick,
        }),
        [renderList]
    )

    return (
        <Transaction hasBack={false} title={t(LANGUAGE.NOTIFICATION)}>
            <div className='-mx-4' ref={parent}>
                <List hasNextPage={hasNextPage} data={notify} loading={loading} onGetMore={getMore} {...listProps} />
            </div>
        </Transaction>
    )
}

export default Dashboard
