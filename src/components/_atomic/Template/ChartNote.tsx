import { isEmpty } from 'lodash'
import React from 'react'

interface Props {
    data: any[] | undefined
    loading?: boolean
    fallback?: React.ReactNode
    loadingFallback?: React.ReactNode
    getItemKey: (item: any) => string | number
    renderNoteTitle: (item: any) => React.ReactNode
    renderNoteSquare: (item: any) => React.ReactNode
}

const ChartNote: React.FC<Props> = (props) => {
    const { data, getItemKey, renderNoteSquare, renderNoteTitle, fallback, loading, loadingFallback } = props

    if (loading) {
        return <>{loadingFallback}</>
    }

    if (isEmpty(data)) {
        return <>{fallback}</>
    }

    return (
        <ul role='list' className='flex flex-wrap gap-3 text-gray-700 dark:text-slate-300'>
            {Array.isArray(data) &&
                data.map((item) => {
                    const key = getItemKey(item)
                    const noteTitle = renderNoteTitle(item)
                    const noteSquare = renderNoteSquare(item)

                    return (
                        <li key={key}>
                            <div className='flex items-center gap-1'>
                                {noteSquare}
                                {noteTitle}
                            </div>
                        </li>
                    )
                })}
        </ul>
    )
}

export default ChartNote
