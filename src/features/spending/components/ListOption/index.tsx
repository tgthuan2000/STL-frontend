import { ArchiveBoxXMarkIcon } from '@heroicons/react/24/outline'
import { isEmpty } from 'lodash'
import React, { startTransition, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { ListOptionProps } from '~/@types/spending'
import Atom from '~/components/_atomic/Atom'
import { useTDF } from '~/hook'
import LANGUAGE from '~/i18n/language/key'
import { client } from '~/sanityConfig'
import Item from './Item'

interface Params {
    id: string
    display: boolean
}

const ListOption: React.FC<ListOptionProps> = ({ data: _data, loading, cleanCache, renderItem }) => {
    const { t } = useTranslation()
    const [data, setData] = useState(_data)
    const _ = useRef<Params[]>([])
    const displayChange = useTDF<Params>((transaction, params) => {
        const { id, display } = params

        const patch = client.patch(id).set({ display: !display })
        transaction.patch(patch)
        _.current.push({ id, display: !display })

        const commit = () => transaction.commit()

        const resolved = () => {
            startTransition(() => {
                _.current.forEach(({ id, display }) => {
                    _set(id, { display })
                })
            })

            _.current = []
            cleanCache()
        }

        const error = (err: any) => {
            toast.error(err.message)
        }

        return { commit, resolved, error }
    }, 700)

    useEffect(() => {
        if (!isEmpty(_data)) {
            setData(_data)
        }
    }, [_data])

    const _set = (id: string, value: {}) => {
        setData((prev) => {
            const temp = structuredClone(prev)
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

    const handleEdit = async (data: any, id: string) => {
        {
            try {
                const response = await client.patch(id).set({ name: data.name }).commit()
                _set(id, { name: response.name })
                cleanCache()
            } catch (error: any) {
                toast.error(error.message)
            }
        }
    }

    if (loading) return <Atom.SimpleListSkeleton />

    if (!isEmpty(data)) {
        return (
            <ul role='list' className='text-gray-900 dark:text-slate-200'>
                {Array.isArray(data) &&
                    data?.map((item) => {
                        return (
                            <Item
                                key={item._id}
                                data={item}
                                origin={data}
                                onEdit={(data) => handleEdit(data, item._id)}
                                renderItem={() => renderItem(item)}
                                onDisplayChange={() => displayChange({ id: item._id, display: item.display })}
                            />
                        )
                    })}
            </ul>
        )
    }
    return <Atom.EmptyList icon={ArchiveBoxXMarkIcon} text={t(LANGUAGE.EMPTY_DATA)} />
}

export default ListOption
