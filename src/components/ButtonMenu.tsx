import { ClipboardListIcon, MinusCircleIcon, PlusCircleIcon, SwitchHorizontalIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import { SVGProps } from 'react'
import { Link, To } from 'react-router-dom'
import { SlideOverProvider, useSlideOver } from '~/context'
import SlideOver from './SlideOver'
import { useState } from 'react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { Combobox } from '@headlessui/react'

interface IMenuBtn {
    title: string
    icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
    color: string
    to?: To
    children?: (setIsOpen: (isOpen: boolean) => void) => React.ReactNode | React.ReactNode
}

const menuBtns: IMenuBtn[] = [
    {
        title: 'Thêm thu nhập',
        color: 'text-radical-red-700 bg-radical-red-200 hover:bg-radical-red-300',
        icon: PlusCircleIcon,
        children: () => <MakeIncome />,
    },
    {
        title: 'Thêm chi phí',
        color: 'text-prussian-blue-700 bg-prussian-blue-200 hover:bg-prussian-blue-300',
        icon: MinusCircleIcon,
    },
    {
        title: 'Chuyển khoản',
        color: 'text-green-700 bg-green-200 hover:bg-green-300',
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

const ButtonMenu = ({ className }: { className?: string }) => {
    return (
        <div className={clsx('min-h-[240px] max-w-lg mx-auto grid grid-cols-2 xl:grid-cols-1 gap-2', className)}>
            {menuBtns.map((menuBtn) => (
                <SlideOverProvider key={menuBtn.title}>
                    <ButtonItem data={menuBtn} />
                </SlideOverProvider>
            ))}
        </div>
    )
}

interface ButtonProps {
    data: IMenuBtn
}

const ButtonItem = ({ data }: ButtonProps) => {
    const { title, color, icon: Icon, children, ...props } = data
    const { setIsOpen, setTitle } = useSlideOver()

    const handleClick = () => {
        setIsOpen(true)
        setTitle(title)
    }

    const Component = (data.to ? Link : 'button') as any

    return (
        <>
            <Component
                {...props}
                onClick={handleClick}
                className={clsx(
                    'inline-flex items-center justify-center flex-col py-2 space-y-2 border border-transparent font-medium rounded-md focus:outline-none',
                    color
                )}
            >
                <Icon className='w-10 h-10' />
                <span>{title}</span>
            </Component>
            <SlideOver>{children}</SlideOver>
        </>
    )
}

const MakeIncome = () => {
    const { setIsOpen } = useSlideOver()
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
                        onClick={() => setIsOpen(false)}
                    >
                        Hủy bỏ
                    </button>
                </div>
            </div>
        </form>
    )
}

const people = [{ id: 1, name: 'Leslie Alexander' }]

interface AutoCompeleteProps {
    title?: string
}

const AutoCompelete = ({ title }: AutoCompeleteProps) => {
    const [query, setQuery] = useState('')
    const [selectedPerson, setSelectedPerson] = useState()

    const filteredPeople =
        query === ''
            ? people
            : people.filter((person) => {
                  return person.name.toLowerCase().includes(query.toLowerCase())
              })

    return (
        <Combobox as='div' value={selectedPerson} onChange={setSelectedPerson}>
            <Combobox.Label className='block text-sm font-medium text-gray-700'>{title}</Combobox.Label>
            <div className='relative mt-1'>
                <Combobox.Input
                    className='w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm'
                    onChange={(event) => setQuery(event.target.value)}
                    displayValue={(person: any) => person?.name}
                />
                <Combobox.Button className='absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none'>
                    <SelectorIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
                </Combobox.Button>

                {filteredPeople.length > 0 && (
                    <Combobox.Options className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                        {filteredPeople.map((person) => (
                            <Combobox.Option
                                key={person.id}
                                value={person}
                                className={({ active }) =>
                                    clsx(
                                        'relative cursor-default select-none py-2 pl-8 pr-4',
                                        active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                                    )
                                }
                            >
                                {({ active, selected }) => (
                                    <>
                                        <span className={clsx('block truncate', selected && 'font-semibold')}>
                                            {person.name}
                                        </span>

                                        {selected && (
                                            <span
                                                className={clsx(
                                                    'absolute inset-y-0 left-0 flex items-center pl-1.5',
                                                    active ? 'text-white' : 'text-indigo-600'
                                                )}
                                            >
                                                <CheckIcon className='h-5 w-5' aria-hidden='true' />
                                            </span>
                                        )}
                                    </>
                                )}
                            </Combobox.Option>
                        ))}
                    </Combobox.Options>
                )}
            </div>
        </Combobox>
    )
}

export default ButtonMenu
