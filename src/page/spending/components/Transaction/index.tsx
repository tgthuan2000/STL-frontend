import Box from './Box'

const Transaction = ({ children }: { children?: React.ReactNode }) => (
    <div className='grid xl:grid-cols-2 grid-cols-1 xl:gap-6 gap-4'>{children}</div>
)

Transaction.Box = Box

export default Transaction
