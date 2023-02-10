import { CubeTransparentIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import LANGUAGE from '~/i18n/language/key'

const MenuItemFallback = () => {
    const { t } = useTranslation()

    return (
        <button
            type='button'
            className='group flex w-full items-center rounded-md px-2 py-2 text-sm animate-pulse'
            disabled
        >
            <CubeTransparentIcon className='mr-2 h-5 w-5' />
            {t(LANGUAGE.LOADING)}
        </button>
    )
}

export default MenuItemFallback
