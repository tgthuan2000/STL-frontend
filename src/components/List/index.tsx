import { isEmpty, isNil } from 'lodash'
import React, { useMemo } from 'react'
import { ListProps } from '~/@types/components'
import { getLinkSpending } from '~/utils'
import AnimateWrap from '../AnimateWrap'
import BodyList from './Body'
import EmptyListTemplate from './Empty'
import SkeletonListTemplate from './Skeleton'

const List: React.FC<ListProps> = ({ loading, data, EmptyList, groupBy, ...props }) => {
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
    }, [JSON.stringify(data), groupBy])

    return (
        <AnimateWrap className='inline-block w-full py-2 align-middle'>
            {!loading && (!data || isEmpty(data)) ? (
                EmptyList
            ) : (
                <BodyList loading={loading} data={refactorData} {...props} />
            )}
        </AnimateWrap>
    )
}

List.defaultProps = {
    EmptyList: <EmptyListTemplate />,
    SkeletonList: (loading) => <SkeletonListTemplate elNumber={loading ? 2 : 10} />,
    onRowClick: (data) => getLinkSpending(data.kindSpending.key, data._id),
}

export default List
