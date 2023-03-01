import { CalculatorIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'
import CalculatorDialog from './CalculatorDialog'

interface CalculatorProps {
    onSubmit: (value: number) => void
}

const Calculator: React.FC<CalculatorProps> = ({ onSubmit }) => {
    const [open, setOpen] = useState(false)
    const onOpen = () => {
        setOpen(true)
    }
    const onClose = () => {
        setOpen(false)
    }

    return (
        <>
            <button
                type='button'
                className='rounded-md p-2 transition-all hover:bg-slate-200 hover:opacity-70 dark:hover:bg-slate-700 dark:hover:opacity-100'
                onClick={onOpen}
            >
                <CalculatorIcon className='h-6 w-6 text-gray-700 dark:text-slate-300' />
            </button>
            <CalculatorDialog open={open} onClose={onClose} />
        </>
    )
}

export default Calculator
