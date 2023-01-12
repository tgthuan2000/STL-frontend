import { ArrowSmLeftIcon } from '@heroicons/react/outline'
import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { TransactionProps } from '~/@types/components'
import { useScrollIntoView } from '~/hook'

const Transaction: React.FC<TransactionProps> = ({ title = 'Title tab', hasBack = true, children }) => {
    const wrapRef = useScrollIntoView<HTMLDivElement>()

    return (
        <div ref={wrapRef}>
            <div className='flex items-center text-gray-900 space-x-2 sm:mb-2 mb-4 select-none'>
                {hasBack && <BackButton />}
                <h4 className='xl:text-2xl text-xl font-semibold'>{title}</h4>
            </div>
            <div>{children ? children : <Outlet />}</div>
        </div>
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
