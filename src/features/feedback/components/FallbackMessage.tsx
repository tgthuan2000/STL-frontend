import { SayHiImage } from '~/components'

const Fallback = () => {
    return (
        <div className='flex h-full w-full items-center justify-center'>
            <div className='h-60 w-60'>
                <SayHiImage />
            </div>
        </div>
    )
}

export default Fallback
