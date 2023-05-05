import { get } from 'lodash'
import moment from 'moment'
import numeral from 'numeral'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { profileOptionFn } from '~/@types/profile'
import { DATE_FORMAT } from '~/constant'
import LANGUAGE from '~/i18n/language/key'
import { ProfileServices } from '../services/profile'

export const useProfileOptions = () => {
    const { t } = useTranslation()

    const callback: profileOptionFn = useCallback(
        ({ method, budget, category }) => {
            const _method = ProfileServices.method(method)
            const _category = ProfileServices.category(category)
            const _budget = ProfileServices.budget(budget)

            return [
                {
                    id: 1,
                    hidden:
                        !get(_method, 'maxUsed._id') && !get(_method, 'maxReceive._id') && !get(_method, 'maxCost._id'),
                    title: t(LANGUAGE.METHOD_SPENDING),
                    wrapClassName: 'lg:row-start-1 lg:col-start-2 lg:col-span-1 lg:row-span-3',
                    className: 'flex-col',
                    values: [
                        {
                            id: 1,
                            hidden: !get(_method, 'maxUsed._id'),
                            title: t(LANGUAGE.MOST_USED),
                            data: (
                                <div className='flex items-end justify-between font-normal'>
                                    <p className='text-left text-gray-700 line-clamp-2 dark:text-slate-200'>
                                        {get(_method, 'maxUsed.name')}
                                    </p>
                                    <span className='text-cyan-400'>{get(_method, 'maxUsed.countUsed')}</span>
                                </div>
                            ),
                        },
                        {
                            id: 2,
                            hidden: !get(_method, 'maxReceive._id'),
                            title: t(LANGUAGE.MOST_RECEIVE),
                            data: (
                                <div className='flex items-end justify-between font-normal'>
                                    <p className='text-left text-gray-700 line-clamp-2 dark:text-slate-200'>
                                        {get(_method, 'maxReceive.name')}
                                    </p>
                                    <span className='text-green-400'>
                                        {numeral(get(_method, 'maxReceive.receives')).format()}
                                    </span>
                                </div>
                            ),
                        },
                        {
                            id: 3,
                            hidden: !get(_method, 'maxCost._id'),
                            title: t(LANGUAGE.MOST_COST),
                            data: (
                                <div className='flex items-end justify-between font-normal'>
                                    <p className='text-left text-gray-700 line-clamp-2 dark:text-slate-200'>
                                        {get(_method, 'maxCost.name')}
                                    </p>
                                    <span className='text-radical-red-400'>
                                        {numeral(get(_method, 'maxCost.costs')).format()}
                                    </span>
                                </div>
                            ),
                        },
                    ],
                },
                {
                    id: 2,
                    hidden:
                        !get(_category, 'maxCostUsed._id') &&
                        !get(_category, 'maxReceiveUsed._id') &&
                        !get(_category, 'maxCost._id') &&
                        !get(_category, 'maxReceive._id'),
                    title: t(LANGUAGE.CATEGORY),
                    wrapClassName: 'lg:row-start-1 lg:col-start-1 lg:col-span-1 lg:row-span-3',
                    className: 'flex-col',
                    values: [
                        {
                            id: 1,
                            hidden: !get(_category, 'maxCostUsed._id'),
                            title: t(LANGUAGE.MOST_USED_COST),
                            data: (
                                <div className='flex items-end justify-between font-normal'>
                                    <p className='text-left text-gray-700 line-clamp-2 dark:text-slate-200'>
                                        {get(_category, 'maxCostUsed.name')}
                                    </p>
                                    <span className='text-cyan-400'>
                                        {numeral(get(_category, 'maxCostUsed.countUsed')).format()}
                                    </span>
                                </div>
                            ),
                        },
                        {
                            id: 2,
                            hidden: !get(_category, 'maxReceiveUsed._id'),
                            title: t(LANGUAGE.MOST_USED_RECEIVE),
                            data: (
                                <div className='flex items-end justify-between font-normal'>
                                    <p className='text-left text-gray-700 line-clamp-2 dark:text-slate-200'>
                                        {get(_category, 'maxReceiveUsed.name')}
                                    </p>
                                    <span className='text-cyan-400'>
                                        {numeral(get(_category, 'maxReceiveUsed.countUsed')).format()}
                                    </span>
                                </div>
                            ),
                        },
                        {
                            id: 3,
                            hidden: !get(_category, 'maxCost._id'),
                            title: t(LANGUAGE.MOST_COST_TOTAL),
                            data: (
                                <div className='flex items-end justify-between font-normal'>
                                    <p className='text-left text-gray-700 line-clamp-2 dark:text-slate-200'>
                                        {get(_category, 'maxCost.name')}
                                    </p>
                                    <span className='text-radical-red-400'>
                                        {numeral(get(_category, 'maxCost.costs')).format()}
                                    </span>
                                </div>
                            ),
                        },
                        {
                            id: 4,
                            hidden: !get(_category, 'maxReceive._id'),
                            title: t(LANGUAGE.MOST_RECEIVE_TOTAL),
                            data: (
                                <div className='flex items-end justify-between font-normal'>
                                    <p className='text-left text-gray-700 line-clamp-2 dark:text-slate-200'>
                                        {get(_category, 'maxReceive.name')}
                                    </p>
                                    <span className='text-green-400'>
                                        {numeral(get(_category, 'maxReceive.receives')).format()}
                                    </span>
                                </div>
                            ),
                        },
                    ],
                },
                {
                    id: 3,
                    hidden: !get(_budget, 'maxTotalMethod._id') && !get(_budget, 'maxTotalCategory._id'),
                    title: t(LANGUAGE.BUDGET),
                    wrapClassName: 'lg:row-start-1 lg:col-start-3 lg:col-span-1 lg:row-span-1',
                    className: 'flex-col',
                    values: [
                        {
                            id: 1,
                            hidden: !get(_budget, 'maxTotalMethod._id'),
                            title: t(LANGUAGE.MOST_METHOD_AMOUNT),
                            data: (
                                <div className='flex items-end justify-between font-normal'>
                                    <p className='text-left text-gray-700 line-clamp-2 dark:text-slate-200'>
                                        {moment(get(_budget, 'maxTotalMethod.date')).format(DATE_FORMAT.MONTH)}
                                    </p>
                                    <span className='text-yellow-400'>
                                        {numeral(get(_budget, 'maxTotalMethod.totalMethod')).format()}
                                    </span>
                                </div>
                            ),
                        },
                        {
                            id: 2,
                            hidden: !get(_budget, 'maxTotalCategory._id'),
                            title: t(LANGUAGE.MOST_CATEGORY_AMOUNT),
                            data: (
                                <div className='flex items-end justify-between font-normal'>
                                    <p className='text-left text-gray-700 line-clamp-2 dark:text-slate-200'>
                                        {moment(get(_budget, 'maxTotalCategory.date')).format(DATE_FORMAT.MONTH)}
                                    </p>
                                    <span className='text-yellow-400'>
                                        {numeral(get(_budget, 'maxTotalCategory.totalCategory')).format()}
                                    </span>
                                </div>
                            ),
                        },
                    ],
                },
            ]
        },
        [t]
    )

    return callback
}
