import { ArrowSmallLeftIcon } from '@heroicons/react/24/outline'
import React, { Fragment } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { TransactionProps } from '~/@types/components'

const Transaction: React.FC<TransactionProps> = ({ title = 'Title tab', hasBack = true, children }) => {
    return (
        <Fragment>
            <div className='mb-4 flex select-none items-center space-x-2 text-gray-900 dark:text-slate-200 sm:mb-2'>
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
        <ArrowSmallLeftIcon
            className='h-7 w-7 cursor-pointer hover:opacity-50'
            onClick={() => {
                navigate(-1)
            }}
        />
    )
}
