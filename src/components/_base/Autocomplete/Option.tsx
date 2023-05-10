import { Combobox } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import React from 'react'
import Image from '~/components/Image'

interface Props {
    value: any
    showImage?: boolean
    displayImage?: (value: any) => any
    displayValue?: (value: any) => any
}

const Option: React.FC<Props> = (props) => {
    const { value, showImage, displayImage, displayValue } = props

    return (
        <Combobox.Option
            value={value}
            className={({ active }) =>
                clsx(
                    'relative cursor-default select-none py-2 pl-8 pr-4',
                    active ? 'bg-indigo-600 text-white dark:bg-cyan-500' : 'text-gray-900 dark:text-slate-200'
                )
            }
        >
            {({ active, selected }) => (
                <>
                    <div className='flex items-center gap-2'>
                        {showImage && (
                            <Image
                                src={displayImage?.(value)}
                                alt={displayValue?.(value)}
                                avatar={{ roundFull: true, size: 'small' }}
                            />
                        )}
                        <span className={clsx('block truncate', selected && 'font-semibold')}>
                            {displayValue?.(value)}
                        </span>
                    </div>

                    {selected && (
                        <span
                            className={clsx(
                                'absolute inset-y-0 left-0 flex items-center pl-1.5',
                                active ? 'text-white' : 'text-indigo-600 dark:text-cyan-500'
                            )}
                        >
                            <CheckIcon className='h-5 w-5' aria-hidden='true' />
                        </span>
                    )}
                </>
            )}
        </Combobox.Option>
    )
}

export default Option
