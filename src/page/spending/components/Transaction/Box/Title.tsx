import { RefreshIcon } from '@heroicons/react/outline'
import clsx from 'clsx'

const Title = ({ title, onReload, loading }: { title?: string; onReload?: () => void; loading?: boolean }) => {
    if (!title) return null
    return (
        <div className='flex justify-between items-center border-b border-gray-200 bg-gray-50 px-4 py-2'>
            <h4 className={clsx('text-base font-medium text-gray-500', { 'animate-pulse': loading })}>
                {loading ? 'Đang tải... ' : title}
            </h4>
            {onReload && (
                <button
                    type='button'
                    className='cursor-pointer group disabled:cursor-wait disabled:animate-spin -scale-100'
                    onClick={onReload}
                    disabled={loading}
                    title='Tải lại'
                >
                    <RefreshIcon className='h-4 w-4 text-gray-500 group-hover:text-gray-400 group-disabled:text-gray-300' />
                </button>
            )}
        </div>
    )
}

export default Title
