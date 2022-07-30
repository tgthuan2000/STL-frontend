import { RefreshIcon } from '@heroicons/react/outline'

interface LoadingButtonProps {
    onReload: () => void
    disabled: boolean | undefined
}

const LoadingButton = ({ onReload, disabled }: LoadingButtonProps) => {
    return (
        <button
            type='button'
            className='cursor-pointer group disabled:cursor-wait disabled:animate-spin -scale-100'
            onClick={onReload}
            disabled={disabled}
            title='Tải lại'
        >
            <RefreshIcon className='h-4 w-4 text-gray-500 group-hover:text-gray-400 group-disabled:text-gray-300' />
        </button>
    )
}

export default LoadingButton
