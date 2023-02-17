import { useAutoAnimate } from '@formkit/auto-animate/react'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { isEmpty } from 'lodash'
import moment from 'moment'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { TimeFilterPayload } from '~/@types/components'
import { ParamsTypeUseQuery, QueryTypeUseQuery, TagsTypeUseQuery } from '~/@types/hook'
import { ProfileQueryData } from '~/@types/profile'
import { Button, Image, TimeFilter, Transaction } from '~/components'
import { DATE_FORMAT } from '~/constant'
import { E_FILTER_DATE } from '~/constant/template'
import { useConfig, useLoading } from '~/context'
import { useQuery, useWindowSize } from '~/hook'
import LANGUAGE from '~/i18n/language/key'
import { useProfile } from '~/store/auth'
import { AllowSendMail, ProfileInfo, ProfileInfoGroup, ProfileInfoSkeleton } from '../components'
import { services } from '../services'
import * as profileServices from '../services/profile'

const excludeOptions = [E_FILTER_DATE.DATE]

const Dashboard = () => {
    const { t } = useTranslation()
    const { userProfile } = useProfile()
    const [parent] = useAutoAnimate<HTMLDivElement>()
    const [searchParams] = useSearchParams()
    const { getKindSpendingIds } = useConfig()
    const { loading, setConfigLoading } = useLoading()
    const { width } = useWindowSize()

    const getAll = useMemo(
        () =>
            services.getAll({
                userId: userProfile?._id as string,
                receiveKindIds: getKindSpendingIds('RECEIVE'),
                costKindIds: getKindSpendingIds('COST'),
            }),
        []
    )

    const defaultValues = useMemo(
        () =>
            services.getDefaultValue({
                getAll,
                receiveCostKindIds: getKindSpendingIds('RECEIVE', 'COST'),
                searchParams,
            }),
        []
    )
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
        fetchData()
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
        const _data = services.filterSubmit(data, {
            defaultValues,
            getAll,
            receiveCostKindIds: getKindSpendingIds('RECEIVE', 'COST'),
        })
        if (_data) {
            setQuery(_data)
            onReload()
        }
    }

    return (
        <Transaction title={t(LANGUAGE.PROFILE_MANAGEMENT)} hasBack={width > 768}>
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
                <div className='relative min-h-screen bg-white dark:bg-slate-800 -mx-4 sm:rounded-lg shadow-lg pt-12 sm:pt-14 select-none'>
                    {/* TOOLS */}
                    <div className='absolute bottom-[calc(100%+12px)] right-2'>
                        <Button
                            type='button'
                            color='primary'
                            className='rounded-lg bg-gray-200 dark:bg-slate-700 dark:border-slate-700 dark:text-slate-200 dark:hover:opacity-50 min-w-0 inline-flex shadow border justify-center items-center hover:bg-gray-700 transition-all text-gray-700 hover:text-white'
                        >
                            <PencilSquareIcon className='h-4 w-4' />{' '}
                            <span className='hidden sm:inline-block'>{t(LANGUAGE.UPDATE)}</span>
                        </Button>
                    </div>
                    {/* USER INFO */}
                    <div className='mt-2 flex flex-col justify-center items-center gap-1'>
                        <h2 className='text-base sm:text-xl font-medium text-prussian-blue-700 dark:text-prussian-blue-300'>
                            {userProfile?.userName}
                        </h2>
                        <p className='text-xs sm:text-sm text-gray-500 dark:text-slate-300'>{userProfile?.email}</p>
                        <span className='text-xs text-gray-500 dark:text-slate-300'>
                            {t(LANGUAGE.JOIN_DATE)}:{' '}
                            <b>{moment(userProfile?._createdAt).format(DATE_FORMAT.TIME_DATE)}</b>
                        </span>
                        <AllowSendMail />
                    </div>
                    {/* DASHBOARD */}

                    <div className='mt-2 sm:mt-5 sm:space-y-5 space-y-2'>
                        <div className='sm:px-3'>
                            <TimeFilter onSubmit={handleFilterSubmit} excludes={excludeOptions} />
                        </div>
                        <div className='sm:shadow-lg overflow-hidden sm:bg-gradient-to-tl sm:from-indigo-500 sm:via-purple-500 sm:to-pink-500 sm:p-3 px-1'>
                            <div className='grid xl:grid-cols-4 grid-cols-1 backdrop-blur-lg' ref={parent}>
                                {loading.config ? (
                                    <p className='animate-pulse my-5 sm:my-3 sm:text-lg text-sm text-gray-700 sm:text-white font-normal text-center'>
                                        {t(LANGUAGE.LOADING)}
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
