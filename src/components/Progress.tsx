import { useAutoAnimate } from '@formkit/auto-animate/react'
import { CheckIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import React, { Fragment } from 'react'
import { ProgressItem, ProgressProps } from '~/@types/components'

const Progress: React.FC<ProgressProps> = ({ step, options, className, onStepClick }) => {
    const [parent] = useAutoAnimate<HTMLDivElement>()
    const handleClickStepItem = (option: ProgressItem) => {
        onStepClick?.(option)
    }
    return (
        <div ref={parent} className={clsx('mb-10', className)}>
            <div className='flex items-start select-none'>
                {options.map((option, index, data) => {
                    const isActive = option.step === step
                    const isFinished = option.step < step
                    return (
                        <Fragment key={option.step}>
                            <div
                                className={clsx('relative flex-1 flex flex-col gap-2 items-center transition-all', {
                                    'hover:opacity-80 cursor-pointer': !isActive,
                                })}
                                onClick={() => handleClickStepItem(option)}
                            >
                                <span
                                    className={clsx(
                                        'inline-flex h-6 w-6 sm:h-8 sm:w-8 rounded-full items-center justify-center transition-all',
                                        { 'bg-slate-200 text-gray-700': !isActive && !isFinished },
                                        { 'bg-slate-700 text-white': isActive },
                                        { 'bg-green-400 text-white': isFinished }
                                    )}
                                >
                                    {isFinished ? (
                                        <CheckIcon className='h-4 w-4 sm:h-6 sm:w-6' />
                                    ) : (
                                        <p className={clsx(isActive ? 'font-medium' : 'font-normal')}>{index + 1}</p>
                                    )}
                                </span>
                                <div className='absolute top-full mt-2 left-1 right-1'>
                                    <p
                                        className={clsx(
                                            'block text-center transition-all w-full text-xs sm:text-sm text-gray-700 line-clamp-2',
                                            isActive ? 'font-bold' : 'font-normal'
                                        )}
                                    >
                                        {option.label}
                                    </p>
                                </div>
                                {index === data.length - 1 ? null : (
                                    <div
                                        className={clsx(
                                            'absolute top-1/2 h-0.5 left-[calc(50%+20px)] right-0 rounded-tl-full rounded-bl-full transition-all',
                                            isFinished ? 'bg-green-400' : 'bg-slate-200'
                                        )}
                                    />
                                )}
                                {index === 0 ? null : (
                                    <div
                                        className={clsx(
                                            'absolute top-1/2 h-0.5 right-[calc(50%+20px)] left-0 rounded-tr-full rounded-br-full transition-all',
                                            isActive || isFinished ? 'bg-green-400' : 'bg-slate-200'
                                        )}
                                    />
                                )}
                            </div>
                        </Fragment>
                    )
                })}
            </div>
        </div>
    )
}

export default Progress
