const Box2LoanSkeleton = () => {
    return (
        <>
            {Array.from(Array(5))?.map((item, index) => {
                return (
                    <div
                        key={index}
                        className='animate-pulse flex flex-col group bg-white gap-x-3 gap-y-2 py-3 px-3 border rounded-md cursor-wait shadow-md'
                    >
                        <div className='flex flex-shrink-0'>
                            <div className='w-8 h-8 rounded-full bg-gray-200' />
                            <div className='w-8 h-8 rounded-full bg-gray-200' />
                            <div className='w-8 h-8 rounded-full bg-gray-200' />
                        </div>
                        <span className='w-20 h-8 bg-gray-100 rounded-full' />
                        <span className='w-40 h-8 bg-gray-100 rounded-full' />
                        <span className='w-28 h-8 bg-gray-100 rounded-full' />
                    </div>
                )
            })}
        </>
    )
}

export default Box2LoanSkeleton
