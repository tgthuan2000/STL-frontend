import { useAutoAnimate } from '@formkit/auto-animate/react'
import { PencilAltIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import { isEmpty } from 'lodash'
import moment from 'moment'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { TimeFilterPayload } from '~/@types/components'
import { ProfileQueryData } from '~/@types/profile'
import { Button, Image, TimeFilter, Transaction } from '~/components'
import { DATE_FORMAT, TAGS } from '~/constant'
import { E_FILTER_DATE, TEMPLATE } from '~/constant/template'
import { useConfig, useLoading } from '~/context'
import { useQuery } from '~/hook'
import { ParamsTypeUseQuery, QueryTypeUseQuery, TagsTypeUseQuery } from '~/hook/useQuery'
import {
    GET_BUDGET_PROFILE_STATISTIC,
    GET_BUDGET_PROFILE_STATISTIC_FILTER_DATE_RANGE,
    GET_CATEGORY_PROFILE_STATISTIC,
    GET_CATEGORY_PROFILE_STATISTIC_FILTER_DATE_RANGE,
    GET_METHOD_PROFILE_STATISTIC,
    GET_METHOD_PROFILE_STATISTIC_FILTER_DATE_RANGE,
} from '~/schema/query/profile'
import { getDate } from '~/services'
import useAuth from '~/store/auth'
import { ProfileInfo, ProfileInfoGroup, ProfileInfoSkeleton } from '../components'
import * as profileServices from '../services/profile'

const filterQuery = {
    method: GET_METHOD_PROFILE_STATISTIC_FILTER_DATE_RANGE,
    category: GET_CATEGORY_PROFILE_STATISTIC_FILTER_DATE_RANGE,
    budget: GET_BUDGET_PROFILE_STATISTIC_FILTER_DATE_RANGE,
}
const excludeOptions = [E_FILTER_DATE.DATE]
const Dashboard = () => {
    const { userProfile } = useAuth()
    const [parent] = useAutoAnimate<HTMLDivElement>()
    const [searchParams] = useSearchParams()
    const { getKindSpendingIds } = useConfig()
    const { loading, setConfigLoading } = useLoading()

    const getAll = useMemo(() => {
        return {
            query: {
                method: GET_METHOD_PROFILE_STATISTIC,
                category: GET_CATEGORY_PROFILE_STATISTIC,
                budget: GET_BUDGET_PROFILE_STATISTIC,
            },
            params: {
                userId: userProfile?._id as string,
                receiveKindIds: getKindSpendingIds('RECEIVE'),
                costKindIds: getKindSpendingIds('COST'),
            },
            tags: { method: TAGS.ALTERNATE, category: TAGS.ALTERNATE, budget: TAGS.ALTERNATE },
        }
    }, [])

    const defaultValues = useMemo(() => {
        try {
            let query = getAll.query,
                params = {}

            const d = Object.fromEntries([...searchParams])
            if (!isEmpty(d)) {
                query = filterQuery
                let { type, data } = d
                data = JSON.parse(data)

                switch (Number(type)) {
                    case E_FILTER_DATE.DATE_RANGE: {
                        const [startDate, endDate] = data
                        params = {
                            __startDate: getDate(moment(startDate).toDate(), 'start'),
                            __endDate: getDate(moment(endDate).toDate(), 'end'),
                        }
                        break
                    }
                    case E_FILTER_DATE.MONTH: {
                        params = {
                            __startDate: getDate(moment(data).toDate(), 'start', 'month'),
                            __endDate: getDate(moment(data).toDate(), 'end', 'month'),
                        }
                        break
                    }
                    case E_FILTER_DATE.YEAR: {
                        params = {
                            __startDate: getDate(moment(data).toDate(), 'start', 'year'),
                            __endDate: getDate(moment(data).toDate(), 'end', 'year'),
                        }
                        break
                    }
                }
            }

            return {
                ...getAll,
                query,
                params: { ...getAll.params, ...params, receiveCostKindIds: getKindSpendingIds('RECEIVE', 'COST') },
            }
        } catch (error) {
            console.log(error)
            return getAll
        }
    }, [])
    const [{ query, params, tags }, setQuery] = useState<{
        query: QueryTypeUseQuery<ProfileQueryData>
        params: ParamsTypeUseQuery
        tags: TagsTypeUseQuery<ProfileQueryData>
    }>(defaultValues)

    const [{ method, budget, category }, fetchData, deleteCacheData, reload, error] = useQuery<ProfileQueryData>(
        query,
        params,
        tags
    )

    useEffect(() => {
        setConfigLoading(true)
        fetchData().then(() => setConfigLoading(false))
    }, [])

    const onReload = () => {
        const res = deleteCacheData('method', 'budget', 'category')
        console.log(res)
        reload()
    }

    const profileOptions = useMemo(() => {
        if (method.loading || budget.loading || category.loading) return []

        const data = profileServices.getProfileOptions({
            method: method.data,
            budget: budget.data,
            category: category.data,
        })
        return data
    }, [method.loading, budget.loading, category.loading])

    const handleFilterSubmit = (data: TimeFilterPayload) => {
        switch (data.id) {
            case E_FILTER_DATE.ALL:
                setQuery(getAll)
                break
            case E_FILTER_DATE.DATE_RANGE:
                const [startDate, endDate] = data.data as Date[]
                setQuery((prev) => ({
                    ...prev,
                    query: filterQuery,
                    params: {
                        ...defaultValues.params,
                        __startDate: getDate(startDate, 'start'),
                        __endDate: getDate(endDate, 'end'),
                        receiveCostKindIds: getKindSpendingIds('RECEIVE', 'COST'),
                    },
                }))
                break
            case E_FILTER_DATE.MONTH:
                const month = data.data as Date
                setQuery((prev) => ({
                    ...prev,
                    query: filterQuery,
                    params: {
                        ...defaultValues.params,
                        __startDate: getDate(month, 'start', 'month'),
                        __endDate: getDate(month, 'end', 'month'),
                        receiveCostKindIds: getKindSpendingIds('RECEIVE', 'COST'),
                    },
                }))
                break
            case E_FILTER_DATE.YEAR:
                const year = data.data as Date
                setQuery((prev) => ({
                    ...prev,
                    query: filterQuery,
                    params: {
                        ...defaultValues.params,
                        __startDate: getDate(year, 'start', 'year'),
                        __endDate: getDate(year, 'end', 'year'),
                        receiveCostKindIds: getKindSpendingIds('RECEIVE', 'COST'),
                    },
                }))
                break
        }

        onReload()
    }

    return (
        <Transaction title='Thông tin cá nhân'>
            <div className='relative mt-20 max-w-7xl mx-auto w-full'>
                {/* IMAGE */}
                <div className='absolute z-[1] bottom-full left-1/2 -translate-x-1/2 -mb-12 sm:-mb-14 select-none'>
                    <Image
                        src={userProfile?.image}
                        size='custom'
                        className='mx-auto h-28 sm:h-32 w-28 sm:w-32 border-2 dark:border-slate-700 shadow-lg'
                    />
                </div>
                {/* MAIN */}
                <div className='relative min-h-screen bg-white dark:bg-slate-800 rounded-lg shadow-lg pt-12 sm:pt-14 select-none'>
                    {/* TOOLS */}
                    <div className='absolute bottom-[calc(100%+12px)] right-2'>
                        <Button
                            type='button'
                            color='primary'
                            className='rounded-lg bg-gray-200 dark:bg-slate-700 dark:border-slate-700 dark:text-slate-200 dark:hover:opacity-50 min-w-0 inline-flex shadow border justify-center items-center hover:bg-gray-700 transition-all text-gray-700 hover:text-white'
                        >
                            <PencilAltIcon className='h-4 w-4' />{' '}
                            <span className='hidden sm:inline-block'>Cập nhật</span>
                        </Button>
                    </div>
                    {/* USER INFO */}
                    <div className='mt-2 flex flex-col justify-center items-center gap-1'>
                        <h2 className='text-base sm:text-xl font-medium text-prussian-blue-700 dark:text-prussian-blue-300'>
                            {userProfile?.userName}
                        </h2>
                        <p className='text-xs sm:text-sm text-gray-500 dark:text-slate-300'>{userProfile?.email}</p>
                        <span className='text-xs text-gray-500 dark:text-slate-300'>
                            Ngày tham gia: <b>{moment(userProfile?._createdAt).format(DATE_FORMAT.TIME_DATE)}</b>
                        </span>
                    </div>
                    {/* DASHBOARD */}

                    <div className='mt-2 sm:mt-5 sm:space-y-5 space-y-2'>
                        <div className='sm:px-3'>
                            <TimeFilter onSubmit={handleFilterSubmit} excludes={excludeOptions} />
                        </div>
                        <div className='sm:shadow-lg overflow-hidden sm:bg-gradient-to-tl sm:from-indigo-500 sm:via-purple-500 sm:to-pink-500 sm:p-3'>
                            <div className='grid xl:grid-cols-4 grid-cols-1 backdrop-blur-lg' ref={parent}>
                                {loading.config ? (
                                    <p className='animate-pulse my-5 sm:my-3 sm:text-lg text-sm text-gray-700 sm:text-white font-normal text-center'>
                                        {TEMPLATE.LOADING}
                                    </p>
                                ) : isEmpty(profileOptions) ? (
                                    <ProfileInfoSkeleton />
                                ) : (
                                    profileOptions.map((profile, index) => (
                                        <ProfileInfoGroup
                                            key={index}
                                            title={profile.title}
                                            className={clsx('flex gap-2', profile.className)}
                                            wrapClassName={profile.wrapClassName}
                                            hidden={profile.hidden}
                                        >
                                            {profile.values.map((value, index) => (
                                                <ProfileInfo
                                                    key={value.id}
                                                    label={value.title}
                                                    hidden={value.hidden}
                                                    data={value.data}
                                                />
                                            ))}
                                        </ProfileInfoGroup>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Transaction>
    )
}

export default Dashboard
