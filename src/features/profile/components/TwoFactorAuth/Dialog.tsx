import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import TwoFactor from './TwoFactor'

interface TwoFactorDialogProps {
    isShow: boolean
    onClose: () => void
}

const TwoFactorDialog: React.FC<TwoFactorDialogProps> = ({ isShow, onClose }) => {
    return (
        <Transition.Root show={isShow} as={Fragment}>
            <Dialog
                as='div'
                className='relative z-30'
                onClose={() => {
                    // onClose()
                }}
            >
                <Transition.Child
                    as={Fragment}
                    enter='ease-in-out duration-200'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in-out duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div className='fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity dark:bg-slate-900 dark:bg-opacity-80' />
                </Transition.Child>

                <div className='fixed inset-0 overflow-hidden'>
                    <div className='absolute inset-0 overflow-hidden'>
                        <div className='pointer-events-none fixed top-1/2 right-1/2 flex max-w-full translate-x-1/2 -translate-y-1/2'>
                            <Transition.Child
                                as={Fragment}
                                enter='transform transition ease-in-out duration-200'
                                enterFrom='opacity-0'
                                enterTo='opacity-1'
                                leave='transform transition ease-in-out duration-200'
                                leaveFrom='opacity-1'
                                leaveTo='opacity-0'
                            >
                                <Dialog.Panel className='pointer-events-auto h-[90vh] w-full max-w-full px-3 sm:max-w-xl'>
                                    <div className='relative h-full max-h-[1000px] min-h-[500px] flex-1 gap-2 overflow-hidden rounded-xl bg-gray-100 text-gray-900 shadow-xl dark:bg-slate-800 dark:text-slate-200'>
                                        {/* <button
                                            type='button'
                                            className='absolute top-8 right-8 text-gray-900 hover:opacity-70 focus:outline-none dark:text-slate-200'
                                            onClick={onClose}
                                        >
                                            <span className='sr-only'>Close panel</span>
                                            <XMarkIcon className='h-6 w-6 sm:h-8 sm:w-8' aria-hidden='true' />
                                        </button> */}

                                        <TwoFactor onClose={onClose} />
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

export default TwoFactorDialog
