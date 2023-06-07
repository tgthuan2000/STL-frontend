import moment from 'moment'
import { useTranslation } from 'react-i18next'
import { Image, Tabs, Transaction } from '~/components'
import { DATE_FORMAT } from '~/constant'
import { useWindowSize } from '~/hook'
import LANGUAGE from '~/i18n/language/key'
import { useProfile } from '~/store/auth'
import useProfileTab from '../hook/useProfileTab'

const Dashboard = () => {
    const { t } = useTranslation()
    const { userProfile } = useProfile()
    const { width } = useWindowSize()
    const tabs = useProfileTab()

    return (
        <Transaction title={t(LANGUAGE.PROFILE_MANAGEMENT)} hasBack={width > 768}>
            <div className='relative mx-auto mt-20 w-full max-w-7xl'>
                {/* IMAGE */}
                <div className='absolute bottom-full left-1/2 z-[1] -mb-12 -translate-x-1/2 select-none sm:-mb-14'>
                    <Image
                        src={userProfile?.image}
                        avatar={{ roundFull: true, size: 'custom' }}
                        className='mx-auto h-28 w-28 border-2 object-cover shadow-lg dark:border-slate-700 sm:h-32 sm:w-32'
                    />
                </div>
                {/* MAIN */}
                <div className='relative -mx-4 select-none bg-white py-12 shadow-lg dark:bg-slate-800 sm:min-h-[calc(100vh-250px)] sm:rounded-lg sm:pt-14'>
                    {/* TOOLS */}
                    {/* <PermissionCheck permissions={[PERMISSION.PROFILE_WRITE]} fallback={<></>}>
                        <div className='absolute bottom-[calc(100%+12px)] right-2'>
                            <Button
                                type='button'
                                color='custom'
                                className='inline-flex min-w-0 items-center justify-center gap-1 rounded-lg border bg-gray-200 text-gray-700 shadow transition-all hover:bg-gray-700 hover:text-white dark:border-slate-700 dark:bg-slate-700 dark:text-slate-200 dark:hover:opacity-50 sm:gap-2'
                            >
                                <PencilSquareIcon className='h-4 w-4' /> <span>{t(LANGUAGE.UPDATE)}</span>
                            </Button>
                        </div>
                    </PermissionCheck> */}
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

                    <Tabs options={tabs} className='mt-10 px-0 sm:px-6' />
                </div>
            </div>
        </Transaction>
    )
}

export default Dashboard
