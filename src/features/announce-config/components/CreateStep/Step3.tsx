import { useAutoAnimate } from '@formkit/auto-animate/react'
import { EnvelopeIcon, TrashIcon } from '@heroicons/react/24/outline'
import { yupResolver } from '@hookform/resolvers/yup'
import clsx from 'clsx'
import { isEmpty } from 'lodash'
import { useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import { CreateStep3Props, QueryDataStep3 } from '~/@types/announce-config'
import { ParamsTypeUseQuery, QueryTypeUseQuery, TagsTypeUseQuery } from '~/@types/hook'
import { DraftNotify, NotifyAssignForm } from '~/@types/notify'
import { Image } from '~/components'
import { LazySearchSelect, Toggle } from '~/components/_base'
import { COUNT_PAGINATE, TAGS } from '~/constant'
import { LOCAL_STORAGE_KEY } from '~/constant/localStorage'
import { useLocalStorage, useQuery } from '~/hook'
import LANGUAGE from '~/i18n/language/key'
import { SEARCH_USER_PAGINATE } from '~/schema/query/user'

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
    const { t } = useTranslation()
    const [draftNotify] = useLocalStorage<DraftNotify>(LOCAL_STORAGE_KEY.STL_DRAFT_NOTIFY)
    const [userRef] = useAutoAnimate<HTMLDivElement>()

    const [{ query, params, tags }, setQuery] = useState<{
        query: QueryTypeUseQuery<QueryDataStep3>
        params: ParamsTypeUseQuery
        tags: TagsTypeUseQuery<QueryDataStep3>
    }>({
        query: { users: SEARCH_USER_PAGINATE },
        params: { search: '', __fromUser: 0, __toUser: COUNT_PAGINATE },
        tags: { users: TAGS.SHORT },
    })

    const searchFirst = useRef(false)
    const [{ users }, , , reload] = useQuery<QueryDataStep3>(query, params, tags)
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
                form.setValue('users', [...__users, { ...data, sendMail: data.allowSendMail }])
            } else {
                form.setValue(
                    'users',
                    __users.filter((u) => u._id !== data._id)
                )
            }
        }
    }

    const handleSearch = (search: string) => {
        if (search) {
            if (!searchFirst.current) {
                searchFirst.current = true
            }
            setQuery((prev) => ({
                ...prev,
                params: {
                    ...prev.params,
                    search: '*' + search.toLowerCase() + '*',
                },
            }))

            reload()
        }
    }

    const handleScrollGetMore = () => {
        const length = users?.data?.data.length

        if (length) {
            setQuery((prev) => ({
                ...prev,
                params: { ...prev.params, __fromUser: length, __toUser: length + COUNT_PAGINATE },
            }))
            reload('users')
        }
    }

    return (
        <form
            id={id}
            onSubmit={form.handleSubmit(handleSubmit)}
            className='mx-auto flex h-full w-full max-w-xl flex-col'
        >
            <div className='mb-5 space-y-5'>
                <div className='mt-3'>
                    <Toggle
                        form={form}
                        name='sendAll'
                        label={
                            <p>
                                Gửi cho tất cả mọi người <i className='text-gray-400'>(Gửi mail đến tất cả)</i>
                            </p>
                        }
                    />
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
                                <Image src={option.image} alt={option.userName} size='small' />
                                <div className='flex-1'>
                                    <p
                                        className={clsx(
                                            'truncate font-medium',
                                            active ? 'text-white' : 'text-gray-900 dark:text-slate-200'
                                        )}
                                    >
                                        {option.userName}
                                    </p>
                                    <small
                                        className={clsx(
                                            'block truncate font-normal',
                                            active ? 'text-white' : 'text-gray-500 dark:text-slate-400'
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
                    <p className='inline-block text-sm font-medium text-gray-700 dark:text-slate-100'>
                        Danh sách người nhận thông báo
                    </p>
                    <div className='mt-1 select-none rounded-lg border dark:border-slate-700' ref={userRef}>
                        {isEmpty(__users) ? (
                            <p className='px-4 py-2 text-center text-gray-900 dark:text-slate-200'>
                                {t(LANGUAGE.EMPTY_DATA)}
                            </p>
                        ) : (
                            __users.map((user, index) => (
                                <div key={user._id} className='flex items-center gap-2 px-4 py-2'>
                                    <Image src={user.image} alt={user.userName} size='small' />
                                    <div className='flex-1'>
                                        <p className='truncate font-medium text-gray-900 dark:text-slate-200'>
                                            {user.userName}
                                        </p>
                                        <small className='block truncate font-normal text-gray-500 dark:text-slate-400'>
                                            {user.email}
                                        </small>
                                    </div>
                                    {user.allowSendMail && (
                                        <button
                                            title='Gửi thông báo qua email'
                                            type='button'
                                            disabled={form.watch('sendAll')}
                                            className={clsx(
                                                `
                                                    cursor-pointer 
                                                    rounded-lg 
                                                    p-2 
                                                    transition-all
                                                    hover:bg-cyan-500
                                                    disabled:cursor-not-allowed
                                                    disabled:bg-slate-700
                                                    disabled:text-gray-500
                                                `,
                                                user.sendMail
                                                    ? 'bg-cyan-400 text-gray-100'
                                                    : 'bg-slate-100 text-gray-400 dark:bg-slate-700'
                                            )}
                                            onClick={() => {
                                                form.setValue(`users.${index}.sendMail`, !user.sendMail)
                                            }}
                                        >
                                            <EnvelopeIcon className='h-5' />
                                        </button>
                                    )}
                                    <button
                                        className='cursor-pointer rounded-lg bg-slate-100 p-2 text-radical-red-500 transition-all hover:bg-slate-200 disabled:cursor-not-allowed disabled:text-gray-500 disabled:hover:bg-slate-100 dark:bg-slate-700'
                                        onClick={() => {
                                            form.setValue(
                                                'users',
                                                __users.filter((u) => u._id !== user._id)
                                            )
                                        }}
                                        disabled={form.watch('sendAll')}
                                        type='button'
                                    >
                                        <TrashIcon className='h-5' />
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
