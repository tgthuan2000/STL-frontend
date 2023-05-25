import { ComputerDesktopIcon, DevicePhoneMobileIcon, DeviceTabletIcon } from '@heroicons/react/24/outline'
import DeviceDetector from 'device-detector-js'
import moment from 'moment'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { Button, Paper, Transaction } from '~/components'
import LoadingButton from '~/components/Loading/LoadingButton'
import { DATE_FORMAT, TAGS } from '~/constant'
import { useLoading } from '~/context'
import { useAxios, useQuery } from '~/hook'
import LANGUAGE from '~/i18n/language/key'
import { GET_USER_DEVICE } from '~/schema/query/setting'
import { useAuth, useProfile } from '~/store/auth'

const deviceDetector = new DeviceDetector()

interface RefreshToken {
    _id: string
    _createdAt: string
    device: string
    lastAccess: string
    thisDevice: boolean
}

interface QueryData {
    device: RefreshToken[]
}

const Device = () => {
    const { t } = useTranslation()
    const { userProfile } = useProfile()
    const axios = useAxios()
    const { setSubmitLoading } = useLoading()
    const { refreshToken } = useAuth()

    const [{ device }, fetchData, deleteCache, reloadData] = useQuery<QueryData>(
        { device: GET_USER_DEVICE },
        { userId: userProfile?._id as string, token: refreshToken },
        { device: TAGS.ALTERNATE }
    )

    useEffect(() => {
        fetchData()
    }, [])

    const reload = () => {
        deleteCache('device')
        reloadData()
    }

    const handleRevoke = async (tokenId: string) => {
        if (!window.confirm(t(LANGUAGE.CONFIRM_DELETE_DEVICE) as string)) {
            return
        }
        try {
            setSubmitLoading(true)
            await axios.post('/auth/revoke-token', { tokenId })
            toast.success<string>(t(LANGUAGE.NOTIFY_DELETE_SUCCESS))
            reload()
        } catch (error: any) {
            console.log(error)
        } finally {
            setSubmitLoading(false)
        }
    }

    return (
        <Transaction title={t(LANGUAGE.DEVICE_CONTROL)}>
            <Paper className='mt-5 text-gray-900 dark:text-slate-200'>
                <div className='mx-auto w-full max-w-4xl lg:py-5'>
                    <div className='mb-4 flex justify-end'>
                        <LoadingButton onReload={reload} disabled={device.loading} />
                    </div>
                    <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
                        {Array.isArray(device.data) &&
                            device.data?.map((item) => {
                                return <Item key={item._id} data={item} onRevokeClick={() => handleRevoke(item._id)} />
                            })}
                    </div>
                </div>
            </Paper>
        </Transaction>
    )
}

interface ItemProps {
    data: RefreshToken
    onRevokeClick: () => void
}

const Item: React.FC<ItemProps> = (props) => {
    const { data, onRevokeClick } = props
    const { t } = useTranslation()

    const deviceData = useMemo(() => {
        const { bot, client, device, os } = deviceDetector.parse(data.device)

        const getImage = (name: string | undefined) => {
            if (name?.includes('Mobile')) {
                return DevicePhoneMobileIcon
            }
            if (name?.includes('Tablet')) {
                return DeviceTabletIcon
            }

            return ComputerDesktopIcon
        }
        return {
            Image: getImage(client?.name),
            name: client?.name + ' - ' + os?.name,
        }
    }, [])

    return (
        <div className='relative flex gap-4 rounded bg-gray-100 p-4 dark:bg-slate-700 sm:rounded-xl'>
            <div className='flex-shrink-0'>
                <deviceData.Image className='w-20 text-gray-500 dark:text-slate-300' />
            </div>
            <div className='flex flex-col gap-1.5'>
                <h4 className='text-base font-normal dark:text-cyan-400 lg:text-lg'>{deviceData.name}</h4>
                <div className='flex flex-wrap gap-y-2 gap-x-4'>
                    <span>
                        {t(LANGUAGE.FIRST_LOGIN)} <br />
                        {moment(data._createdAt).format(DATE_FORMAT.TIME_DATE)}
                    </span>
                    <span>
                        {t(LANGUAGE.LAST_ACCESS)} <br />
                        {moment(data.lastAccess).format(DATE_FORMAT.TIME_DATE)}
                    </span>
                </div>
                <div className='flex gap-2'>
                    {!data.thisDevice && (
                        <Button type='button' color='cyan' onClick={onRevokeClick}>
                            {t(LANGUAGE.LOGOUT)}
                        </Button>
                    )}
                </div>
            </div>

            {data.thisDevice && (
                <div className='absolute right-3 top-1 sm:top-2'>
                    <span className='text-xs font-normal text-prussian-blue-400 dark:text-orange-500'>
                        {t(LANGUAGE.THIS_DEVICE)}
                    </span>
                </div>
            )}
        </div>
    )
}

export default Device
