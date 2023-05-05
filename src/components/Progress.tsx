import { CheckIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import React, { Fragment } from 'react'
import { ProgressItem, ProgressProps } from '~/@types/components'
import AnimateWrap from './AnimateWrap'

const Progress: React.FC<ProgressProps> = ({ step, options, className, onStepClick }) => {
    const handleClickStepItem = (option: ProgressItem) => {
        onStepClick?.(option)
    }
    return (
        <AnimateWrap className={clsx('mb-10', className)}>
            <div className='flex select-none items-start'>
                {options.map((option, index, data) => {
                    const isActive = option.step === step
                    const isFinished = option.step < step
                    return (
                        <Fragment key={option.step}>
                            <div
                                className={clsx('relative flex flex-1 flex-col items-center gap-2 transition-all', {
                                    'cursor-pointer hover:opacity-80': !isActive,
                                })}
                                onClick={() => handleClickStepItem(option)}
                            >
                                <span
                                    className={clsx(
                                        'inline-flex h-6 w-6 items-center justify-center rounded-full transition-all sm:h-8 sm:w-8',
                                        {
                                            'bg-slate-200 text-gray-700 dark:bg-slate-700 dark:text-slate-200':
                                                !isActive && !isFinished,
                                        },
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
                                <div className='absolute top-full left-1 right-1 mt-2'>
                                    <p
                                        className={clsx(
                                            'block w-full text-center text-xs text-gray-700 transition-all line-clamp-2 dark:text-slate-200 sm:text-sm',
                                            isActive ? 'font-bold' : 'font-normal'
                                        )}
                                    >
                                        {option.label}
                                    </p>
                                </div>
                                {index === data.length - 1 ? null : (
                                    <div
                                        className={clsx(
                                            'absolute top-1/2 left-[calc(50%+20px)] right-0 h-0.5 rounded-tl-full rounded-bl-full transition-all',
                                            isFinished ? 'bg-green-400' : 'bg-slate-200 dark:bg-slate-700'
                                        )}
                                    />
                                )}
                                {index === 0 ? null : (
                                    <div
                                        className={clsx(
                                            'absolute top-1/2 right-[calc(50%+20px)] left-0 h-0.5 rounded-tr-full rounded-br-full transition-all',
                                            isActive || isFinished ? 'bg-green-400' : 'bg-slate-200 dark:bg-slate-700'
                                        )}
                                    />
                                )}
                            </div>
                        </Fragment>
                    )
                })}
            </div>
        </AnimateWrap>
    )
}

export default Progress
