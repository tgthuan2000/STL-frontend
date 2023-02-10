import { useTranslation } from 'react-i18next'
import EmptyNotifyGif from '~/assets/loading.gif'
import LANGUAGE from '~/i18n/language/key'

const EmptyNotify = () => {
    const { t } = useTranslation()
    return (
        <div className='py-10 font-medium text-lg flex flex-col gap-2 items-center justify-center'>
            <img src={EmptyNotifyGif} className='h-28' />
            {t(LANGUAGE.EMPTY_NOTIFY)}
        </div>
    )
}

export default EmptyNotify
