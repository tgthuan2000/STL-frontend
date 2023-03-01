import { CubeTransparentIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import LoadingText from '~/components/Loading/LoadingText'

const MenuItemFallback = () => {
    const { t } = useTranslation()

    return (
        <button
            type='button'
            className='group flex w-full animate-pulse items-center rounded-md px-2 py-2 text-sm'
            disabled
        >
            <CubeTransparentIcon className='mr-2 h-5 w-5' />
            <LoadingText />
        </button>
    )
}

export default MenuItemFallback
