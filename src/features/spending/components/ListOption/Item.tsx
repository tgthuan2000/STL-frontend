import { useAutoAnimate } from '@formkit/auto-animate/react'
import { ArrowPathIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Chip } from '~/components'
import LANGUAGE from '~/i18n/language/key'
import EditForm from './EditForm'

interface ItemOptionProps {
    data: any
    origin: any[]
    onEdit: (data: any) => Promise<void>
    renderItem: () => React.ReactNode
    onDisplayChange: () => Promise<void>
}

const Item: React.FC<ItemOptionProps> = ({ data, origin, onEdit, renderItem, onDisplayChange }) => {
    const { t } = useTranslation()
    const [displayLoading, setDisplayLoading] = useState(false)
    const [parent] = useAutoAnimate<HTMLLIElement>()
    const [edit, setEdit] = useState(false)

    const openEdit = () => {
        setEdit(true)
    }
    const closeEdit = () => {
        setEdit(false)
    }

    const handleDisplayChange = async () => {
        setDisplayLoading(true)
        await onDisplayChange()
        setDisplayLoading(false)
    }

    return (
        <li ref={parent}>
            <div className='flex items-center justify-between gap-2 py-3 px-3 hover:opacity-70'>
                <div className='overflow-hidden'>{renderItem()}</div>
                <div className='flex flex-shrink-0 justify-end gap-1'>
                    <Chip
                        className={clsx('text-white', {
                            'bg-radical-red-500': data?.display,
                            'bg-green-500': !data?.display,
                            'pointer-events-none opacity-70': displayLoading,
                        })}
                        onClick={handleDisplayChange}
                    >
                        {displayLoading ? (
                            <div>
                                <ArrowPathIcon className='h-3.5 w-3.5 animate-spin text-white' />
                            </div>
                        ) : (
                            <>{data?.display ? t(LANGUAGE.HIDDEN) : t(LANGUAGE.SHOW)}</>
                        )}
                    </Chip>
                    {!edit && (
                        <Chip className='bg-cyan-500 text-white' onClick={openEdit}>
                            {t(LANGUAGE.EDIT)}
                        </Chip>
                    )}
                </div>
            </div>
            {edit && <EditForm name={data?.name} origin={origin} onCancel={closeEdit} onSubmit={onEdit} />}
        </li>
    )
}

export default Item
