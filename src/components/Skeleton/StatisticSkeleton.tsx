const StatisticSkeleton = () => {
    return (
        <div className='grid grid-cols-3 gap-x-4 py-8 animate-pulse'>
            {Array.from(Array(3)).map((value, index) => (
                <div key={index} className='flex flex-col justify-center items-center gap-y-3'>
                    <h4 className='xl:h-4 h-3.5 xl:w-1/3 w-1/2 rounded-full bg-gray-200' />
                    <span className='xl:h-4 h-3.5 xl:w-1/2 w-2/3 rounded-full bg-gray-200' />
                </div>
            ))}
        </div>
    )
}
export default StatisticSkeleton
