import { useAutoAnimate } from '@formkit/auto-animate/react'
import { BellIcon } from '@heroicons/react/24/outline'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useSearchParams } from 'react-router-dom'
import { DefaultValueResult } from '~/@types/announce-config'
import { DataListViewList, DataListViewTable, TimeFilterPayload } from '~/@types/components'
import { NotifyQueryData } from '~/@types/notify'
import { Button, DataListView, ListViewFilter } from '~/components'
import { COUNT_PAGINATE } from '~/constant'
import { __groupBy } from '~/constant/component'
import { useListViewFilter, useQuery } from '~/hook'
import LANGUAGE from '~/i18n/language/key'
import { EmptyTableNotify, SkeletonTableNotify } from '../components'
import { useColumns, useRenderList } from '../hook/dataListView'
import { services } from '../services'
import * as __services from '../services/dataListView'

const Dashboard = () => {
    const { t } = useTranslation()
    const [searchParams] = useSearchParams()
    const [parentRef] = useAutoAnimate<HTMLTableSectionElement>()
    const defaultValues = useMemo(() => services.getDefaultValue({ searchParams }), [])
    const [{ query, params, tags }, setQuery] = useState<DefaultValueResult>(defaultValues)
    const [{ notify }, fetchData, deleteCacheData, reload, error] = useQuery<NotifyQueryData>(query, params, tags)

    useEffect(() => {
        fetchData()
    }, [])

    const onReload = () => {
        const res = deleteCacheData('notify')
        console.log(res)
        reload()
    }

    const handleFilterSubmit = (data: TimeFilterPayload) => {
        const _data = services.filterSubmit(data, { defaultValues })

        if (_data) {
            setQuery(_data)
            onReload()
        }
    }

    const handleScrollGetMore = () => {
        const length = notify?.data?.data.length

        if (length) {
            setQuery((prev) => ({
                ...prev,
                params: { ...prev.params, __fromNotify: length, __toNotify: length + COUNT_PAGINATE },
            }))
            reload('notify')
        }
    }

    const handleClickReload = () => {
        setQuery((prev) => ({ ...prev, params: { ...prev.params, __fromNotify: 0, __toNotify: COUNT_PAGINATE } }))
        onReload()
    }

    const _ = useListViewFilter(handleClickReload)
    const { listGroup, viewMode } = _

    const columns = useColumns()
    const renderList = useRenderList()

    const tableProps: DataListViewTable = useMemo(() => ({ columns }), [columns])

    const listProps: DataListViewList = useMemo(
        () => ({
            groupBy: __services.groupBy(__groupBy[listGroup.id]),
            renderList,
            renderTitle: __services.renderTitle,
        }),
        [JSON.stringify(listGroup), renderList]
    )

    return (
        <div className='sm:px-6 lg:px-8'>
            <div className='mt-4 flex flex-col'>
                <div className='-my-2 -mx-4 sm:-mx-6 lg:-mx-8'>
                    <ListViewFilter
                        _={_}
                        loading={notify.loading}
                        viewTotal={false}
                        onSubmitTimeFilter={handleFilterSubmit}
                    >
                        <Link to='create'>
                            <Button type='button' color='green'>
                                <BellIcon className='h-6' />
                                {t(LANGUAGE.CREATE)}
                            </Button>
                        </Link>
                    </ListViewFilter>

                    {error ? (
                        <p className='m-5 font-medium text-radical-red-500'>{t(LANGUAGE.ERROR)}</p>
                    ) : (
                        <div ref={parentRef}>
                            <DataListView
                                mode={viewMode?.id}
                                loading={notify.loading}
                                onGetMore={handleScrollGetMore}
                                data={notify.data?.data}
                                hasNextPage={Boolean(notify.data?.hasNextPage)}
                                onRowClick={(data) => `/announce-config/${data._id}`}
                                view={{
                                    table: tableProps,
                                    list: listProps,
                                }}
                                SkeletonTable={(loading) => <SkeletonTableNotify elNumber={loading ? 2 : 10} />}
                                EmptyTable={<EmptyTableNotify />}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Dashboard
