import clsx from 'clsx'
import { isEmpty } from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { TimeFilterPayload } from '~/@types/components'
import { ParamsTypeUseQuery, QueryTypeUseQuery, TagsTypeUseQuery } from '~/@types/hook'
import { ProfileQueryData } from '~/@types/profile'
import { AnimateWrap, TimeFilter } from '~/components'
import LoadingText from '~/components/Loading/LoadingText'
import { E_FILTER_DATE } from '~/constant/template'
import { useConfig, useLoading } from '~/context'
import { useProfileOptions } from '~/features/profile/hook'
import { services } from '~/features/profile/services'
import { useQuery } from '~/hook'
import { useProfile } from '~/store/auth'
import ProfileInfoSkeleton from './ProfileInfoSkeleton'
import ProfileInfoGroup from './ProfileInfoGroup'
import ProfileInfo from './ProfileInfo'

const excludeOptions = [E_FILTER_DATE.DATE]

const Statistics = () => {
    const { userProfile } = useProfile()
    const [searchParams] = useSearchParams()
    const { getKindSpendingIds } = useConfig()
    const { loading } = useLoading()

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

    const getProfileOptions = useProfileOptions()

    const profileOptions = useMemo(() => {
        if (method.loading || budget.loading || category.loading) return []

        const data = getProfileOptions({
            method: method.data,
            budget: budget.data,
            category: category.data,
        })
        return data
    }, [method, budget, category])

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
        <div className='mt-2 space-y-2 sm:mt-5 sm:space-y-5'>
            <div className='sm:px-3'>
                <TimeFilter onSubmit={handleFilterSubmit} excludes={excludeOptions} />
            </div>
            <div className='overflow-hidden px-1 sm:bg-gradient-to-tl sm:from-indigo-500 sm:via-purple-500 sm:to-pink-500 sm:p-3 sm:shadow-lg sm:dark:from-transparent sm:dark:to-transparent sm:dark:shadow-none'>
                <AnimateWrap className='grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] backdrop-blur-lg'>
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
                </AnimateWrap>
            </div>
        </div>
    )
}

export default Statistics
