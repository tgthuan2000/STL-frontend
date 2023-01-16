import clsx from 'clsx'

const ProfileInfoSkeleton = () => {
    return (
        <>
            <div className='p-2 sm:p-3 bg-transparent xl:row-start-2 xl:col-start-2 xl:col-span-3 xl:row-span-1'>
                <SkeletonItem quantity={4} className='xl:flex-row xl:flex-wrap' />
            </div>
            <div className='p-2 sm:p-3 bg-transparent xl:row-start-1 xl:col-start-1 xl:col-span-1 xl:row-span-3'>
                <SkeletonItem quantity={3} />
            </div>
            <div className='p-2 sm:p-3 bg-transparent xl:row-start-1 xl:col-start-2 xl:col-span-1 xl:row-span-1'>
                <SkeletonItem quantity={2} />
            </div>
        </>
    )
}

const SkeletonItem = ({ quantity, className }: { quantity: number; className?: string }) => (
    <>
        <div className='h-6 w-40 rounded-full bg-slate-200 animate-pulse' />
        <div className={clsx('mt-2 flex gap-2 flex-col', className)}>
            {Array.from(Array(quantity)).map((_, i) => (
                <div
                    key={i}
                    className='flex-1 w-full overflow-hidden flex flex-col items-start gap-1 p-5 sm:py-7 sm:px-5 bg-slate-100 rounded animate-pulse'
                >
                    <div className='flex-shrink-0 block w-full text-left truncate' />
                    <div className='flex-1 w-full' />
                </div>
            ))}
        </div>
    </>
)

export default ProfileInfoSkeleton
