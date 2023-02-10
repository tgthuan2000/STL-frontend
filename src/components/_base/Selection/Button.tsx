import { Listbox } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { isNil } from 'lodash'
import { SelectionButtonProps } from '~/@types/components'

const Button: React.FC<SelectionButtonProps> = ({ field, valueKey, placeholder, disabled }) => {
    return (
        <Listbox.Button
            className={clsx(
                'relative w-full rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm',
                disabled
                    ? 'bg-gray-50 text-gray-500 select-none dark:bg-slate-600 dark:border-slate-700 dark:text-slate-300'
                    : 'bg-white text-gray-900 dark:bg-slate-700 dark:border-slate-800 dark:text-slate-200'
            )}
        >
            <span
                className={clsx('block truncate', {
                    'text-gray-400': isNil(field.value),
                })}
            >
                {field.value?.[valueKey] ?? placeholder}
            </span>
            <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
                <ChevronUpDownIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
            </span>
        </Listbox.Button>
    )
}

export default Button
