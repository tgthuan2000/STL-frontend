/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { useLoading, useSlideOver } from '~/context'
import { useNavigate } from 'react-router-dom'
import { SlideOverProps } from '~/@types/components'

const SlideOver = ({ children }: SlideOverProps) => {
    const { isOpen, setIsOpen, title } = useSlideOver()
    const { loading } = useLoading()
    const navigate = useNavigate()

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog
                as='div'
                className='relative z-10'
                onClose={(value) => {
                    if (!loading) {
                        setIsOpen(value)
                        navigate(-1)
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
                    <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
                </Transition.Child>

                <div className='fixed inset-0 overflow-hidden'>
                    <div className='absolute inset-0 overflow-hidden'>
                        <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full'>
                            <Transition.Child
                                as={Fragment}
                                enter='transform transition ease-in-out duration-500 sm:duration-700'
                                enterFrom='translate-x-full'
                                enterTo='translate-x-0'
                                leave='transform transition ease-in-out duration-500 sm:duration-700'
                                leaveFrom='translate-x-0'
                                leaveTo='translate-x-full'
                            >
                                <Dialog.Panel className='pointer-events-auto w-screen sm:max-w-md max-w-full'>
                                    <div className='flex h-full flex-col overflow-y-auto bg-white shadow-xl'>
                                        <div className='px-4 sm:px-6 pt-6'>
                                            <div className='flex items-start justify-between'>
                                                <Dialog.Title className='text-lg font-medium text-gray-900'>
                                                    {title}
                                                </Dialog.Title>
                                                <div className='ml-3 flex h-7 items-center'>
                                                    <button
                                                        type='button'
                                                        className='rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none'
                                                        onClick={() => {
                                                            setIsOpen(false)
                                                            navigate(-1)
                                                        }}
                                                    >
                                                        <span className='sr-only'>Close panel</span>
                                                        <XIcon className='h-6 w-6' aria-hidden='true' />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex-1'>
                                            {children?.()}
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
