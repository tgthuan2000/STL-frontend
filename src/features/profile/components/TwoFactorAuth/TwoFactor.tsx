import { useAutoAnimate } from '@formkit/auto-animate/react'
import { googleLogout } from '@react-oauth/google'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import axios from '~/axiosConfig'
import { TwoFactorForm } from '~/components'
import { useLoading } from '~/context'
import LANGUAGE from '~/i18n/language/key'
import { useAuth, useProfile } from '~/store/auth'
import TwoFactorImage from './Image'

interface TwoFactorProps {
    onClose: () => void
}

const TwoFactor: React.FC<TwoFactorProps> = ({ onClose }) => {
    const { t } = useTranslation()
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState('')
    const [imageRef] = useAutoAnimate<HTMLDivElement>()
    const { setSubmitLoading } = useLoading()
    const { removeToken } = useAuth()
    const { removeUserProfile } = useProfile()

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const data = (await axios.get('/auth/2fa')) as { qrImage: string }
            setData(data.qrImage)
            try {
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
            const d = (await axios.post('/auth/verify-2fa', { code: data })) as { verified: boolean }
            if (d.verified) {
                onClose()
                toast.success(t(LANGUAGE.NOTIFY_TWO_FA_CODE_SUCCESS))
                removeToken()
                removeUserProfile()
                googleLogout()
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
        <div className='flex h-full flex-col'>
            {/* Header */}
            <h1 className='flex-shrink-0 select-none text-2xl font-normal sm:text-3xl'>{t(LANGUAGE.TWO_FA_SETUP)}</h1>
            {/* Content */}
            <div className='flex flex-1 flex-col items-center justify-center gap-3'>
                <h2 className='text-lg font-normal'>{t(LANGUAGE.SCAN_QR_CODE)}</h2>
                <p className='text-center text-sm'>{t(LANGUAGE.SCAN_QR_CODE_DESCRIPTION)}</p>
                <div ref={imageRef} className='my-5 h-48 w-48 overflow-hidden rounded-md'>
                    <TwoFactorImage data={data} loading={loading} />
                </div>
                <p className='text-left text-xs'>{t(LANGUAGE.SCAN_QR_CODE_DESCRIPTION_2)}</p>
                <TwoFactorForm onSubmit={handleSubmit} />
            </div>
            {/* Footer */}
            <div className='flex-shrink-0 select-none'>
                <div className='flex justify-end gap-2'>
                    {/* <button
                        type='submit'
                        form={id}
                        disabled={loading}
                        className='py-1 px-2 font-medium text-pink-500 hover:opacity-50 disabled:opacity-50 sm:text-base'
                    >
                        {t(LANGUAGE.SAVE)}
                    </button> */}
                    <button
                        type='button'
                        className='py-1 px-2 text-gray-400 hover:opacity-50 sm:text-base'
                        onClick={onClose}
                    >
                        {t(LANGUAGE.CANCEL)}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TwoFactor
