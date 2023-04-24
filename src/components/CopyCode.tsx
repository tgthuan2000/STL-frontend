import { CheckIcon, Square2StackIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import LANGUAGE from '~/i18n/language/key'
import AnimateWrap from './AnimateWrap'

interface CopyCodeProps {
    data: string
    loading?: boolean
}

const CopyCode: React.FC<CopyCodeProps> = ({ data, loading }) => {
    const { t } = useTranslation()
    const [copied, setCopied] = useState(false)

    const handleCopyToClipboard = async () => {
        await navigator.clipboard.writeText(data)
        setCopied(true)
    }

    useEffect(() => {
        let timeout: NodeJS.Timeout | null = null
        if (copied) {
            timeout = setTimeout(() => {
                setCopied(false)
            }, 3000)
        }
        return () => {
            if (timeout) {
                clearTimeout(timeout)
            }
        }
    }, [copied])

    return (
        <AnimateWrap className='flex items-center gap-2'>
            {loading ? (
                t(LANGUAGE.LOADING)
            ) : (
                <>
                    <p>{data}</p>
                    {copied ? (
                        <CheckIcon className='h-6 w-6 text-green-500' />
                    ) : (
                        <Square2StackIcon
                            className='h-6 w-6 cursor-pointer hover:opacity-50'
                            onClick={handleCopyToClipboard}
                        />
                    )}
                </>
            )}
        </AnimateWrap>
    )
}

export default CopyCode
