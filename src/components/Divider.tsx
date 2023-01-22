import clsx from 'clsx'
import React from 'react'

const Divider: React.FC<{ className?: string; dashed?: boolean }> = ({ className, dashed }) => (
    <div className={clsx('flex items-center max-w-lg mx-auto', className)} aria-hidden='true'>
        <div className={clsx('w-full border-t border-gray-300 dark:border-slate-600', { 'border-dashed': dashed })} />
    </div>
)

export default Divider
