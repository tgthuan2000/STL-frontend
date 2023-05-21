import { ArchiveBoxXMarkIcon } from '@heroicons/react/24/outline'
import { get } from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { SkeletonProps } from '~/@types/components'
import { MethodProps } from '~/@types/spending'
import { SkeletonLine } from '~/components'
import { MethodList, RenderAmount, RenderTitle } from '~/components/Spending'
import { getAmountTextColor } from '~/constant/spending'
import LANGUAGE from '~/i18n/language/key'
import Empty from './Empty'

const Method: React.FC<MethodProps> = (props) => {
    const { data, loading } = props
    const { t } = useTranslation()

    if (loading) return <MethodSkeleton elNumber={8} />

    return (
        <MethodList
            data={data}
            fallback={<Empty icon={ArchiveBoxXMarkIcon} text={t(LANGUAGE.EMPTY_DATA)} />}
            getItemKey={(item) => get(item, '_id')}
            getItemLink={(item) => `/spending/method/${get(item, '_id')}`}
            renderName={(item) => <RenderTitle title={get(item, 'name')} fallback={t(LANGUAGE.EMPTY_METHOD)} />}
            renderSurplus={(item) => {
                const surplus = get(item, 'surplus')
                return <RenderAmount amount={surplus} className={() => getAmountTextColor(surplus)} />
            }}
        />
    )
}

export default Method

export const MethodSkeleton: React.FC<SkeletonProps> = (props) => {
    const { elNumber = 5 } = props

    return (
        <ul role='list' className='pointer-events-none select-none'>
            {Array.from(Array(elNumber)).map((value, index) => (
                <li key={index} className='animate-pulse' style={{ animationDelay: `${index * 300}ms` }}>
                    <div className='flex px-3 py-2.5'>
                        <div className='w-2/3 space-y-1'>
                            <SkeletonLine className='h-3.5 w-2/3' />
                        </div>
                        <div className='flex w-1/3 flex-col items-end space-y-1'>
                            <SkeletonLine className='h-3.5 w-2/3' />
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}
