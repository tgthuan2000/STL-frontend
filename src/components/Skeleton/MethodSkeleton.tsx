const MethodSkeleton = () => (
    <ul role='list' className='select-none pointer-events-none'>
        {Array.from(Array(5)).map((value, index) => (
            <li key={index}>
                <div className='px-4 py-4 flex'>
                    <div className='w-2/3 space-y-1'>
                        <div className='animate-pulse bg-gray-200 rounded-full h-4 w-2/3' />
                    </div>
                    <div className='w-1/3 space-y-1 flex flex-col items-end'>
                        <div className='animate-pulse bg-gray-200 rounded-full h-4 w-2/3' />
                    </div>
                </div>
            </li>
        ))}
    </ul>
)
export default MethodSkeleton
