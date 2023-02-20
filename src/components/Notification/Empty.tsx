import { useTranslation } from 'react-i18next'
import EmptyNotifyGif from '~/assets/loading.gif'
import LANGUAGE from '~/i18n/language/key'

const EmptyNotify = () => {
    const { t } = useTranslation()
    return (
        <div className='flex flex-col items-center justify-center gap-2 py-10 text-lg font-medium'>
            <img src={EmptyNotifyGif} className='h-28' />
            {t(LANGUAGE.EMPTY_NOTIFY)}
        </div>
    )
}

export default EmptyNotify
