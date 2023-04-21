import { cloneDeep, isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { ListOptionProps } from '~/@types/spending'
import LANGUAGE from '~/i18n/language/key'
import { client } from '~/sanityConfig'
import { MethodSkeleton } from '../Method'
import Item from './Item'

const ListOption: React.FC<ListOptionProps> = ({ data: _data, loading, cleanCache, renderItem }) => {
    const { t } = useTranslation()
    const [data, setData] = useState(_data)

    useEffect(() => {
        if (!isEmpty(_data)) {
            setData(_data)
        }
    }, [_data])

    const _set = (id: string, value: {}) => {
        setData((prev) => {
            const temp = cloneDeep(prev)
            const index = prev?.findIndex((item) => item._id === id)
            if (index !== undefined && index !== -1 && temp) {
                temp[index] = {
                    ...temp[index],
                    ...value,
                }
            }
            return temp
        })
    }

    const _update = async (id: string, value: { [x: string]: any }) => {
        const response = await client.patch(id).set(value).commit()
        return response
    }

    const handleEdit = async (data: any, id: string) => {
        {
            try {
                const response = await _update(id, { name: data.name })
                _set(id, { name: response.name })
                cleanCache()
            } catch (error: any) {
                toast.error(error.message)
            }
        }
    }

    const handleDisplayChange = async (display: boolean, id: string) => {
        try {
            const response = await _update(id, { display: !display })
            _set(id, { display: response.display })
            cleanCache()
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    if (loading) return <MethodSkeleton />

    if (!isEmpty(data)) {
        return (
            <ul role='list' className='text-gray-900 dark:text-slate-200'>
                {data?.map((item) => {
                    return (
                        <Item
                            key={item._id}
                            data={item}
                            origin={data}
                            onEdit={async (data) => await handleEdit(data, item._id)}
                            renderItem={() => renderItem(item)}
                            onDisplayChange={async () => await handleDisplayChange(item.display, item._id)}
                        />
                    )
                })}
            </ul>
        )
    }
    return <div className='py-2 text-center text-gray-700 dark:text-slate-200'>{t(LANGUAGE.EMPTY_DATA)}</div>
}

export default ListOption
