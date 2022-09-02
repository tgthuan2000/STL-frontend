const RecentSkeleton = () => (
    <ul role='list' className='divide-y divide-gray-300 select-none pointer-events-none'>
        {Array.from(Array(5)).map((value, index) => (
            <li key={index}>
                <div className='px-4 py-3 flex'>
                    <div className='w-2/3 space-y-1'>
                        <div className='animate-pulse bg-gray-200 rounded-full h-4 w-2/3' />
                        <div className='animate-pulse bg-gray-200 rounded-full h-4 w-1/2' />
                        <div className='animate-pulse bg-gray-200 rounded-full h-4 w-1/3' />
                    </div>
                    <div className='w-1/3 space-y-1 flex flex-col items-end'>
                        <div className='animate-pulse bg-gray-200 rounded-full h-4 w-1/2' />
                        <div className='animate-pulse bg-gray-200 rounded-full h-4 w-full' />
                    </div>
                </div>
            </li>
        ))}
    </ul>
)
export default RecentSkeleton
