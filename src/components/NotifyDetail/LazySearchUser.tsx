import React, { Fragment } from 'react'
import { LazySearchSelect, Toggle } from '../_base'
import { useTranslation } from 'react-i18next'
import LANGUAGE from '~/i18n/language/key'
import UserOption from '../_base/LazySearchSelect/UserOption'
import UserList from '../_base/LazySearchSelect/UserList'
import UserAllowSendMailButton from '../_base/LazySearchSelect/UserAllowSendMailButton'
import UserDeleteButton from '../_base/LazySearchSelect/UserDeleteButton'
import { UseFormReturn } from 'react-hook-form'

interface Props {
    form: UseFormReturn<{ title: string; description: string; content: string }, any>
    autoFocus?: boolean
}

const LazySearchUser: React.FC<Props> = (props) => {
    const { form, autoFocus = true } = props
    const { t } = useTranslation()

    return (
        <Fragment>
            <Toggle
                form={form}
                name='sendAll'
                label={
                    <p>
                        {t(LANGUAGE.SEND_TO_ALL_MEMBER)}
                        <br />
                        <i className='text-xs text-gray-400'>{t(LANGUAGE.SEND_MAIL_TO_ALL)}</i>
                    </p>
                }
            />

            <LazySearchSelect
                name='users'
                options={[]}
                autoFocus={autoFocus}
                hasNextPage={false}
                loading={false}
                label={t(LANGUAGE.SEARCH)}
                disabled={false}
                placeholder={t(LANGUAGE.PLACEHOLDER_ENTER_USER_INFO)}
                onChange={() => {}}
                onSearch={() => {}}
                onGetMore={() => {}}
                getOptionLabel={(option, active) => <UserOption active={active} data={option} />}
            />

            <div>
                <p className='inline-block text-sm font-medium text-gray-700 dark:text-slate-100'>
                    {t(LANGUAGE.NOTIFY_RECEIVER_LIST)}
                </p>

                <UserList data={[]}>
                    {(user, index) => (
                        <Fragment>
                            <UserAllowSendMailButton
                                active={user.sendMail}
                                disabled={false}
                                hidden={!user.allowSendMail}
                                onClick={() => {}}
                            />
                            <UserDeleteButton disabled={false} onClick={() => {}} />
                        </Fragment>
                    )}
                </UserList>
                {/* <Controller
                    name='users'
                    control={form.control}
                    render={({ fieldState: { error } }) =>
                        error ? <p className='text-sm text-red-500'>{error.message}</p> : <></>
                    }
                /> */}

                <p className='text-sm text-red-500'></p>
            </div>
        </Fragment>
    )
}

export default LazySearchUser
