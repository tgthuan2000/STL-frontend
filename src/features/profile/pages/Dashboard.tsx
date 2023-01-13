import { PencilAltIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import moment from 'moment'
import { Button, Image, Transaction } from '~/components'
import { DATE_FORMAT } from '~/constant'
import useAuth from '~/store/auth'

const Dashboard = () => {
    const { userProfile } = useAuth()
    return (
        <Transaction title='Thông tin cá nhân'>
            <div className='relative mt-20 max-w-7xl mx-auto w-full'>
                {/* IMAGE */}
                <div className='absolute z-[1] bottom-full left-1/2 -translate-x-1/2 -mb-12 sm:-mb-14 select-none'>
                    <Image
                        src={userProfile?.image}
                        size='custom'
                        className='mx-auto h-28 sm:h-32 w-28 sm:w-32 border-2 shadow-lg'
                    />
                </div>
                {/* MAIN */}
                <div className='relative sm:p-5 p-3 min-h-screen bg-white rounded-lg shadow-lg pt-12 sm:pt-14 select-none'>
                    {/* TOOLS */}
                    <div className='absolute bottom-[calc(100%+12px)] right-2'>
                        <Button
                            type='button'
                            color='primary'
                            className='rounded-lg bg-gray-200 inline-flex shadow border justify-center items-center hover:bg-gray-700 transition-all text-gray-700 hover:text-white'
                        >
                            <PencilAltIcon className='h-4 w-4' /> Cập nhật
                        </Button>
                    </div>
                    {/* USER INFO */}
                    <div className='mt-2 flex flex-col justify-center items-center gap-1'>
                        <h2 className='text-base sm:text-xl font-medium text-prussian-blue-700'>
                            {userProfile?.userName}
                        </h2>
                        <p className='text-xs sm:text-sm text-gray-500'>{userProfile?.email}</p>
                        <span className='text-xs text-gray-500'>
                            Ngày tham gia: <b>{moment(userProfile?._createdAt).format(DATE_FORMAT.TIME_DATE)}</b>
                        </span>
                    </div>
                    {/* DASHBOARD */}
                    <div className='mt-2 sm:mt-5 space-y-2'>
                        <ProfileInfoGroup title='Phương thức thanh toán' className='grid grid-cols-2 gap-2'>
                            <button className='relative px-2 pt-6 pb-2 bg-slate-200 rounded-md'>
                                <label className='absolute top-1 left-1 text-xs font-normal text-gray-700'>
                                    Được sử dụng nhiều nhất
                                </label>
                                <p>Data</p>
                            </button>
                            <button className='relative px-2 pt-6 pb-2 bg-slate-200 rounded-md'>
                                <label className='absolute top-1 left-1 text-xs font-normal text-gray-700'>
                                    Được sử dụng nhiều nhất
                                </label>
                                <p>Data</p>
                            </button>
                            <button className='relative px-2 pt-6 pb-2 bg-slate-200 rounded-md'>
                                <label className='absolute top-1 left-1 text-xs font-normal text-gray-700'>
                                    Được sử dụng nhiều nhất
                                </label>
                                <p>Data</p>
                            </button>
                        </ProfileInfoGroup>
                    </div>
                </div>
            </div>
        </Transaction>
    )
}

export default Dashboard

interface ProfileInfoGroupProps {
    title: string
    children: React.ReactNode
    className?: string
}

const ProfileInfoGroup: React.FC<ProfileInfoGroupProps> = ({ title, children, className }) => {
    return (
        <div>
            <h4 className='text-gray-700 font-normal'>{title}</h4>
            <hr />
            <div className={clsx('pt-1', className)}>{children}</div>
        </div>
    )
}
