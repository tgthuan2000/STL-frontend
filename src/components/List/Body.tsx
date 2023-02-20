import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Fragment, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Waypoint } from 'react-waypoint'
import { BodyListProps } from '~/@types/components'

const BodyList: React.FC<BodyListProps> = ({
    loading,
    onGetMore,
    SkeletonList,
    hasNextPage,
    onRowClick,
    data,
    renderTitle,
    renderList,
    onItemClick,
}) => {
    const [parentRef] = useAutoAnimate<HTMLTableSectionElement>()
    const navigate = useNavigate()
    const wpLoading = useRef(false)

    const handleGetMoreData = () => {
        if (onGetMore) {
            wpLoading.current = true
            onGetMore()
        }
    }

    useEffect(() => {
        if (!loading && wpLoading.current) {
            wpLoading.current = false
        }
    }, [loading])

    return (
        <div className='overflow-hidden sm:rounded-lg' ref={parentRef}>
            <>
                {(!loading || wpLoading.current) &&
                    Object.keys(data).map((key, index) => (
                        <div key={key}>
                            {renderTitle(key)}
                            <ul className='divide-y dark:divide-slate-700'>
                                {data[key].map((item, index) => {
                                    const to = onRowClick(item)
                                    return (
                                        <Fragment key={item._id}>
                                            <li
                                                onClick={async () => {
                                                    await onItemClick?.(item)
                                                    navigate(to)
                                                }}
                                            >
                                                {renderList(item, index)}
                                            </li>
                                        </Fragment>
                                    )
                                })}
                            </ul>
                        </div>
                    ))}

                {loading
                    ? SkeletonList?.(wpLoading.current)
                    : hasNextPage && <Waypoint onEnter={handleGetMoreData} bottomOffset='-20%' />}
            </>
        </div>
    )
}

export default BodyList
