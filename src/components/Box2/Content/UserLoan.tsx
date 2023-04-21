import clsx from 'clsx'
import { isEmpty } from 'lodash'
import numeral from 'numeral'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ContentUserLoanBox2Props } from '~/@types/components'
import AvatarUser from '~/components/AvatarUser'
import LANGUAGE from '~/i18n/language/key'

const Content: React.FC<ContentUserLoanBox2Props> = ({ data, loading }) => {
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
                return (
                    <Link
                        to={`member/${item._id}`}
                        className='group flex cursor-pointer snap-start items-center gap-x-3 rounded-md border bg-white py-3 px-3 shadow-md transition-all hover:bg-gray-50 hover:shadow-lg dark:border-slate-800 dark:bg-slate-800 lg:px-6'
                        key={item._id}
                    >
                        <AvatarUser size='large' image={item?.image} />

                        <div className='flex flex-col'>
                            <span className='max-w-[150px] truncate text-gray-900 dark:text-slate-200'>
                                {item.userName}
                            </span>
                            <span
                                className={clsx(
                                    'font-normal',
                                    { 'text-green-500': item.surplus > 0 },
                                    { 'text-red-500': item.surplus < 0 },
                                    { 'text-gray-500': item.surplus === 0 }
                                )}
                            >
                                {numeral(item.surplus).format()}
                            </span>
                        </div>
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
                        className='group flex animate-pulse items-center gap-x-3 rounded-md border bg-white py-3 px-3 shadow-md dark:border-slate-800 dark:bg-slate-800 lg:px-6'
                        key={index}
                    >
                        <div className='h-12 w-12 flex-shrink-0 rounded-full bg-gray-200 dark:bg-slate-700 lg:h-14 lg:w-14' />
                        <div className='flex flex-col gap-2'>
                            <span className='h-5 w-20 rounded-full bg-gray-100 dark:bg-slate-600'></span>
                            <span className='h-5 w-14 rounded-full bg-gray-100 dark:bg-slate-600'></span>
                        </div>
                    </div>
                )
            })}
        </>
    )
}
