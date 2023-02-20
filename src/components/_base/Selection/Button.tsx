import { Listbox } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { isNil } from 'lodash'
import { SelectionButtonProps } from '~/@types/components'

const Button: React.FC<SelectionButtonProps> = ({ field, valueKey, placeholder, disabled }) => {
    return (
        <Listbox.Button
            className={clsx(
                'relative w-full cursor-default rounded-md py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm',
                disabled
                    ? 'select-none bg-gray-50 text-gray-500 dark:border-slate-700 dark:bg-slate-600 dark:text-slate-300'
                    : 'bg-white text-gray-900 dark:border-slate-800 dark:bg-slate-700 dark:text-slate-200'
            )}
        >
            <span
                className={clsx('block truncate', {
                    'text-gray-400': isNil(field.value),
                })}
            >
                {field.value?.[valueKey] ?? placeholder}
            </span>
            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                <ChevronUpDownIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
            </span>
        </Listbox.Button>
    )
}

export default Button
