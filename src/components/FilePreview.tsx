import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Fragment, useMemo } from 'react'
import { useFilePreviewConfig, useLoading } from '~/context'

const FilePreview = () => {
    const { file, type, clear } = useFilePreviewConfig()
    const { loading } = useLoading()
    const isShow = !!file

    const getFile = useMemo(() => {
        if (!file) return null
        switch (type) {
            case 'image':
                return <img src={file} className='object-cover' />
            default:
                return null
        }
    }, [file])

    return (
        <Transition.Root show={isShow} as={Fragment}>
            <Dialog
                as='div'
                className='relative z-50'
                onClose={(value) => {
                    if (!loading.config) {
                        clear()
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
                    <div className='fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity dark:bg-slate-900 dark:bg-opacity-80' />
                </Transition.Child>

                <div className='fixed inset-0 overflow-hidden'>
                    <div className='absolute inset-0 overflow-hidden'>
                        <div className='pointer-events-none fixed inset-y-0 right-1/2 flex max-w-full translate-x-1/2'>
                            <Transition.Child
                                as={Fragment}
                                enter='transform transition ease-in-out duration-500'
                                enterFrom='translate-y-full opacity-0'
                                enterTo='translate-y-0'
                                leave='transform transition ease-in-out duration-500'
                                leaveFrom='translate-y-0'
                                leaveTo='translate-y-full opacity-0'
                            >
                                <Dialog.Panel className='pointer-events-auto w-screen max-w-full sm:max-w-6xl'>
                                    <div className='flex h-full flex-col items-center justify-center overflow-y-auto bg-gray-900 shadow-xl dark:bg-slate-800'>
                                        <div className='fixed right-5 top-5'>
                                            <button
                                                type='button'
                                                className='text-white focus:outline-none'
                                                onClick={() => {
                                                    clear()
                                                }}
                                            >
                                                <span className='sr-only'>Close panel</span>
                                                <XMarkIcon className='h-6 w-6 sm:h-8 sm:w-8' aria-hidden='true' />
                                            </button>
                                        </div>
                                        {getFile}
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

export default FilePreview
