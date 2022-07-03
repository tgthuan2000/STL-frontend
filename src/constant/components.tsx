import { ClipboardListIcon, MinusCircleIcon, PlusCircleIcon, SwitchHorizontalIcon } from '@heroicons/react/outline'
import { IMenuBtn } from '~/@types/components'
import { MakeIncome, MakeCost } from '~/components'

export const menuBtns: IMenuBtn[] = [
    {
        title: 'Thêm thu nhập',
        color: 'text-green-700 bg-green-200 hover:bg-green-300',
        icon: PlusCircleIcon,
        children: () => <MakeIncome />,
        to: '?slide=add-income',
        query: {
            slide: 'add-income',
        },
    },
    {
        title: 'Thêm chi phí',
        color: 'text-radical-red-700 bg-radical-red-200 hover:bg-radical-red-300',
        icon: MinusCircleIcon,
        children: () => <MakeCost />,
        to: '?slide=add-payment',
        query: {
            slide: 'add-payment',
        },
    },
    {
        title: 'Chuyển khoản',
        color: 'text-prussian-blue-700 bg-prussian-blue-200 hover:bg-prussian-blue-300',
        icon: SwitchHorizontalIcon,
        to: 'abc',
    },
    {
        title: 'Giao dịch',
        color: 'text-orange-700 bg-orange-200 hover:bg-orange-300',
        icon: ClipboardListIcon,
        to: 'abc',
    },
]

export const people = [{ id: 1, name: 'Leslie Alexander' }]
