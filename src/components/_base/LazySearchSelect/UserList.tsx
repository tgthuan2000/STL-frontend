import { useAutoAnimate } from '@formkit/auto-animate/react'
import { TrashIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { isEmpty } from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Image from '~/components/Image'
import LANGUAGE from '~/i18n/language/key'

interface UserListProps {
    data: any[] | null
    className?: string
    children: (data: any, index: number) => React.ReactNode
    emptyComp?: React.ReactNode
}

const UserList: React.FC<UserListProps> = ({ data, className, emptyComp, children }) => {
    const { t } = useTranslation()
    const [userRef] = useAutoAnimate<HTMLDivElement>()
    return (
        <div className={clsx('mt-1 select-none rounded-lg border dark:border-slate-700', className)} ref={userRef}>
            {isEmpty(data)
                ? emptyComp ?? (
                      <p className='px-4 py-2 text-center text-gray-900 dark:text-slate-200'>
                          {t(LANGUAGE.EMPTY_DATA)}
                      </p>
                  )
                : data?.map((user, index) => (
                      <div key={user._id} className='flex items-center gap-2 px-4 py-2'>
                          <Image src={user.image} alt={user.userName} avatar={{ roundFull: true, size: 'small' }} />
                          <div className='flex-1'>
                              <p className='truncate font-medium text-gray-900 dark:text-slate-200'>{user.userName}</p>
                              <small className='block truncate font-normal text-gray-500 dark:text-slate-400'>
                                  {user.email}
                              </small>
                          </div>
                          {children(user, index)}
                      </div>
                  ))}
        </div>
    )
}

export default UserList
