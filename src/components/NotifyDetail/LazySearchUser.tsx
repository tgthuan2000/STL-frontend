import React, { Fragment } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import LANGUAGE from '~/i18n/language/key'
import { LazySearchSelect } from '../_base'
import UserAllowSendMailButton from '../_base/LazySearchSelect/UserAllowSendMailButton'
import UserDeleteButton from '../_base/LazySearchSelect/UserDeleteButton'
import UserList from '../_base/LazySearchSelect/UserList'
import UserOption from '../_base/LazySearchSelect/UserOption'
import useLazySearchSelect from '../_base/LazySearchSelect/hook/useLazySearchSelect'

interface Props {
    form: UseFormReturn<
        {
            title: string
            description: string
            content: string
            assigned: Array<{ sentMail: boolean; user: { _id: string; email: string; sendMail: boolean } }>
        },
        any
    >
    autoFocus?: boolean
}

const LazySearchUser: React.FC<Props> = (props) => {
    const { form, autoFocus = true } = props
    const [searchLoading, users, handleSearch, handleScrollGetMore] = useLazySearchSelect()
    const { t } = useTranslation()

    const assigned = form.watch('assigned')

    const handleChange = (data: any) => {
        if (data) {
            if (!assigned.find((u) => u.user._id === data._id)) {
                form.setValue('assigned', [
                    ...assigned,
                    { sentMail: false, user: { ...data, sendMail: data.allowSendMail } },
                ])
            } else {
                form.setValue(
                    'assigned',
                    assigned.filter((u) => u.user._id !== data._id)
                )
            }
        }
    }

    return (
        <Fragment>
            <LazySearchSelect
                options={users.data?.data ?? []}
                autoFocus={autoFocus}
                hasNextPage={false}
                loading={searchLoading}
                label={t(LANGUAGE.SEARCH)}
                disabled={false}
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

                <UserList
                    data={assigned}
                    getOptionItem={({ user }) => ({
                        email: user.email,
                        image: user.image,
                        username: user.userName,
                        key: user._id,
                    })}
                >
                    {({ user, sentMail }, index) => (
                        <Fragment>
                            <UserAllowSendMailButton
                                active={sentMail || user.sendMail}
                                disabled={false}
                                hidden={!user.allowSendMail}
                                onClick={() => {
                                    form.setValue(`assigned.${index}.user.sendMail`, !user.sendMail)
                                }}
                            />
                            <UserDeleteButton
                                disabled={false}
                                onClick={() => {
                                    form.setValue(
                                        'assigned',
                                        assigned.filter((u) => u.user._id !== user._id)
                                    )
                                }}
                            />
                        </Fragment>
                    )}
                </UserList>

                {form.getFieldState('assigned').error && (
                    <p className='text-sm text-red-500'>{form.getFieldState('assigned').error?.message}</p>
                )}
            </div>
        </Fragment>
    )
}

export default LazySearchUser
