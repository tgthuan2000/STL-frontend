const Box2UserLoanSkeleton = () => {
    return (
        <>
            {Array.from(Array(5))?.map((item, index) => {
                return (
                    <div
                        className='flex animate-pulse group items-center bg-white gap-x-3 py-3 px-3 lg:px-6 border rounded-md shadow-md'
                        key={index}
                    >
                        <div className='flex-shrink-0 lg:w-14 w-12 lg:h-14 h-12 rounded-full bg-gray-200' />
                        <div className='flex flex-col gap-2'>
                            <span className='w-20 h-5 bg-gray-100 rounded-full'></span>
                            <span className='w-14 h-5 bg-gray-100 rounded-full'></span>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default Box2UserLoanSkeleton
