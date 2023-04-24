import { TrashIcon } from '@heroicons/react/24/outline'
import React from 'react'

interface UserDeleteButtonProps {
    disabled?: boolean
    onClick?: () => void
}

const UserDeleteButton: React.FC<UserDeleteButtonProps> = ({ disabled, onClick }) => {
    return (
        <button
            className='cursor-pointer rounded-lg bg-slate-100 p-2 text-radical-red-500 transition-all hover:bg-slate-200 disabled:cursor-not-allowed disabled:text-gray-500 disabled:hover:bg-slate-100 dark:bg-slate-700 dark:hover:opacity-70'
            onClick={onClick}
            disabled={disabled}
            type='button'
        >
            <TrashIcon className='h-5' />
        </button>
    )
}

export default UserDeleteButton
