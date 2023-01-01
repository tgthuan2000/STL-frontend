import { useAutoAnimate } from '@formkit/auto-animate/react'
import { isEmpty, isNil } from 'lodash'
import React, { useMemo, useRef } from 'react'
import { getLinkSpending } from '~/utils'
import BodyList from './Body'
import EmptyListTemplate from './Empty'
import SkeletonListTemplate from './Skeleton'

export interface ListProps {
    groupBy: (data: any) => string
    data: Array<any> | undefined
    loading: boolean
    EmptyList?: React.ReactNode
    SkeletonList?: (loading: boolean) => React.ReactNode
    onGetMore?: () => void
    onRowClick: (data: any) => string
    hasNextPage: boolean
    renderTitle: (data: any) => React.ReactNode
    renderList: (data: any, index: number) => React.ReactNode
}

const List: React.FC<ListProps> = ({ loading, data, EmptyList, groupBy, ...props }) => {
    const [parentRef] = useAutoAnimate<HTMLTableSectionElement>()

    const refactorData = useMemo(() => {
        if (!data || isEmpty(data)) return {}
        return data.reduce((acc: { [x: string]: any[] }, cur) => {
            const key = groupBy?.(cur)
            if (acc[key]) {
                acc[key].push(cur)
            } else if (!isNil(key)) {
                Object.assign(acc, { [key]: [cur] })
            }
            return acc
        }, {})
    }, [data, groupBy])

    return (
        <div ref={parentRef}>
            {!loading && (!data || isEmpty(data)) ? (
                EmptyList
            ) : (
                <BodyList loading={loading} data={refactorData} {...props} />
            )}
        </div>
    )
}

List.defaultProps = {
    EmptyList: <EmptyListTemplate />,
    SkeletonList: (loading) => <SkeletonListTemplate elNumber={loading ? 2 : 10} />,
    onRowClick: (data) => getLinkSpending(data.kindSpending.key, data._id),
}

export default List
