import clsx from 'clsx'
import { isEmpty } from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { AnimateWrap } from '~/components'
import Image from '~/components/Image'
import LANGUAGE from '~/i18n/language/key'

interface UserListProps {
    data: any[] | null
    className?: string
    children: (data: any, index: number) => React.ReactNode
    emptyComp?: React.ReactNode
    getOptionItem?: (data: any) => {
        key: string
        image: string
        username: string
        email: string
        deleted?: boolean
        read?: boolean
    }
}

const UserList: React.FC<UserListProps> = ({ data, className, emptyComp, children, getOptionItem }) => {
    const { t } = useTranslation()
    return (
        <AnimateWrap className={clsx('relative mt-1 select-none rounded-lg border dark:border-slate-700', className)}>
            {isEmpty(data)
                ? emptyComp ?? (
                      <p className='px-4 py-2 text-center text-gray-900 dark:text-slate-200'>
                          {t(LANGUAGE.EMPTY_DATA)}
                      </p>
                  )
                : data?.map((user, index) => {
                      const { email, image, key, username, deleted, read } = getOptionItem?.(user) ?? {
                          email: user.email,
                          image: user.image,
                          key: user._id,
                          username: user.userName,
                      }

                      return (
                          <div key={key} className='flex items-center gap-2 px-4 py-2'>
                              <Image src={image} alt={username} avatar={{ roundFull: true, size: 'small' }} />
                              <div className='flex-1'>
                                  {username && (
                                      <p className='truncate font-medium text-gray-900 dark:text-slate-200'>
                                          {username}
                                      </p>
                                  )}
                                  {email && (
                                      <small className='block truncate font-normal text-gray-500 dark:text-slate-400'>
                                          {email}
                                      </small>
                                  )}
                              </div>
                              <Tag hidden={!deleted} color='red'>
                                  {t(LANGUAGE.DELETED)}
                              </Tag>
                              <Tag hidden={!read} color='blue'>
                                  {t(LANGUAGE.READ)}
                              </Tag>
                              {children(user, index)}
                          </div>
                      )
                  })}
        </AnimateWrap>
    )
}

const Tag = ({
    hidden = false,
    children,
    color = 'red',
}: {
    hidden?: boolean
    children: React.ReactNode
    color?: 'red' | 'blue'
}) => {
    if (hidden) {
        return <></>
    }

    return (
        <span
            className={clsx(
                'absolute -top-3 -right-2 block truncate rounded-md py-0.5 px-1 text-xs font-bold uppercase text-white sm:top-0 sm:left-full sm:right-auto sm:-translate-x-1/2 sm:rotate-45 sm:p-1',
                { 'bg-radical-red-500': color === 'red' },
                { 'bg-prussian-blue-500': color === 'blue' }
            )}
        >
            {children}
        </span>
    )
}

export default UserList
