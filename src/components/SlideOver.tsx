import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import React, { Fragment, Suspense } from 'react'
import { useLoading, useSlideOverConfig } from '~/context'

export interface Props {}

const SlideOver: React.FC<Props> = () => {
    const { loading } = useLoading()
    const { isOpen, title, content, fallback, close } = useSlideOverConfig()

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog
                as='div'
                className='relative z-30'
                onClose={(value) => {
                    if (!loading.config) {
                        close()
                    }
                }}
            >
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
                        <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full'>
                            <Transition.Child
                                as={Fragment}
                                enter='transform transition ease-in-out duration-500'
                                enterFrom='translate-x-full opacity-0'
                                enterTo='translate-x-0'
                                leave='transform transition ease-in-out duration-500'
                                leaveFrom='translate-x-0'
                                leaveTo='translate-x-full opacity-0'
                            >
                                <Dialog.Panel className='pointer-events-auto w-screen max-w-full sm:max-w-md'>
                                    <div className='flex h-full flex-col overflow-y-auto bg-white shadow-xl dark:bg-slate-800'>
                                        <div className='px-4 pt-6 pb-3 sm:px-6'>
                                            <div className='flex items-start justify-between'>
                                                <Dialog.Title className='text-lg font-medium text-gray-900 dark:text-white'>
                                                    {title}
                                                </Dialog.Title>
                                                <div className='ml-3 flex h-7 items-center'>
                                                    <button
                                                        type='button'
                                                        className='rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none dark:bg-transparent dark:text-slate-100 dark:hover:text-slate-200'
                                                        onClick={close}
                                                    >
                                                        <span className='sr-only'>Close panel</span>
                                                        <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='h-full flex-1 overflow-hidden'>
                                            <Suspense fallback={fallback}>{content}</Suspense>
                                            {/* /End replace */}
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

export default SlideOver
