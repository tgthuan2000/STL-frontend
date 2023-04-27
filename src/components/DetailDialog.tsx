import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Fragment, Suspense, memo } from 'react'
import { useConfigDetailDialog } from '~/context'

const DetailDialog = () => {
    const { content, isOpen, title, fallback, close } = useConfigDetailDialog()

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as='div' className='relative z-30' onClose={close}>
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
                        <div className='pointer-events-none fixed top-1/2 left-1/2 flex max-w-full -translate-x-1/2 -translate-y-1/2'>
                            <Transition.Child
                                as={Fragment}
                                enter='transform transition ease-in-out duration-500'
                                enterFrom='translate-y-full opacity-0'
                                enterTo='translate-y-0'
                                leave='transform transition ease-in-out duration-500'
                                leaveFrom='translate-y-0'
                                leaveTo='translate-y-full opacity-0'
                            >
                                <Dialog.Panel className='pointer-events-auto h-screen max-h-full w-screen max-w-full sm:h-auto sm:max-h-[80vh] sm:max-w-lg'>
                                    <div className='flex h-full flex-col overflow-y-auto rounded-t-xl bg-white shadow-xl dark:bg-slate-800 sm:rounded-xl'>
                                        <div className='px-4 pt-6 pb-3 sm:px-6'>
                                            <div className='flex items-start justify-between'>
                                                <Dialog.Title
                                                    as='div'
                                                    className='text-lg font-medium text-gray-900 dark:text-white'
                                                >
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

export default memo(DetailDialog)
