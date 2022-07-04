import { useCallback, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSlideOver } from '~/context'
import useEventListener from '~/hook/useEventListener'
import AutoCompelete from './Autocomplete'

const MakeTransfer = () => {
    const { setIsOpen } = useSlideOver()
    const navigate = useNavigate()
    const ref = useRef<HTMLInputElement>(null)

    useEffect(() => {
        ref.current?.focus()
    }, [])

    const handler = useCallback(() => {
        setIsOpen(false)
    }, [])

    useEventListener('popstate', handler)

    return (
        <form className='flex h-full flex-col'>
            <div className='h-0 flex-1 overflow-y-auto'>
                <div className='flex flex-1 flex-col justify-between'>
                    <div className='divide-y divide-gray-200 px-4 sm:px-6'>
                        <div className='space-y-6 pt-6 pb-5'>
                            <div>
                                <label htmlFor='name' className='block font-medium text-gray-900'>
                                    Số tiền
                                </label>
                                <div className='mt-1'>
                                    <input
                                        ref={ref}
                                        type='number'
                                        name='name'
                                        id='name'
                                        spellCheck={false}
                                        className='block p-2 w-full rounded-md border border-gray-300 shadow-sm'
                                    />
                                </div>
                            </div>
                            <div>
                                <AutoCompelete title='Từ phương thức thanh toán' />
                            </div>
                            <div>
                                <AutoCompelete title='Đến phương thức thanh toán' />
                            </div>
                            <div>
                                <label htmlFor='description' className='block font-medium text-gray-900'>
                                    Ghi chú
                                </label>
                                <div className='mt-1'>
                                    <textarea
                                        id='description'
                                        name='description'
                                        spellCheck={false}
                                        rows={4}
                                        className='block p-2 w-full rounded-md border border-gray-300 shadow-sm'
                                        defaultValue={''}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6'>
                <div className='flex sm:justify-start justify-end space-x-3'>
                    <button
                        type='submit'
                        className='min-w-[100px] sm:w-auto w-1/2 inline-flex justify-center rounded-md border border-transparent bg-blue-600 sm:py-2 py-3 px-4 sm:text-sm text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none'
                    >
                        Chuyển khoản
                    </button>
                    <button
                        type='button'
                        className='min-w-[100px] sm:w-auto w-1/2 rounded-md border border-gray-300 bg-white sm:py-2 py-3 px-4 sm:text-sm text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none'
                        onClick={() => {
                            setIsOpen(false)
                            navigate(-1)
                        }}
                    >
                        Hủy bỏ
                    </button>
                </div>
            </div>
        </form>
    )
}

export default MakeTransfer
