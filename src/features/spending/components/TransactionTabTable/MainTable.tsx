import clsx from 'clsx'
import moment from 'moment'
import numeral from 'numeral'
import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import { ISpendingData } from '~/@types/spending'
import { DATE_FORMAT, DATE_TIME_FORMAT, TIME_FORMAT } from '~/constant'
import { KIND_SPENDING } from '~/constant/spending'
import { useWindowSize } from '~/hook'

interface MainTableProps {
    data: ISpendingData[]
}
const MainTable = ({ data }: MainTableProps) => {
    const navigate = useNavigate()
    const { width } = useWindowSize()

    return (
        <>
            {data.map(
                ({ _id, date, description, methodSpending, kindSpending, categorySpending, amount }, index, data) => (
                    <Fragment key={_id}>
                        <tr
                            onClick={() => {
                                navigate(`/spending/transaction/${_id}`)
                            }}
                        >
                            <td className={clsx('whitespace-nowrap pt-4 pl-2 pr-3 sm:pl-6 lg:pl-8')}>
                                {date ? (
                                    width <= 900 ? (
                                        <>
                                            <span>{moment(date).format(DATE_FORMAT)}</span>
                                            <br />
                                            <span>{moment(date).format(TIME_FORMAT)}</span>
                                        </>
                                    ) : (
                                        <span>{moment(date).format(DATE_TIME_FORMAT)}</span>
                                    )
                                ) : (
                                    <span>Không có thời hạn</span>
                                )}
                                <h3 className='mt-1 font-medium'>{methodSpending.name}</h3>
                            </td>
                            <td className={clsx('px-1 pt-4 text-sm font-medium text-gray-900 text-center truncate')}>
                                {categorySpending?.name ?? kindSpending.name}
                            </td>
                            <td className={clsx('whitespace-nowrap px-1 pt-4 text-sm text-center')}>
                                {[KIND_SPENDING.RECEIVE, KIND_SPENDING.TRANSFER_TO, KIND_SPENDING.GET_LOAN].includes(
                                    kindSpending.key
                                ) && (
                                    <span className={clsx('text-green-500', 'font-medium')}>
                                        {numeral(amount).format()}
                                    </span>
                                )}
                            </td>
                            <td className={clsx('whitespace-nowrap pl-1 pr-2 pt-4 text-sm text-center')}>
                                {[KIND_SPENDING.COST, KIND_SPENDING.TRANSFER_FROM, KIND_SPENDING.LOAN].includes(
                                    kindSpending.key
                                ) && (
                                    <span className={clsx('text-red-500', 'font-medium')}>
                                        {numeral(amount).format()}
                                    </span>
                                )}
                            </td>
                        </tr>
                        <tr
                            onClick={() => {
                                navigate(`/spending/transaction/${_id}`)
                            }}
                        >
                            <td
                                colSpan={4}
                                className={clsx(
                                    data && index !== data.length - 1 ? 'border-b border-gray-200' : '',
                                    'whitespace-nowrap pb-4 pl-2 pr-2 sm:pl-6 lg:pl-8'
                                )}
                            >
                                {description && (
                                    <div
                                        title={description}
                                        className='mt-2 max-w-[450px] sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] cursor-default'
                                    >
                                        {description.split('\n').map((line, index) => (
                                            <span key={index} className='block truncate'>
                                                {line}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </td>
                        </tr>
                    </Fragment>
                )
            )}
        </>
    )
}

export default MainTable
