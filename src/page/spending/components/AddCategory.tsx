import { useNavigate } from 'react-router-dom'
import { Button, Selection } from '~/components'
import { SlideOverHOC, useConfig, useSlideOver } from '~/context'

const AddCategory = () => {
    const { setIsOpen } = useSlideOver()
    const navigate = useNavigate()
    const { kindSpending } = useConfig()

    return (
        <form className='flex h-full flex-col'>
            <div className='h-0 flex-1 overflow-y-auto'>
                <div className='flex flex-1 flex-col justify-between'>
                    <div className='divide-y divide-gray-200 px-4 sm:px-6'>
                        <div className='space-y-6 pt-6 pb-5'>
                            <div>
                                <Selection
                                    title='Thể loại'
                                    placeholder='--- Chọn thể loại ---'
                                    data={kindSpending}
                                    idKey='_id'
                                    valueKey='name'
                                />
                            </div>
                            <div>
                                <label htmlFor='name' className='block font-medium text-gray-900'>
                                    Tên thể loại
                                </label>
                                <div className='mt-1'>
                                    <input
                                        type='text'
                                        name='name'
                                        id='name'
                                        spellCheck={false}
                                        className='block p-2 w-full rounded-md border border-gray-300 shadow-sm'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6'>
                <div className='flex sm:justify-start justify-end space-x-3'>
                    <Button color='cyan' type='submit'>
                        Tạo
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

export default SlideOverHOC(AddCategory)
