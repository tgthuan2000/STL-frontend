import { SanityAssetDocument } from '@sanity/client'
import moment from 'moment'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { ISpendingData } from '~/@types/spending'
import { Box, Button, Image, Transaction } from '~/components'
import LoadingText from '~/components/Loading/LoadingText'
import { DATE_FORMAT, TAGS } from '~/constant'
import { useCheck, useDetailDialog, useLoading } from '~/context'
import { useQuery } from '~/hook'
import LANGUAGE from '~/i18n/language/key'
import { urlFor } from '~/sanityConfig'
import { GET_MEMBER_LOAN_BY_ID } from '~/schema/query/loan'
import { useProfile } from '~/store/auth'
import Loan from '../components/Loan'

const EditDialog = React.lazy(() => import('../components/EditDialog'))

export interface Member {
    _id: string
    _createdAt: string
    userName: string
    image?: SanityAssetDocument
    spending?: ISpendingData[]
}

interface QueryData {
    member: Member
}

const MemberDetail = () => {
    const { t } = useTranslation()
    const { userProfile } = useProfile()
    const { id } = useParams()
    const { setSubmitLoading } = useLoading()
    const { set } = useDetailDialog()

    const [{ member }, fetchData, deleteCacheData, reloadData] = useQuery<QueryData>(
        { member: GET_MEMBER_LOAN_BY_ID },
        { userId: userProfile?._id as string, id: id as string },
        { member: TAGS.SHORT }
    )

    useEffect(() => {
        setSubmitLoading(true)
        fetchData().finally(() => {
            setSubmitLoading(false)
        })
    }, [])

    useCheck(reloadData)

    const onReload = () => {
        deleteCacheData('member')
        reloadData()
    }

    const handleEditInfo = () => {
        if (!member.data) {
            return
        }
        set({
            title: t(LANGUAGE.UPDATE),
            content: <EditDialog clearCache={onReload} data={member.data} />,
            fallback: <LoadingText className='p-2' />,
        })
    }

    return (
        <Transaction title={t(LANGUAGE.PROFILE_MANAGEMENT)} hasBack>
            <div className='mx-auto mt-20 w-full max-w-7xl'>
                <div className='flex flex-col-reverse gap-10 lg:flex-row lg:pr-3'>
                    <div className='flex-cols flex flex-[1.5] gap-2 lg:-mt-10'>
                        {/* SPENDING */}
                        <Box.Content
                            className='w-full'
                            title={t(LANGUAGE.CREDIT_LIST)}
                            onReload={onReload}
                            loading={member.loading}
                        >
                            <Loan data={member.data?.spending} loading={member.loading} />
                        </Box.Content>
                    </div>

                    <div className='relative flex-1'>
                        {/* IMAGE */}
                        {member.data && (
                            <>
                                <div className='absolute bottom-full left-1/2 z-[1] -mb-12 -translate-x-1/2 select-none sm:-mb-14'>
                                    <Image
                                        src={urlFor(member.data.image)}
                                        avatar={{ roundFull: true, size: 'custom' }}
                                        className='mx-auto h-28 w-28 border-2 object-cover shadow-lg dark:border-slate-700 sm:h-32 sm:w-32'
                                    />
                                </div>
                                {/* MAIN */}
                                <div className='relative -mx-4 select-none bg-white py-12 shadow-md dark:bg-slate-800 sm:rounded-lg sm:pt-14'>
                                    {/* TOOLS */}
                                    <div className='absolute bottom-[calc(100%+12px)] right-2'>
                                        <Button
                                            type='button'
                                            color='custom'
                                            className='inline-flex min-w-0 items-center justify-center gap-1 rounded-lg border bg-white text-gray-900 transition-all hover:bg-gray-700 hover:text-white dark:border-slate-700 dark:bg-slate-700 dark:text-slate-200 dark:hover:opacity-50 sm:gap-2'
                                            onClick={handleEditInfo}
                                        >
                                            {t(LANGUAGE.UPDATE)}
                                        </Button>
                                    </div>

                                    {/* USER INFO */}
                                    <div className='mt-2 flex flex-col items-center justify-center gap-1'>
                                        <h2 className='text-base font-medium text-prussian-blue-700 dark:text-prussian-blue-300 sm:text-xl'>
                                            {member.data.userName}
                                        </h2>
                                        <span className='text-xs text-gray-500 dark:text-slate-300'>
                                            {t(LANGUAGE.JOIN_DATE)}:{' '}
                                            <b>{moment(member.data._createdAt).format(DATE_FORMAT.TIME_DATE)}</b>
                                        </span>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </Transaction>
    )
}

export default MemberDetail
