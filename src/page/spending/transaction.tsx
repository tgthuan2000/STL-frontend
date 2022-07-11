import { ArrowSmLeftIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import moment from 'moment'
import { Fragment } from 'react'
import NumberFormat from 'react-number-format'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Selection } from '~/components'

const Transaction = () => {
    const navigate = useNavigate()
    return (
        <div>
            <div className='flex items-center text-gray-900 space-x-2 sm:mb-2 mb-4 select-none'>
                <ArrowSmLeftIcon
                    className='h-7 w-7 hover:opacity-50 cursor-pointer'
                    onClick={() => {
                        navigate(-1)
                    }}
                />
                <h4 className='xl:text-2xl text-xl font-semibold'>Giao dịch</h4>
            </div>
            <div className=''>
                <Tabs />
            </div>
            <div>
                <Table />
            </div>
        </div>
    )
}

export default Transaction

const tabs: { name: string; href: string; current: boolean }[] = [
    { name: 'Tất cả', href: 'all', current: true },
    { name: 'Hàng ngày', href: 'day', current: false },
    { name: 'Hàng tuần', href: 'week', current: false },
    { name: 'Hàng tháng', href: 'month', current: false },
    { name: 'Hàng năm', href: 'year', current: false },
]

const Tabs = () => {
    const navigate = useNavigate()
    return (
        <div className='block'>
            <div className='border-b border-gray-200'>
                <nav className='-mb-px flex sm:space-x-8 space-x-2' aria-label='Tabs'>
                    {tabs.map((tab) => (
                        <Link
                            key={tab.name}
                            to={'?tab-view=' + tab.href}
                            onClick={(e) => {
                                // Update the URL to match the selected tab.
                                e.preventDefault()
                                navigate('?tab-view=' + tab.href, {
                                    replace: true,
                                })
                            }}
                            className={clsx(
                                tab.current
                                    ? 'border-indigo-500 text-indigo-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm select-none'
                            )}
                            aria-current={tab.current ? 'page' : undefined}
                        >
                            {tab.name}
                        </Link>
                    ))}
                </nav>
            </div>
        </div>
    )
}

const people = [
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    // More people...
]

const Table = () => {
    return (
        <div className='px-4 sm:px-6 lg:px-8'>
            <div className='mt-8 flex flex-col'>
                <div className='-my-2 -mx-4 sm:-mx-6 lg:-mx-8'>
                    <div className='inline-block min-w-full py-2 align-middle'>
                        <div className='shadow-sm ring-1 ring-black ring-opacity-5'>
                            <table className='min-w-full border-separate' style={{ borderSpacing: 0 }}>
                                <thead className='bg-gray-50 select-none'>
                                    <tr>
                                        <th
                                            scope='col'
                                            className='sticky top-14 sm:top-16 md:top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8'
                                        >
                                            Ngày
                                        </th>
                                        <th
                                            scope='col'
                                            className='sticky top-14 sm:top-16 md:top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter'
                                        >
                                            Thể loại
                                        </th>
                                        <th
                                            scope='col'
                                            className='text-green-500 sticky top-14 sm:top-16 md:top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold backdrop-blur backdrop-filter'
                                        >
                                            Thu nhập
                                        </th>
                                        <th
                                            scope='col'
                                            className='text-red-500 sticky top-14 sm:top-16 md:top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold backdrop-blur backdrop-filter'
                                        >
                                            Chi phí
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className='bg-white'>
                                    {people.map((person, personIdx) => (
                                        <Link to='#' key={person.email} className='table-row'>
                                            <td
                                                className={clsx(
                                                    personIdx !== people.length - 1 ? 'border-b border-gray-200' : '',
                                                    'whitespace-nowrap py-4 pl-4 pr-3 sm:pl-6 lg:pl-8'
                                                )}
                                            >
                                                <span>{moment().format('DD/MM/YYYY HH:mm:ss')}</span>
                                                <h3 className='font-medium truncate'>XEMPHIM</h3>
                                                <span title={'Hello'}>
                                                    {'Hello'.split('\n').map((line, index) => (
                                                        <Fragment key={index}>
                                                            <span className='truncate'>{line}</span>
                                                            <br />
                                                        </Fragment>
                                                    ))}
                                                </span>
                                            </td>
                                            <td
                                                className={clsx(
                                                    personIdx !== people.length - 1 ? 'border-b border-gray-200' : '',
                                                    'whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900'
                                                )}
                                            >
                                                Chi phí khác
                                            </td>
                                            <td
                                                className={clsx(
                                                    personIdx !== people.length - 1 ? 'border-b border-gray-200' : '',
                                                    'whitespace-nowrap px-3 py-4 text-sm text-gray-500'
                                                )}
                                            ></td>
                                            <td
                                                className={clsx(
                                                    personIdx !== people.length - 1 ? 'border-b border-gray-200' : '',
                                                    'whitespace-nowrap px-3 py-4 text-sm text-gray-500'
                                                )}
                                            >
                                                <NumberFormat
                                                    className={clsx('text-red-500', 'font-medium')}
                                                    value={'100000000'}
                                                    displayType='text'
                                                    thousandSeparator
                                                />
                                            </td>
                                        </Link>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
