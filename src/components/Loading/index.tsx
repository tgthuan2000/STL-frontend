import { Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useLoading } from '~/context'
import LoadingIcon from './LoadingIcon'

const Loading = () => {
    const {
        loading: { config, submit },
    } = useLoading()

    return (
        <Transition.Root show={config || submit} as={Fragment}>
            <Transition.Child
                as={Fragment}
                enter='ease-in-out duration-500'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in-out duration-500'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
            >
                <div className='fixed select-none z-50 inset-0'>
                    <div className='w-full h-full pointer-events-none flex items-center justify-center bg-gray-600 bg-opacity-75 transition-opacity'>
                        <LoadingIcon />
                    </div>
                </div>
            </Transition.Child>
        </Transition.Root>
    )
}

export default Loading
