import SeeMore from './SeeMore'
import Title from './Title'

interface BoxProps {
    title?: string
    seeMore?: boolean
    children: React.ReactNode
}

const Box = ({ title, seeMore = true, children }: BoxProps) => {
    return (
        <div className='max-w-lg w-full h-fit mx-auto bg-white border border-gray-300 overflow-hidden rounded-md select-none'>
            <Title title={title} />
            {children}
            <SeeMore seeMore={seeMore} />
        </div>
    )
}

export default Box
