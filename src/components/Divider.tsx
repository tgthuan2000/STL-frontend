import clsx from 'clsx'

const Divider = ({ className }: { className?: string }) => (
    <div className={clsx('flex items-center max-w-lg mx-auto', className)} aria-hidden='true'>
        <div className='w-full border-t border-gray-300' />
    </div>
)

export default Divider
