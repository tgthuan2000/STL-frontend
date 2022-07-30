import { RefreshIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import LoadingButton from '~/components/Loading/LoadingButton'

const Title = ({ title, onReload, loading }: { title?: string; onReload?: () => void; loading?: boolean }) => {
    if (!title) return null
    return (
        <div className='flex justify-between items-center border-b border-gray-200 bg-gray-50 px-4 py-2'>
            <h4 className={clsx('text-base font-medium text-gray-500', { 'animate-pulse': loading })}>
                {loading ? 'Đang tải... ' : title}
            </h4>
            {onReload && <LoadingButton onReload={onReload} disabled={loading} />}
        </div>
    )
}

export default Title
