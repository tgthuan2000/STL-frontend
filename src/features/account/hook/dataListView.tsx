import { ArrowPathIcon, BoltIcon, BoltSlashIcon, EnvelopeIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import moment from 'moment'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IAccount } from '~/@types/account'
import { TableColumn } from '~/@types/components'
import { Chip, Image } from '~/components'
import { DATE_FORMAT } from '~/constant'
import LANGUAGE from '~/i18n/language/key'
import { useProfile } from '~/store/auth'

const getDate = (date: string | undefined) => {
    return (
        <>
            <span>{moment(date).format(DATE_FORMAT.D_DATE)}</span>
            <br />
            <span>{moment(date).format(DATE_FORMAT.TIME)}</span>
        </>
    )
}

interface Option {
    toggleActive: (id: string, active: boolean) => Promise<void>
}

export const useColumns = (options: Option): Array<TableColumn<IAccount>> => {
    const { t } = useTranslation()
    const { toggleActive } = options

    const data: Array<TableColumn<IAccount>> = useMemo(() => {
        return [
            {
                key: 'user',
                title: t(LANGUAGE.USER),
                label: 'string',
                renderRow: ({ email, image, userName }) => (
                    <td className='whitespace-nowrap py-3 pl-2 pr-3 text-xs sm:pl-3 sm:text-sm'>
                        <div className='flex items-center gap-2 px-4 py-2'>
                            <Image src={image} avatar={{ roundFull: true, size: 'medium' }} />
                            <div className='flex-1'>
                                <p className='truncate font-medium text-gray-900 dark:text-slate-200'>{userName}</p>
                                <small className='block truncate font-normal text-gray-500 dark:text-slate-400'>
                                    {email}
                                </small>
                            </div>
                        </div>
                    </td>
                ),
            },
            {
                key: 'security',
                title: t(LANGUAGE.SECURITY),
                label: 'string',
                renderRow: ({ twoFA, isHasPassword }) => (
                    <td className='px-1 text-center'>
                        <div className='inline-flex flex-wrap gap-1.5'>
                            {isHasPassword && <Chip className='bg-indigo-500 font-medium text-white'>Password</Chip>}
                            {twoFA && <Chip className='bg-orange-500 font-medium text-white'>2FA</Chip>}
                        </div>
                    </td>
                ),
            },
            {
                key: 'service',
                title: t(LANGUAGE.SERVICE),
                label: 'string',
                renderRow: ({ allowSendMail }) => (
                    <td className='px-1 text-center'>
                        <button
                            title={t(LANGUAGE.SEND_NOTIFY_BY_EMAIL) as string}
                            type='button'
                            className={clsx(
                                'cursor-default rounded-lg p-2',
                                allowSendMail
                                    ? 'bg-cyan-400 text-gray-100'
                                    : 'bg-slate-100 text-gray-400 dark:bg-slate-700'
                            )}
                        >
                            <EnvelopeIcon className='h-5' />
                        </button>
                    </td>
                ),
            },
            {
                key: 'role',
                title: t(LANGUAGE.ROLE),
                label: 'string',
                renderRow: ({ role }) => (
                    <td className='px-1 text-center'>
                        <p className='whitespace-nowrap text-xs font-normal sm:text-sm'>{role.name}</p>
                    </td>
                ),
            },
            {
                key: 'createdAt',
                title: t(LANGUAGE.CREATE_DATE),
                label: 'string',
                renderRow: ({ _createdAt }) => (
                    <td className='px-1 text-center'>
                        <p className='whitespace-nowrap text-xs sm:text-sm'>{getDate(_createdAt)}</p>
                    </td>
                ),
            },
            {
                key: 'actions',
                title: t(LANGUAGE.ACTIONS),
                label: 'string',
                renderRow: ({ active, _id }) => <Actions id={_id} active={active} onClick={toggleActive} />,
            },
        ]
    }, [t])
    return data
}

interface ActionsProps {
    id: string
    active: boolean
    onClick: (id: string, active: boolean) => Promise<void>
}

const Actions: React.FC<ActionsProps> = (props) => {
    const { active, id, onClick } = props
    const { t } = useTranslation()
    const { userProfile } = useProfile()
    const [clicked, setClicked] = useState(false)

    return (
        <td className='px-1 text-center'>
            <button
                title={t(active ? LANGUAGE.ACCOUNT_ACTIVE : LANGUAGE.ACCOUNT_INACTIVE) as string}
                type='button'
                className={clsx(
                    'cursor-pointer rounded-lg p-2 text-white hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:opacity-50',
                    active ? 'bg-green-500' : 'bg-radical-red-500 dark:bg-indigo-700'
                )}
                disabled={userProfile?._id === id || clicked}
                onClick={async (e) => {
                    try {
                        e.stopPropagation()
                        setClicked(true)
                        await onClick(id, active)
                    } catch (error) {
                        console.log(error)
                    } finally {
                        setClicked(false)
                    }
                }}
            >
                {clicked ? (
                    <ArrowPathIcon className='h-5 animate-spin' />
                ) : (
                    <>{active ? <BoltIcon className='h-5' /> : <BoltSlashIcon className='h-5' />}</>
                )}
            </button>
        </td>
    )
}
