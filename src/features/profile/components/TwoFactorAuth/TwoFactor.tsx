import QRCode from 'qrcode'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { AnimateWrap, Button, CopyCode, TwoFactorForm } from '~/components'
import { useLoading } from '~/context'
import { useAxios, useLogout } from '~/hook'
import LANGUAGE from '~/i18n/language/key'
import TwoFactorImage from './Image'

interface TwoFactorProps {
    onClose: () => void
}

const TwoFactor: React.FC<TwoFactorProps> = ({ onClose }) => {
    const { t } = useTranslation()
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState('')
    const [secret, setSecret] = useState('')
    const { setSubmitLoading } = useLoading()
    const logout = useLogout()
    const axios = useAxios()

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const { data } = await axios.get<{ otpAuthUrl: string; secret: string }>('/auth/2fa')

                if (data?.otpAuthUrl) {
                    const image = await QRCode.toDataURL(data.otpAuthUrl)
                    setData(image)
                    setSecret(data.secret)
                }
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const handleSubmit = async (data: string) => {
        try {
            setSubmitLoading(true)
            const { data: _data } = await axios.post<{ verified: boolean }>('/auth/verify-2fa', { code: data })
            if (_data?.verified) {
                onClose()
                toast.success(t(LANGUAGE.NOTIFY_TWO_FA_CODE_SUCCESS))
                await logout()
            } else {
                toast.error(t(LANGUAGE.NOTIFY_TWO_FA_CODE_INVALID))
            }
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitLoading(false)
        }
    }

    return (
        <div className='flex h-full flex-col text-gray-900 dark:text-slate-200'>
            <div className='flex-1 overflow-y-auto overflow-x-hidden p-8'>
                <div className='flex flex-col items-center justify-center gap-5'>
                    <h2 className='text-lg font-normal'>{t(LANGUAGE.SCAN_QR_CODE)}</h2>
                    <p className='text-center text-sm'>{t(LANGUAGE.SCAN_QR_CODE_DESCRIPTION)}</p>
                    <AnimateWrap className='h-52 w-52 overflow-hidden'>
                        <TwoFactorImage data={data} loading={loading} />
                    </AnimateWrap>
                    <span className='text-center text-lg font-medium'>{t(LANGUAGE.OR)}</span>
                    <span>{t(LANGUAGE.SCAN_QR_CODE_DESCRIPTION_3)}</span>
                    <span className='overflow-hidden rounded-md bg-gray-200 py-2 px-4 text-base font-normal dark:bg-slate-700'>
                        <CopyCode data={secret} loading={loading} />
                    </span>
                    <p className='text-left text-sm'>{t(LANGUAGE.SCAN_QR_CODE_DESCRIPTION_2)}</p>
                    <TwoFactorForm onSubmit={handleSubmit} />
                </div>
            </div>
            <div className='mt-10 flex-shrink-0 select-none'>
                <div className='flex justify-end gap-2 p-5'>
                    <Button
                        type='button'
                        color='custom'
                        className='border-none py-1 px-2 text-gray-400 hover:opacity-50 sm:text-base'
                        onClick={onClose}
                    >
                        {t(LANGUAGE.CANCEL)}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default TwoFactor
