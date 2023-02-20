const BudgetSkeleton = () => (
    <ul role='list' className='pointer-events-none select-none divide-y divide-gray-300 dark:divide-slate-700'>
        {Array.from(Array(5)).map((value, index) => (
            <li key={index}>
                <div className='mt-2 flex justify-between px-2'>
                    <span className='h-4 w-1/3 animate-pulse rounded-full bg-gray-200 dark:bg-slate-700' />
                    <span className='h-4 w-1/4 animate-pulse rounded-full bg-gray-200 dark:bg-slate-700' />
                </div>
                <div className='relative mx-2 my-2 h-4'>
                    <span className='absolute h-full w-full animate-pulse rounded-full bg-gray-200 dark:bg-slate-700' />
                </div>
                <div className='mb-4 flex justify-between px-2'>
                    <span className='h-4 w-1/4 animate-pulse rounded-full bg-gray-200 dark:bg-slate-700' />
                    <span className='h-4 w-1/3 animate-pulse rounded-full bg-gray-200 dark:bg-slate-700' />
                </div>
            </li>
        ))}
    </ul>
)

export default BudgetSkeleton
