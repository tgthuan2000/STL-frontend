import { ClipboardListIcon, MinusCircleIcon, PlusCircleIcon, SwitchHorizontalIcon } from '@heroicons/react/outline'
import clsx from 'clsx'

const menuBtns = [
    {
        title: 'Thêm thu nhập',
        color: 'text-radical-red-700 bg-radical-red-200 hover:bg-radical-red-300',
        icon: PlusCircleIcon,
    },
    {
        title: 'Thêm chi phí',
        color: 'text-prussian-blue-700 bg-prussian-blue-200 hover:bg-prussian-blue-300',
        icon: MinusCircleIcon,
    },
    { title: 'Chuyển khoản', color: 'text-green-700 bg-green-200 hover:bg-green-300', icon: SwitchHorizontalIcon },
    { title: 'Giao dịch', color: 'text-orange-700 bg-orange-200 hover:bg-orange-300', icon: ClipboardListIcon },
]

const ButtonMenu = () => {
    return (
        <div className='min-h-[240px] max-w-lg mx-auto grid grid-cols-2 gap-2'>
            {menuBtns.map((menuBtn) => (
                <button
                    key={menuBtn.title}
                    type='button'
                    className={clsx(
                        'inline-flex items-center justify-center flex-col py-2 space-y-2 border border-transparent font-medium rounded-md focus:outline-none',
                        menuBtn.color
                    )}
                >
                    <menuBtn.icon className='w-10 h-10' />
                    <span>{menuBtn.title}</span>
                </button>
            ))}
        </div>
    )
}

export default ButtonMenu
