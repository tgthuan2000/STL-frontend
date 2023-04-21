import { yupResolver } from '@hookform/resolvers/yup'
import { Fragment, useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import { CreateStep3Props } from '~/@types/announce-config'
import { DraftNotify, NotifyAssignForm } from '~/@types/notify'
import { LazySearchSelect, Toggle } from '~/components/_base'
import useLazySearchSelect from '~/components/_base/LazySearchSelect/hook/useLazySearchSelect'
import UserAllowSendMailButton from '~/components/_base/LazySearchSelect/UserAllowSendMailButton'
import UserDeleteButton from '~/components/_base/LazySearchSelect/UserDeleteButton'
import UserList from '~/components/_base/LazySearchSelect/UserList'
import UserOption from '~/components/_base/LazySearchSelect/UserOption'
import { LOCAL_STORAGE_KEY } from '~/constant/localStorage'
import { useLocalStorage } from '~/hook'
import LANGUAGE from '~/i18n/language/key'

const useSchema = () => {
    const { t } = useTranslation()
    const schema = useMemo(() => {
        return yup.object().shape({
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
    }, [t])
    return schema
}

const Step3: React.FC<CreateStep3Props> = ({ id, onSubmit }) => {
    const { t } = useTranslation()
    const [draftNotify] = useLocalStorage<DraftNotify>(LOCAL_STORAGE_KEY.STL_DRAFT_NOTIFY)
    const [searchLoading, users, handleSearch, handleScrollGetMore] = useLazySearchSelect()
    const schema = useSchema()
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
                form.setValue('users', [...__users, { ...data, sendMail: data.allowSendMail }])
            } else {
                form.setValue(
                    'users',
                    __users.filter((u) => u._id !== data._id)
                )
            }
        }
    }

    return (
        <form
            id={id}
            onSubmit={form.handleSubmit(handleSubmit)}
            className='mx-auto mt-5 flex h-full w-full max-w-xl flex-col'
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
