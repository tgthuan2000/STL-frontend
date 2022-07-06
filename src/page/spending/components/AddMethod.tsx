import { useCallback, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input } from '~/components'
import { useSlideOver } from '~/context'
import useEventListener from '~/hook/useEventListener'

const AddMethod = () => {
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
                            <Input type='text' name='name' label='Tên phương thức thanh toán' ref={ref} />
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

export default AddMethod
