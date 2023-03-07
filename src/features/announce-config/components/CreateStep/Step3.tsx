import { useAutoAnimate } from '@formkit/auto-animate/react'
import { EnvelopeIcon } from '@heroicons/react/24/outline'
import { yupResolver } from '@hookform/resolvers/yup'
import clsx from 'clsx'
import { isEmpty } from 'lodash'
import { Fragment } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import { CreateStep3Props } from '~/@types/announce-config'
import { DraftNotify, NotifyAssignForm } from '~/@types/notify'
import { Image } from '~/components'
import { LazySearchSelect, Toggle } from '~/components/_base'
import useLazySearchSelect from '~/components/_base/LazySearchSelect/hook/useLazySearchSelect'
import UserAllowSendMailButton from '~/components/_base/LazySearchSelect/UserAllowSendMailButton'
import UserDeleteButton from '~/components/_base/LazySearchSelect/UserDeleteButton'
import UserList from '~/components/_base/LazySearchSelect/UserList'
import UserOption from '~/components/_base/LazySearchSelect/UserOption'
import { LOCAL_STORAGE_KEY } from '~/constant/localStorage'
import { useLocalStorage } from '~/hook'
import i18n from '~/i18n'
import LANGUAGE from '~/i18n/language/key'

const { t } = i18n

const schema = yup.object().shape({
    search: yup.object().nullable(),
    users: yup
        .array()
        .nullable()
        .when('sendAll', {
            is: false,
            then: yup.array().min(1, t(LANGUAGE.RECEIVER_MIN_1) as string),
        }),
    sendAll: yup.boolean(),
})

const Step3: React.FC<CreateStep3Props> = ({ id, onSubmit }) => {
    const { t } = useTranslation()
    const [userRef] = useAutoAnimate<HTMLDivElement>()
    const [draftNotify] = useLocalStorage<DraftNotify>(LOCAL_STORAGE_KEY.STL_DRAFT_NOTIFY)
    const [searchLoading, users, handleSearch, handleScrollGetMore] = useLazySearchSelect()

    const form = useForm<NotifyAssignForm>({
        defaultValues: { users: draftNotify?.users ?? [], sendAll: draftNotify?.sendAll ?? false },
        resolver: yupResolver(schema),
    })

    const __users = form.watch('users')

    const handleSubmit = async (data: NotifyAssignForm) => {
        onSubmit(data)
    }

    const handleChange = (data: any) => {
        if (data) {
            if (!__users.find((u) => u._id === data._id)) {
                return [...__users, { ...data, sendMail: data.allowSendMail }]
            } else {
                return __users.filter((u) => u._id !== data._id)
            }
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
                                {t(LANGUAGE.SEND_TO_ALL_MEMBER)}{' '}
                                <i className='text-gray-400'>({t(LANGUAGE.SEND_MAIL_TO_ALL)})</i>
                            </p>
                        }
                    />
                </div>
                <LazySearchSelect
                    name='users'
                    options={users.data?.data}
                    autoFocus
                    hasNextPage={users.data?.hasNextPage}
                    loading={searchLoading}
                    label={t(LANGUAGE.SEARCH)}
                    disabled={form.watch('sendAll')}
                    placeholder={t(LANGUAGE.PLACEHOLDER_ENTER_USER_INFO)}
                    onChange={handleChange}
                    onSearch={handleSearch}
                    onGetMore={handleScrollGetMore}
                    getOptionLabel={(option, active) => <UserOption active={active} data={option} />}
                />

                <div>
                    <p className='inline-block text-sm font-medium text-gray-700 dark:text-slate-100'>
                        {t(LANGUAGE.NOTIFY_RECEIVER_LIST)}
                    </p>

                    <UserList data={__users}>
                        {(user, index) => (
                            <Fragment>
                                <UserAllowSendMailButton
                                    active={user.sendMail}
                                    disabled={form.watch('sendAll')}
                                    hidden={!user.allowSendMail}
                                    onClick={() => {
                                        form.setValue(`users.${index}.sendMail`, !user.sendMail)
                                    }}
                                />
                                <UserDeleteButton
                                    disabled={form.watch('sendAll')}
                                    onClick={() => {
                                        form.setValue(
                                            'users',
                                            __users.filter((u) => u._id !== user._id)
                                        )
                                    }}
                                />
                            </Fragment>
                        )}
                    </UserList>
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
                                            title={t(LANGUAGE.SEND_NOTIFY_BY_EMAIL) as string}
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
