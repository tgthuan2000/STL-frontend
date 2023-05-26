import React from 'react'

interface Props {
    renderTitle: React.ReactNode
    renderChart: React.ReactNode
    renderTool?: React.ReactNode
}
const TransactionChart: React.FC<Props> = (props) => {
    const { renderChart, renderTitle, renderTool } = props

    return (
        <div className='text-gray-900 dark:text-slate-200'>
            <div className='flex items-center justify-between px-5 py-3'>
                {renderTitle}
                {renderTool}
            </div>
            {renderChart}
        </div>
    )
}

export default TransactionChart
