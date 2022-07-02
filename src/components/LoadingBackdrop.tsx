import { Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useLoading } from '~/context'
import './loading.css'

const LoadingBackdrop = () => {
    const { loading } = useLoading()
    return (
        <Transition.Root show={loading} as={Fragment}>
            <Transition.Child
                as={Fragment}
                enter='ease-in-out duration-500'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in-out duration-500'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
            >
                <div className='fixed flex items-center justify-center select-none z-50 inset-0 bg-gray-600 bg-opacity-75 transition-opacity'>
                    <LoadingIcon />
                </div>
            </Transition.Child>
        </Transition.Root>
    )
}

export default LoadingBackdrop

const LoadingIcon = () => (
    <div className='loadingio-spinner-spin-chjsysm7r39'>
        <div className='ldio-wphz9re59b'>
            <div>
                <div></div>
            </div>
            <div>
                <div></div>
            </div>
            <div>
                <div></div>
            </div>
            <div>
                <div></div>
            </div>
            <div>
                <div></div>
            </div>
            <div>
                <div></div>
            </div>
            <div>
                <div></div>
            </div>
            <div>
                <div></div>
            </div>
        </div>
    </div>
)
