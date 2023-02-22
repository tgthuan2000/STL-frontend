import { useAutoAnimate } from '@formkit/auto-animate/react'
import { CheckBadgeIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { isEmpty } from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { searchName } from '~/features/spending/services'
import LANGUAGE from '~/i18n/language/key'

interface CheckNameProps {
    show: boolean
    list: any[] | undefined
    watchValue: string
}

const CheckName: React.FC<CheckNameProps> = ({ show, list, watchValue }) => {
    const { t } = useTranslation()
    const [parent] = useAutoAnimate<HTMLDivElement>()
    return (
        <div ref={parent}>
            {show && (
                <>
                    {!isEmpty(list) ? (
                        <>
                            <h4></h4>
                            <span className='flex items-center gap-1 text-yellow-500'>
                                <ExclamationCircleIcon className='h-6 w-6' />
                                <span>{t(LANGUAGE.SOME_SIMILAR_NAME)}</span>
                            </span>

                            <ul className='mt-1 list-disc pl-5'>
                                {list?.map((item) => {
                                    const component = searchName(item.name, watchValue)
                                    if (typeof component === 'string') {
                                        return <li key={item._id}>{component}</li>
                                    }
                                    const [start, middle, end] = component
                                    return (
                                        <li key={item._id} className='text-gray-900 dark:text-slate-200'>
                                            {start}
                                            <span className='font-medium text-yellow-600'>{middle}</span>
                                            {end}
                                        </li>
                                    )
                                })}
                            </ul>
                        </>
                    ) : (
                        <span className='flex items-center gap-1 text-green-500'>
                            <CheckBadgeIcon className='h-6 w-6' />
                            {t(LANGUAGE.NOT_SIMILAR_NAME)}
                        </span>
                    )}
                </>
            )}
        </div>
    )
}

export default CheckName
