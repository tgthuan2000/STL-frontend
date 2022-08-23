import clsx from 'clsx'
import React from 'react'

const Divider: React.FC<{ className?: string }> = ({ className }) => (
    <div className={clsx('flex items-center max-w-lg mx-auto', className)} aria-hidden='true'>
        <div className='w-full border-t border-gray-300' />
    </div>
)

export default Divider
