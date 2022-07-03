import { useNavigate } from 'react-router-dom'
import { useSlideOver } from '~/context'
import AutoCompelete from './Autocomplete'

const MakeIncome = () => {
    const { setIsOpen } = useSlideOver()
    const navigate = useNavigate()

    return (
        <form className='flex h-full flex-col'>
            <div className='h-0 flex-1 overflow-y-auto'>
                <div className='flex flex-1 flex-col justify-between'>
                    <div className='divide-y divide-gray-200 px-4 sm:px-6'>
                        <div className='space-y-6 pt-6 pb-5'>
                            <div>
                                <label htmlFor='name' className='block font-medium text-gray-900'>
                                    Thu nhập
                                </label>
                                <div className='mt-1'>
                                    <input
                                        type='number'
                                        name='name'
                                        id='name'
                                        spellCheck={false}
                                        className='block p-2 w-full rounded-md border border-gray-300 shadow-sm'
                                    />
                                </div>
                            </div>
                            <div>
                                <AutoCompelete title='Thể loại' />
                            </div>
                            <div>
                                <AutoCompelete title='Phương thức thanh toán' />
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
                        className='min-w-[100px] inline-flex justify-center rounded-md border border-transparent bg-radical-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-radical-red-700 focus:outline-none'
                    >
                        Lưu
                    </button>
                    <button
                        type='button'
                        className='min-w-[100px] rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none'
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

export default MakeIncome
