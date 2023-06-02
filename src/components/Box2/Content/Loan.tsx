import clsx from 'clsx'
import { isEmpty, isNil } from 'lodash'
import moment from 'moment'
import numeral from 'numeral'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ContentLoanBox2Props } from '~/@types/components'
import AvatarUser from '~/components/AvatarUser'
import { DATE_FORMAT } from '~/constant'
import { KIND_SPENDING } from '~/constant/spending'
import LANGUAGE from '~/i18n/language/key'

const Content: React.FC<ContentLoanBox2Props> = ({ data, loading }) => {
    const { t } = useTranslation()
    if (loading) return <Skeleton />
    if (isEmpty(data) || !Array.isArray(data))
        return (
            <div className='rounded-xl bg-white py-4 px-8 text-center text-gray-500 dark:bg-slate-700 dark:text-white'>
                {t(LANGUAGE.EMPTY_DATA)}
            </div>
        )
    return (
        <>
            {data?.map((item) => {
                let numberDay: number | undefined, date: { message: string; color: string }
                const isHaveEstimatePayDate = item.estimatePaidDate && item.estimatePaidDate !== 'Invalid date'
                if (isHaveEstimatePayDate) {
                    numberDay = moment(item.estimatePaidDate).diff(moment(), 'days')
                }
                date = {
                    message: `${t(LANGUAGE.REMAINING)} ${numberDay} ${t(LANGUAGE.L_DAYS)}`,
                    color: 'text-yellow-500',
                }

                if (!isNil(numberDay)) {
                    if (numberDay === 0) {
                        date = {
                            message: t(LANGUAGE.TODAY),
                            color: 'text-indigo-500',
                        }
                    }
                    if (numberDay < 0) {
                        date = {
                            message: t(LANGUAGE.OUT_OF_DATE),
                            color: 'text-radical-red-500',
                        }
                    }
                } else {
                    date = {
                        message: t(LANGUAGE.UNLIMITED_TIME),
                        color: 'text-gray-500',
                    }
                }

                return (
                    <Link
                        to={`transaction/${item._id}/detail`}
                        className='group flex cursor-pointer snap-start flex-col gap-x-3 gap-y-1 rounded-md border bg-white py-3 px-3 shadow-md transition-all hover:bg-gray-50 hover:shadow-lg dark:border-slate-800 dark:bg-slate-800'
                        key={item._id}
                    >
                        <AvatarUser size='small' image={item.userLoan?.image} />

                        <span className='max-w-[150px] flex-1 truncate text-gray-900 dark:text-slate-200'>
                            {item.userLoan?.userName}
                        </span>
                        <span className={clsx('truncate font-normal', date?.color)}>
                            {isHaveEstimatePayDate &&
                                moment(item.estimatePaidDate).format(DATE_FORMAT.D_DATE_TIME) + ' - '}{' '}
                            {date?.message}
                        </span>
                        <span
                            className={clsx('font-normal', {
                                'text-orange-500': KIND_SPENDING.CREDIT === item.kindSpending.key,
                                'text-indigo-500': KIND_SPENDING.LOAN === item.kindSpending.key,
                            })}
                        >
                            {numeral(item.amount).format()}
                        </span>
                    </Link>
                )
            })}
        </>
    )
}

export default Content

const Skeleton = () => {
    return (
        <>
            {Array.from(Array(5))?.map((item, index) => {
                return (
                    <div
                        key={index}
                        className='group flex animate-pulse cursor-wait flex-col gap-x-3 gap-y-2 rounded-md border bg-white py-3 px-3 shadow-md dark:border-slate-800 dark:bg-slate-800'
                    >
                        <div className='flex flex-shrink-0'>
                            <div className='h-8 w-8 rounded-full bg-gray-200 dark:bg-slate-700' />
                            <div className='h-8 w-8 rounded-full bg-gray-200 dark:bg-slate-700' />
                            <div className='h-8 w-8 rounded-full bg-gray-200 dark:bg-slate-700' />
                        </div>
                        <span className='h-8 w-20 rounded-full bg-gray-100 dark:bg-slate-600' />
                        <span className='h-8 w-40 rounded-full bg-gray-100 dark:bg-slate-600' />
                        <span className='h-8 w-28 rounded-full bg-gray-100 dark:bg-slate-600' />
                    </div>
                )
            })}
        </>
    )
}
