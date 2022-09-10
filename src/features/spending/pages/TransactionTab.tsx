import { useEffect, useState } from 'react'
import { lazily } from 'react-lazily'
import { TAB_TABLE } from '~/constant/spending'

const { TransactionTabTable } = lazily(() => import('../components'))

type TabTable = keyof typeof TAB_TABLE

interface TransactionTabProps {
    by: TabTable
}

const TransactionTab: React.FC<TransactionTabProps> = ({ by }) => {
    const [query, setQuery] = useState('')

    useEffect(() => {
        ;(async () => {
            const query = await import('~/schema/query/spending')
            const { GETALL_RECENT_SPENDING, GET_RECENT_SPENDING_FILTER_DATE } = query
            const queries = {
                ALL: GETALL_RECENT_SPENDING,
                DAY: GET_RECENT_SPENDING_FILTER_DATE,
                WEEK: GET_RECENT_SPENDING_FILTER_DATE,
                MONTH: GET_RECENT_SPENDING_FILTER_DATE,
                YEAR: GET_RECENT_SPENDING_FILTER_DATE,
            }

            setQuery(queries[by])
        })()
    }, [by])

    if (!query) return <></>

    return <TransactionTabTable query={{ recent: query }} />
}

export default TransactionTab
