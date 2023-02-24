import React from 'react'

interface Input {
    disabled?: boolean
    inputRef?: React.LegacyRef<HTMLInputElement>
    password?: boolean
    placeholder?: string
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onPaste?: (e: React.ClipboardEvent<HTMLInputElement>) => void
}

const Input: React.FC<Input> = ({ disabled, inputRef, password, placeholder, onKeyDown, onChange, onPaste }) => {
    return (
        <input
            ref={inputRef}
            type={password ? 'password' : 'number'}
            placeholder={placeholder}
            disabled={disabled}
            onKeyDown={onKeyDown}
            onChange={onChange}
            onPaste={onPaste}
            className='h-9 w-9 rounded-md border border-gray-200 bg-gray-50 text-center text-sm font-normal text-gray-700 shadow-md placeholder:text-gray-300 focus:border-2 focus:border-pink-500 focus:ring-0 disabled:opacity-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:placeholder:text-slate-400 dark:focus:border-pink-500 sm:h-14 sm:w-14 sm:text-xl sm:font-medium'
        />
    )
}

export default Input
