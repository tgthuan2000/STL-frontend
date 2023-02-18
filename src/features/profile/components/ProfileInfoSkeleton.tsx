import clsx from 'clsx'

const ProfileInfoSkeleton = () => {
    return (
        <>
            <div className='bg-transparent p-2 sm:p-3 xl:col-span-3 xl:col-start-2 xl:row-span-1 xl:row-start-2'>
                <SkeletonItem quantity={4} className='xl:flex-row xl:flex-wrap' />
            </div>
            <div className='bg-transparent p-2 sm:p-3 xl:col-span-1 xl:col-start-1 xl:row-span-3 xl:row-start-1'>
                <SkeletonItem quantity={3} />
            </div>
            <div className='bg-transparent p-2 sm:p-3 xl:col-span-1 xl:col-start-2 xl:row-span-1 xl:row-start-1'>
                <SkeletonItem quantity={2} />
            </div>
        </>
    )
}

const SkeletonItem = ({ quantity, className }: { quantity: number; className?: string }) => (
    <>
        <div className='h-6 w-40 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700' />
        <div className={clsx('mt-2 flex flex-col gap-2', className)}>
            {Array.from(Array(quantity)).map((_, i) => (
                <div
                    key={i}
                    className='flex w-full flex-1 animate-pulse flex-col items-start gap-1 overflow-hidden rounded bg-slate-100 p-5 dark:bg-slate-600 sm:py-7 sm:px-5'
                >
                    <div className='block w-full flex-shrink-0 truncate text-left' />
                    <div className='w-full flex-1' />
                </div>
            ))}
        </div>
    </>
)

export default ProfileInfoSkeleton
