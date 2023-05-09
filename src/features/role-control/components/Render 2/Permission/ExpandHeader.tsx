import { ChevronUpIcon, PlusIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import React from 'react'
import LoadingText from '~/components/Loading/LoadingText'
import { useDetailDialog } from '~/context'
import ExpandButton from './ExpandButton'

const Content = React.lazy(() => import('./Content'))

interface ExpandHeaderProps {
    onExpand?: (expand: boolean) => void
    expand?: boolean
    label: string
    id: string
    numberChecked?: number | string
}

const ExpandHeader: React.FC<ExpandHeaderProps> = (props) => {
    const { onExpand, id, expand, label, numberChecked } = props
    const { set } = useDetailDialog()

    const toggleExpand = () => {
        onExpand?.(!expand)
    }

    const handleCreatePermission: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation()
        set({
            title: label,
            content: <Content groupId={id} />,
            fallback: <LoadingText />,
        })
    }

    return (
        <div
            className={clsx(
                'group flex cursor-pointer select-none items-center justify-between rounded-xl p-2 transition hover:bg-gray-200 dark:text-slate-300 dark:hover:bg-slate-700',
                { 'bg-gray-200 dark:bg-slate-700': expand }
            )}
            onClick={toggleExpand}
        >
            <h4 className='text-sm font-normal sm:text-base'>{label}</h4>
            <div className='flex items-center gap-2'>
                <ExpandButton expand={expand} Icon={PlusIcon} onClick={handleCreatePermission} />
                <ExpandButton expand={expand} className={clsx({ '-rotate-180': expand })} Icon={ChevronUpIcon} />
                <span>{numberChecked}</span>
            </div>
        </div>
    )
}

export default ExpandHeader
