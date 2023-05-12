import React from 'react'

interface Props {
    value?: string
    onChange?: any
    date?: Date
}
const TimeInput: React.FC<Props> = (props) => {
    const { onChange, value } = props

    return (
        <div className='flex w-full items-center justify-end gap-2'>
            <input
                className='block w-full rounded-md border border-gray-300 bg-white px-6 py-2 font-light shadow-sm focus:ring-0 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 dark:border-transparent dark:bg-slate-700 dark:text-cyan-500 dark:disabled:bg-slate-800 dark:disabled:text-slate-400 sm:py-2 sm:px-4'
                placeholder='HH:mm'
                type='time'
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    )
}

export default TimeInput
