import { useAutoAnimate } from '@formkit/auto-animate/react'
import { TrashIcon } from '@heroicons/react/outline'
import { yupResolver } from '@hookform/resolvers/yup'
import clsx from 'clsx'
import { isEmpty } from 'lodash'
import { useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { IUserProfile } from '~/@types/auth'
import { DraftNotify, NotifyAssignForm } from '~/@types/notify'
import { LazySearchSelect } from '~/components'
import { Toggle } from '~/components/_base'
import { UserSvg } from '~/components/_constant'
import { COUNT_PAGINATE, TAGS } from '~/constant'
import { LOCAL_STORAGE_KEY } from '~/constant/localStorage'
import { TEMPLATE } from '~/constant/template'
import { useLocalStorage } from '~/hook'
import useQuery, { ParamsTypeUseQuery, QueryTypeUseQuery, TagsTypeUseQuery } from '~/hook/useQuery'
import { SEARCH_USER_PAGINATE } from '~/schema/query/user'

interface CreateStep3Props {
    id: string
    onSubmit: (data: NotifyAssignForm) => void
}
export interface QueryData {
    users: {
        data: IUserProfile[]
        hasNextPage: boolean
    }
}

const schema = yup.object().shape({
    search: yup.object().nullable(),
    users: yup
        .array()
        .nullable()
        .when('sendAll', {
            is: false,
            then: yup.array().min(1, 'Vui lòng chọn ít nhất 1 người nhận'),
        }),
    sendAll: yup.boolean(),
})

const Step3: React.FC<CreateStep3Props> = ({ id, onSubmit }) => {
    const [draftNotify] = useLocalStorage<DraftNotify>(LOCAL_STORAGE_KEY.STL_DRAFT_NOTIFY)
    const [userRef] = useAutoAnimate<HTMLDivElement>()

    const [{ query, params, tags }, setQuery] = useState<{
        query: QueryTypeUseQuery<QueryData>
        params: ParamsTypeUseQuery
        tags: TagsTypeUseQuery<QueryData>
    }>({
        query: { users: SEARCH_USER_PAGINATE },
        params: { search: '', __fromUser: 0, __toUser: COUNT_PAGINATE },
        tags: { users: TAGS.SHORT },
    })

    const searchFirst = useRef(false)
    const [{ users }, , , reload] = useQuery<QueryData>(query, params, tags)
    const form = useForm<NotifyAssignForm>({
        defaultValues: { users: draftNotify?.users ?? [], sendAll: draftNotify?.sendAll ?? false },
        resolver: yupResolver(schema),
    })
    const handleSubmit = async (data: NotifyAssignForm) => {
        onSubmit(data)
    }

    const __users = form.watch('users')

    const handleChange = (data: any) => {
        if (data) {
            if (!__users.find((u) => u._id === data._id)) {
                form.setValue('users', [...__users, data])
            } else {
                form.setValue(
                    'users',
                    __users.filter((u) => u._id !== data._id)
                )
            }
        }
    }

    const handleSearch = (search: string) => {
        if (!searchFirst.current) {
            searchFirst.current = true
        }
        setQuery((prev) => ({
            ...prev,
            params: {
                ...prev.params,
                search: '*' + search + '*',
            },
        }))

        reload()
    }

    const handleScrollGetMore = () => {
        const length = users?.data?.data.length

        if (length) {
            setQuery((prev) => ({
                ...prev,
                params: { ...prev.params, __fromUsers: length, __toUsers: length + COUNT_PAGINATE },
            }))
            reload('users')
        }
    }

    return (
        <form id={id} onSubmit={form.handleSubmit(handleSubmit)} className='flex h-full flex-col'>
            <div className='space-y-5 mb-5'>
                <div className='mt-3'>
                    <Toggle form={form} name='sendAll' label='Gửi cho tất cả mọi người' />
                </div>
                <LazySearchSelect
                    options={users.data?.data}
                    autoFocus
                    hasNextPage={users.data?.hasNextPage}
                    loading={searchFirst.current ? users.loading : false}
                    label='Tìm kiếm'
                    disabled={form.watch('sendAll')}
                    onChange={handleChange}
                    onSearch={handleSearch}
                    onGetMore={handleScrollGetMore}
                    getOptionLabel={(option, active) => {
                        return (
                            <div className='flex items-center gap-2'>
                                {option.image ? (
                                    <img src={option.image} alt={option.userName} className='h-8 w-8 rounded-full' />
                                ) : (
                                    <span className='inline-block h-8 w-8 rounded-full overflow-hidden bg-gray-100'>
                                        <UserSvg />
                                    </span>
                                )}
                                <div className='flex-1'>
                                    <p
                                        className={clsx(
                                            'font-medium truncate',
                                            active ? 'text-white' : 'text-gray-900'
                                        )}
                                    >
                                        {option.userName}
                                    </p>
                                    <small
                                        className={clsx(
                                            'font-normal truncate block',
                                            active ? 'text-white' : 'text-gray-500'
                                        )}
                                    >
                                        {option.email}
                                    </small>
                                </div>
                            </div>
                        )
                    }}
                />

                <div>
                    <p className='inline-block text-sm font-medium text-gray-700'>Danh sách người nhận thông báo</p>
                    <div className='mt-1 select-none border rounded-lg' ref={userRef}>
                        {isEmpty(__users) ? (
                            <p className='px-4 py-2 text-center'>{TEMPLATE.EMPTY_DATA}</p>
                        ) : (
                            __users.map((user) => (
                                <div key={user._id} className='px-4 py-2 flex gap-2 items-center'>
                                    {user.image ? (
                                        <img
                                            src={user.image}
                                            alt={user.userName}
                                            className='h-8 w-8 rounded-full flex-shrink-0 object-cover'
                                        />
                                    ) : (
                                        <div className='h-8 w-8 rounded-full overflow-hidden flex-shrink-0 bg-gray-400'>
                                            <UserSvg />
                                        </div>
                                    )}
                                    <div className='flex-1'>
                                        <p className='font-medium text-gray-900 truncate'>{user.userName}</p>
                                        <small className='font-normal text-gray-500 truncate block'>{user.email}</small>
                                    </div>
                                    <button
                                        className='p-2 bg-slate-100 hover:bg-slate-200 disabled:hover:bg-slate-100 disabled:cursor-not-allowed group transition-all rounded-lg cursor-pointer'
                                        onClick={() => {
                                            form.setValue(
                                                'users',
                                                __users.filter((u) => u._id !== user._id)
                                            )
                                        }}
                                        disabled={form.watch('sendAll')}
                                        type='button'
                                    >
                                        <TrashIcon className='h-5 text-radical-red-500 group-disabled:text-gray-500' />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                    <Controller
                        name='users'
                        control={form.control}
                        render={({ fieldState: { error } }) =>
                            error ? <p className='text-sm text-red-500'>{error.message}</p> : <></>
                        }
                    />
                </div>
            </div>
        </form>
    )
}

export default Step3
