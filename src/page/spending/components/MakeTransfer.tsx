import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { AutoComplete, Button } from '~/components'
import { SlideOverHOC, useSlideOver } from '~/context'

const MakeTransfer = () => {
    const { setIsOpen } = useSlideOver()
    const navigate = useNavigate()
    const ref = useRef<HTMLInputElement>(null)

    useEffect(() => {
        ref.current?.focus()
    }, [])

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
                                <AutoComplete title='Từ phương thức thanh toán' />
                            </div>
                            <div>
                                <AutoComplete title='Đến phương thức thanh toán' />
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
                    <Button color='blue' type='submit'>
                        Chuyển khoản
                    </Button>
                    <Button
                        color='outline'
                        type='button'
                        onClick={() => {
                            setIsOpen(false)
                            navigate(-1)
                        }}
                    >
                        Hủy bỏ
                    </Button>
                </div>
            </div>
        </form>
    )
}

export default SlideOverHOC(MakeTransfer)
