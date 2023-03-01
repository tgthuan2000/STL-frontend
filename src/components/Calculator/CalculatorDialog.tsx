import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import React, { Fragment } from 'react'
import CalculatorSimulate from './CalculatorSimulate'

interface CalculatorDialogProps {
    open: boolean
    onClose: () => void
}

const CalculatorDialog: React.FC<CalculatorDialogProps> = ({ open, onClose }) => {
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as='div' className='relative z-30' onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter='ease-in-out duration-500'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in-out duration-500'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity dark:bg-slate-900 dark:bg-opacity-80' />
                </Transition.Child>

                <div className='fixed inset-0 overflow-hidden'>
                    <div className='absolute inset-0 overflow-hidden'>
                        <div className='pointer-events-none fixed inset-y-0 left-0 flex max-w-full'>
                            <Transition.Child
                                as={Fragment}
                                enter='transform transition ease-in-out duration-500'
                                enterFrom='-translate-x-full opacity-0'
                                enterTo='translate-x-0'
                                leave='transform transition ease-in-out duration-500'
                                leaveFrom='translate-x-0'
                                leaveTo='-translate-x-full opacity-0'
                            >
                                <Dialog.Panel className='pointer-events-auto w-screen max-w-full sm:max-w-md'>
                                    <div className='flex h-full flex-col overflow-y-auto bg-white shadow-xl dark:bg-slate-800'>
                                        <div className='px-4 pt-6 sm:px-6'>
                                            <div className='flex items-start justify-between'>
                                                <Dialog.Title className='text-lg font-medium text-gray-900 dark:text-white'>
                                                    Calculator
                                                </Dialog.Title>
                                                <div className='ml-3 flex h-7 items-center'>
                                                    <button
                                                        type='button'
                                                        className='rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none dark:bg-transparent dark:text-slate-100 dark:hover:text-slate-200'
                                                        onClick={onClose}
                                                    >
                                                        <span className='sr-only'>Close panel</span>
                                                        <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex-1'>
                                            <div className='flex h-full w-full flex-col items-center justify-center gap-5 p-2'>
                                                <CalculatorSimulate />
                                                <button
                                                    type='button'
                                                    className='block min-w-[300px] rounded-md bg-indigo-500 py-2 px-4 text-base font-normal text-white hover:opacity-70 dark:bg-cyan-500 sm:text-lg'
                                                >
                                                    33
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default CalculatorDialog
