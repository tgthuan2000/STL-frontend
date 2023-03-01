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
import LoadingText from '~/components/Loading/LoadingText'
import { DATE_FORMAT } from '~/constant'
import { E_FILTER_DATE } from '~/constant/template'
import { useConfig, useLoading } from '~/context'
import { useQuery, useWindowSize } from '~/hook'
import LANGUAGE from '~/i18n/language/key'
import { useProfile } from '~/store/auth'
import { AllowSendMail, ProfileInfo, ProfileInfoGroup, ProfileInfoSkeleton, TwoFactorAuth } from '../components'
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
            <div className='relative mx-auto mt-20 w-full max-w-7xl'>
                {/* IMAGE */}
                <div className='absolute bottom-full left-1/2 z-[1] -mb-12 -translate-x-1/2 select-none sm:-mb-14'>
                    <Image
                        src={userProfile?.image}
                        size='custom'
                        className='mx-auto h-28 w-28 border-2 shadow-lg dark:border-slate-700 sm:h-32 sm:w-32'
                    />
                </div>
                {/* MAIN */}
                <div className='relative -mx-4 min-h-screen select-none bg-white pt-12 shadow-lg dark:bg-slate-800 sm:rounded-lg sm:pt-14'>
                    {/* TOOLS */}
                    <div className='absolute bottom-[calc(100%+12px)] right-2'>
                        <Button
                            type='button'
                            color='primary'
                            className='inline-flex min-w-0 items-center justify-center gap-1 rounded-lg border bg-gray-200 text-gray-700 shadow transition-all hover:bg-gray-700 hover:text-white dark:border-slate-700 dark:bg-slate-700 dark:text-slate-200 dark:hover:opacity-50 sm:gap-2'
                        >
                            <PencilSquareIcon className='h-4 w-4' /> <span>{t(LANGUAGE.UPDATE)}</span>
                        </Button>
                    </div>
                    {/* USER INFO */}
                    <div className='mt-2 flex flex-col items-center justify-center gap-1'>
                        <h2 className='text-base font-medium text-prussian-blue-700 dark:text-prussian-blue-300 sm:text-xl'>
                            {userProfile?.userName}
                        </h2>
                        <p className='text-xs text-gray-500 dark:text-slate-300 sm:text-sm'>{userProfile?.email}</p>
                        <span className='text-xs text-gray-500 dark:text-slate-300'>
                            {t(LANGUAGE.JOIN_DATE)}:{' '}
                            <b>{moment(userProfile?._createdAt).format(DATE_FORMAT.TIME_DATE)}</b>
                        </span>
                    </div>
                    {/* DASHBOARD */}

                    <div className='mx-auto my-10 w-full max-w-lg space-y-6 text-gray-900 dark:text-slate-200 sm:rounded-lg sm:border sm:p-5 sm:shadow-md dark:sm:border-slate-600'>
                        <div className='space-y-2 px-2'>
                            <h4 className='border-b border-gray-200 pb-2 text-2xl font-normal dark:border-slate-700 sm:text-xl'>
                                {t(LANGUAGE.EMAIL)}
                            </h4>
                            <AllowSendMail />
                        </div>
                        <div className='space-y-2 px-2'>
                            <h4 className='border-b border-gray-200 pb-2 text-2xl font-normal dark:border-slate-700 sm:text-xl'>
                                {t(LANGUAGE.SECURITY)}
                            </h4>
                            <TwoFactorAuth />
                        </div>
                    </div>

                    <hr className='mx-2 block border-gray-200 dark:border-slate-700 sm:hidden' />

                    <div className='mt-2 space-y-2 sm:mt-5 sm:space-y-5'>
                        <div className='sm:px-3'>
                            <TimeFilter onSubmit={handleFilterSubmit} excludes={excludeOptions} />
                        </div>
                        <div className='overflow-hidden px-1 sm:bg-gradient-to-tl sm:from-indigo-500 sm:via-purple-500 sm:to-pink-500 sm:p-3 sm:shadow-lg'>
                            <div className='grid grid-cols-1 backdrop-blur-lg xl:grid-cols-4' ref={parent}>
                                {loading.config ? (
                                    <LoadingText className='my-5 text-center text-sm font-normal sm:my-3 sm:text-lg sm:text-white' />
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
