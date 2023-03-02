import { PencilSquareIcon } from '@heroicons/react/24/outline'
import moment from 'moment'
import { Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Image, PermissionCheck, Transaction } from '~/components'
import LoadingText from '~/components/Loading/LoadingText'
import { DATE_FORMAT } from '~/constant'
import { PERMISSION } from '~/constant/permission'
import { useWindowSize } from '~/hook'
import LANGUAGE from '~/i18n/language/key'
import { useProfile } from '~/store/auth'
import { AllowSendMail, Statistic, TwoFactorAuth } from '../components'

const Dashboard = () => {
    const { t } = useTranslation()
    const { userProfile } = useProfile()
    const { width } = useWindowSize()

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
                <div className='relative -mx-4 select-none bg-white py-12 shadow-lg dark:bg-slate-800 sm:min-h-[calc(100vh-250px)] sm:rounded-lg sm:pt-14'>
                    {/* TOOLS */}
                    <PermissionCheck permissions={[PERMISSION.PROFILE_WRITE]} fallback={<></>}>
                        <div className='absolute bottom-[calc(100%+12px)] right-2'>
                            <Button
                                type='button'
                                color='primary'
                                className='inline-flex min-w-0 items-center justify-center gap-1 rounded-lg border bg-gray-200 text-gray-700 shadow transition-all hover:bg-gray-700 hover:text-white dark:border-slate-700 dark:bg-slate-700 dark:text-slate-200 dark:hover:opacity-50 sm:gap-2'
                            >
                                <PencilSquareIcon className='h-4 w-4' /> <span>{t(LANGUAGE.UPDATE)}</span>
                            </Button>
                        </div>
                    </PermissionCheck>
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
                        <PermissionCheck permissions={[PERMISSION.PROFILE_RECEIVE_EMAIL]} fallback={<></>}>
                            <div className='space-y-2 px-2'>
                                <h4 className='border-b border-gray-200 pb-2 text-2xl font-normal dark:border-slate-700 sm:text-xl'>
                                    {t(LANGUAGE.EMAIL)}
                                </h4>
                                <AllowSendMail />
                            </div>
                        </PermissionCheck>
                        <div className='space-y-2 px-2'>
                            <h4 className='border-b border-gray-200 pb-2 text-2xl font-normal dark:border-slate-700 sm:text-xl'>
                                {t(LANGUAGE.SECURITY)}
                            </h4>
                            <TwoFactorAuth />
                        </div>
                    </div>
                    <Suspense fallback={<LoadingText />}>
                        <PermissionCheck permissions={[PERMISSION.PROFILE_STATISTIC]} fallback={<></>}>
                            <Statistic />
                        </PermissionCheck>
                    </Suspense>
                </div>
            </div>
        </Transaction>
    )
}

export default Dashboard
