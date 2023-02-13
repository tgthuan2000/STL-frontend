import { useAutoAnimate } from '@formkit/auto-animate/react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Chip } from '~/components'
import LANGUAGE from '~/i18n/language/key'
import EditForm from './EditForm'

interface ItemOptionProps {
    data: any
    origin: any[]
    onEdit: (data: any) => Promise<void>
}

const Item: React.FC<ItemOptionProps> = ({ data, origin, onEdit }) => {
    const { t } = useTranslation()
    const [parent] = useAutoAnimate<HTMLLIElement>()
    const [edit, setEdit] = useState(false)
    const openEdit = () => {
        setEdit(true)
    }
    const closeEdit = () => {
        setEdit(false)
    }

    return (
        <li ref={parent}>
            <div className='px-3 py-3 flex hover:bg-gray-100 dark:hover:bg-slate-600'>
                <div className='w-2/3 truncate'>
                    <h4 className='font-medium'>{data?.name}</h4>
                </div>
                <div className='w-1/3 flex gap-1 justify-end'>
                    {!edit && (
                        <Chip className='bg-cyan-500 text-white' onClick={openEdit}>
                            {t(LANGUAGE.EDIT)}
                        </Chip>
                    )}
                    <Chip className='bg-radical-red-500 text-white' disabled onClick={() => {}}>
                        {t(LANGUAGE.HIDDEN)}
                    </Chip>
                </div>
            </div>
            {edit && <EditForm name={data?.name} origin={origin} onCancel={closeEdit} onSubmit={onEdit} />}
        </li>
    )
}

export default Item
