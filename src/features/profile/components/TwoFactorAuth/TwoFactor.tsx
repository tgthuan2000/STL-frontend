import React, { useEffect, useId, useState } from 'react'
import { useTranslation } from 'react-i18next'
import axios from '~/axiosConfig'
import LANGUAGE from '~/i18n/language/key'
import TwoFactorForm from './Form'
import TwoFactorImage from './Image'

interface TwoFactorProps {
    onClose: () => void
}

const TwoFactor: React.FC<TwoFactorProps> = ({ onClose }) => {
    const { t } = useTranslation()
    const id = useId()
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const { data } = await axios.get('/auth/2fa')
            setData(data)
            try {
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const handleSubmit = async (data: { value: string }) => {
        try {
        } catch (error) {
            console.log(error)
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
                <div className='h-48 w-48 overflow-hidden rounded-md'>
                    <TwoFactorImage data={data} loading={loading} />
                </div>
                <TwoFactorForm id={id} onSubmit={handleSubmit} />
            </div>
            {/* Footer */}
            <div className='flex-shrink-0 select-none'>
                <div className=' flex justify-end gap-3'>
                    <button type='submit' form={id} className='font-medium text-pink-500 hover:opacity-50'>
                        {t(LANGUAGE.SAVE)}
                    </button>
                    <button type='button' className='text-gray-400 hover:opacity-50' onClick={onClose}>
                        {t(LANGUAGE.CANCEL)}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TwoFactor
