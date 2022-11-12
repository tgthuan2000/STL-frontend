import { ArrowSmLeftIcon } from '@heroicons/react/outline'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useScrollIntoView } from '~/hook'
import { GETALL_RECENT_SPENDING } from '~/schema/query/spending'
import TransactionTabTable from './TransactionTabTable'

interface TransactionProps {
    title?: string
}
const Transaction: React.FC<TransactionProps> = ({ title = 'Title tab' }) => {
    const navigate = useNavigate()
    const wrapRef = useScrollIntoView<HTMLDivElement>()

    return (
        <div ref={wrapRef}>
            <div className='flex items-center text-gray-900 space-x-2 sm:mb-2 mb-4 select-none'>
                <ArrowSmLeftIcon
                    className='h-7 w-7 hover:opacity-50 cursor-pointer'
                    onClick={() => {
                        navigate(-1)
                    }}
                />
                <h4 className='xl:text-2xl text-xl font-semibold'>{title}</h4>
            </div>
            <div>
                <TransactionTabTable query={{ recent: GETALL_RECENT_SPENDING }} />
            </div>
        </div>
    )
}

export default Transaction
