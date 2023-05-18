import moment from 'moment'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { DATE_FORMAT } from '~/constant'
import LANGUAGE from '~/i18n/language/key'

interface Props {
    current: Date
}

const EventListShowMoreTitle: React.FC<Props> = (props) => {
    const { current } = props
    const { t } = useTranslation()

    return (
        <div className='flex flex-col gap-1'>
            <h4 className='text-lg leading-none'>{t(LANGUAGE.EVENT_LIST)}</h4>
            <span className='text-xs font-light'>{moment(current).format(DATE_FORMAT.D_DATE)}</span>
        </div>
    )
}

export default EventListShowMoreTitle
