import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { DataListViewList } from '~/@types/components'
import { AnimateWrap, List, Transaction } from '~/components'
import { DATE_FORMAT } from '~/constant'
import { useNotify } from '~/context'
import LANGUAGE from '~/i18n/language/key'
import { useRenderList } from '../hook/dataListView'
import * as __services from '../services/dataListView'

const Dashboard = () => {
    const { t } = useTranslation()
    const { notify, hasNextPage, loading, getMore } = useNotify()
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
            <AnimateWrap className='-mx-4'>
                <List hasNextPage={hasNextPage} data={notify} loading={loading} onGetMore={getMore} {...listProps} />
            </AnimateWrap>
        </Transaction>
    )
}

export default Dashboard
