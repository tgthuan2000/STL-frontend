import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import React, { Fragment } from 'react'

interface TwoFactorDialogProps {
    isShow: boolean
    title: string
    onClose: () => void
}

const TwoFactorDialog: React.FC<TwoFactorDialogProps> = ({ isShow, onClose, title }) => {
    return (
        <Transition.Root show={isShow} as={Fragment}>
            <Dialog
                as='div'
                className='relative z-50'
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
                                <Dialog.Panel className='pointer-events-auto mx-3 h-[80vh] w-screen max-w-full sm:max-w-4xl'>
                                    <div className='relative h-full min-h-[500px] flex-1 gap-2 overflow-y-auto rounded-xl bg-gray-100 p-8 text-gray-900 shadow-xl dark:bg-slate-800 dark:text-slate-200 sm:p-10'>
                                        <button
                                            type='button'
                                            className='absolute top-8 right-8 text-gray-900 hover:opacity-70 focus:outline-none dark:text-slate-200'
                                            onClick={onClose}
                                        >
                                            <span className='sr-only'>Close panel</span>
                                            <XMarkIcon className='h-6 w-6 sm:h-8 sm:w-8' aria-hidden='true' />
                                        </button>
                                        <div className='flex h-full flex-col'>
                                            {/* CORE */}
                                            {/* Title of dialog */}
                                            <h1 className='flex-shrink-0 select-none text-2xl font-normal sm:text-3xl'>
                                                {title}
                                            </h1>
                                            {/* Content */}
                                            <div className='flex flex-1 flex-col items-center justify-center gap-3'>
                                                <h2 className='text-lg font-normal'>Scan QR code</h2>
                                                <p className='text-center text-sm'>
                                                    Scan the image below with the 2FA authenticator app on your phone.
                                                </p>
                                                <span className='inline-block h-48 w-48 rounded-md bg-pink-500' />
                                                <form></form>
                                            </div>
                                            {/* Footer */}
                                            <div className='flex-shrink-0 select-none'>
                                                <div className=' flex justify-end gap-2'>
                                                    <button type='button' className='font-medium text-pink-500'>
                                                        Create
                                                    </button>
                                                    <button type='button' className='text-gray-400' onClick={onClose}>
                                                        Cancel
                                                    </button>
                                                </div>
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

export default TwoFactorDialog
