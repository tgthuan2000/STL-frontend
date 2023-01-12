import clsx from 'clsx'
import React from 'react'
import { StatusLoanProps } from '~/@types/loan'

const StatusLoan: React.FC<StatusLoanProps> = ({ form, name }) => {
    const watchName = form.watch(name)
    return (
        <p>
            Trạng thái vay:{' '}
            <span className={clsx('font-medium', watchName ? 'text-indigo-500' : 'text-orange-500')}>
                {watchName ? 'Cộng gốc' : 'Tạm vay'}
            </span>
        </p>
    )
}

export default StatusLoan
