import { ArrowSmallRightIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { DefaultTFuncReturn } from 'i18next'
import React from 'react'
import { Link, To } from 'react-router-dom'
import LoadingButton from '~/components/Loading/LoadingButton'

export interface Props {
    title?: string | DefaultTFuncReturn
    onReload?: () => void
    loading?: boolean
    customEvent?: React.ReactNode
    to?: To
}

const Title: React.FC<Props> = (props) => {
    const { to, title, onReload, loading, customEvent } = props
    const Component = to ? Link : 'h4'

    if (!title) return <></>

    return (
        <div className='my-6 flex items-center justify-between p-0 sm:m-0 sm:p-2'>
            <Component
                to={to as To}
                className={clsx('flex items-center gap-2 text-base font-normal text-gray-900 dark:text-white', {
                    'hover:text-blue-700': to,
                })}
            >
                {title}
                {to && <ArrowSmallRightIcon className='h-5 w-5' />}
            </Component>
            <div className='inline-flex gap-2'>
                {customEvent}
                {onReload && <LoadingButton onReload={onReload} disabled={loading} />}
            </div>
        </div>
    )
}

export default Title
