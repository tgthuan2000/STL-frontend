const BudgetSkeleton = () => (
    <ul role='list' className='select-none pointer-events-none divide-y divide-gray-300 dark:divide-slate-700'>
        {Array.from(Array(5)).map((value, index) => (
            <li key={index}>
                <div className='flex justify-between px-2 mt-2'>
                    <span className='animate-pulse bg-gray-200 dark:bg-slate-700 h-4 w-1/3 rounded-full' />
                    <span className='animate-pulse bg-gray-200 dark:bg-slate-700 h-4 w-1/4 rounded-full' />
                </div>
                <div className='relative mx-2 my-2 h-4'>
                    <span className='animate-pulse bg-gray-200 dark:bg-slate-700 absolute w-full h-full rounded-full' />
                </div>
                <div className='flex justify-between px-2 mb-4'>
                    <span className='animate-pulse bg-gray-200 dark:bg-slate-700 h-4 w-1/4 rounded-full' />
                    <span className='animate-pulse bg-gray-200 dark:bg-slate-700 h-4 w-1/3 rounded-full' />
                </div>
            </li>
        ))}
    </ul>
)

export default BudgetSkeleton
