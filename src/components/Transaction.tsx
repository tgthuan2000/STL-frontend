import { ArrowSmLeftIcon } from '@heroicons/react/outline'
import React, { Fragment } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { TransactionProps } from '~/@types/components'

const Transaction: React.FC<TransactionProps> = ({ title = 'Title tab', hasBack = true, children }) => {
    return (
        <Fragment>
            <div className='flex items-center text-gray-900 dark:text-slate-200 space-x-2 sm:mb-2 mb-4 select-none'>
                {hasBack && <BackButton />}
                <h4 className='text-2xl font-semibold'>{title}</h4>
            </div>
            {children ? children : <Outlet />}
        </Fragment>
    )
}

export default Transaction

const BackButton = () => {
    const navigate = useNavigate()
    return (
        <ArrowSmLeftIcon
            className='h-7 w-7 hover:opacity-50 cursor-pointer'
            onClick={() => {
                navigate(-1)
            }}
        />
    )
}
