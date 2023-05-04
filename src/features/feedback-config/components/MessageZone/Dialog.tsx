import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { useDetailDialog } from '~/context'
import LANGUAGE from '~/i18n/language/key'
import { FEEDBACK_PARAM } from '../../pages/Dashboard'

interface DialogProps {
    children: React.ReactNode
}

const Dialog: React.FC<DialogProps> = (props) => {
    const { children } = props
    const { t } = useTranslation()
    const [searchParams, setSearchParams] = useSearchParams()
    const feedbackId = searchParams.get(FEEDBACK_PARAM)
    const { set, close } = useDetailDialog()

    const handleClose = () => {
        if (feedbackId) {
            setSearchParams((prev) => {
                const prevParams = new URLSearchParams(prev)
                prevParams.delete(FEEDBACK_PARAM)
                return prevParams
            })
        }
    }

    useEffect(() => {
        if (feedbackId) {
            set({
                title: t(LANGUAGE.FEEDBACK),
                content: children,
                close: handleClose,
            })
        }
    }, [feedbackId])

    useEffect(() => {
        return () => {
            close({ cancelCallback: true })
        }
    }, [])

    return <></>
}
export default Dialog
