import React, { Fragment } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import LANGUAGE from '~/i18n/language/key'
import { LazySearchSelect } from '../../_base'
import UserAllowSendMailButton from '../../_base/LazySearchSelect/UserAllowSendMailButton'
import UserDeleteButton from '../../_base/LazySearchSelect/UserDeleteButton'
import UserList from '../../_base/LazySearchSelect/UserList'
import UserOption from '../../_base/LazySearchSelect/UserOption'
import useLazySearchSelect from '../../_base/LazySearchSelect/hook/useLazySearchSelect'
import { NotifyDetailEditForm, _Assigned } from './Edit'

interface Props {
    form: UseFormReturn<NotifyDetailEditForm, any>
    autoFocus?: boolean
}

const LazySearchUser: React.FC<Props> = (props) => {
    const { form, autoFocus = true } = props
    const [searchLoading, users, handleSearch, handleScrollGetMore] = useLazySearchSelect()
    const { t } = useTranslation()

    const assigned = form.watch('assigned')

    const _handleAssign = (index: number, assignsFiltered: _Assigned[]) => {
        const item = assigned[index]

        if (!item._id) {
            form.setValue('assigned', assignsFiltered)
        } else {
            form.setValue(`assigned.${index}.deleted`, !item.deleted)
        }
    }

    const handleChange = (data: any) => {
        if (data) {
            const indexItem = assigned.findIndex((u) => u.user._id === data._id)
            if (indexItem === -1) {
                form.setValue('assigned', [
                    ...assigned,
                    { sentMail: false, user: { ...data, sendMail: data.allowSendMail } },
                ])
            } else {
                _handleAssign(
                    indexItem,
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
                    getOptionItem={({ user, deleted }) => ({
                        email: user.email,
                        image: user.image,
                        username: user.userName,
                        key: user._id,
                        deleted,
                    })}
                >
                    {({ user, deleted, sentMail, _id }, index) => (
                        <Fragment>
                            <UserAllowSendMailButton
                                active={sentMail || user.sendMail}
                                disabled={sentMail || deleted}
                                hidden={!user.allowSendMail}
                                onClick={() => {
                                    form.setValue(`assigned.${index}.user.sendMail`, !user.sendMail)
                                }}
                            />
                            <UserDeleteButton
                                onClick={() => {
                                    if (!_id) {
                                        form.setValue(
                                            'assigned',
                                            assigned.filter((u) => u.user._id !== user._id)
                                        )
                                    } else {
                                        form.setValue(`assigned.${index}.deleted`, !deleted)
                                    }
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
