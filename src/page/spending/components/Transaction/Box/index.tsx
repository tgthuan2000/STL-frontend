import { BoxProps } from '~/@types/spending'
import SeeMore from './SeeMore'
import Title from './Title'

const Box = ({ title, seeMore = true, children, to }: BoxProps) => {
    return (
        <div className='max-w-lg w-full h-fit mx-auto bg-white border border-gray-300 overflow-hidden rounded-md select-none'>
            <Title title={title} />
            {children}
            <SeeMore seeMore={seeMore} to={to} />
        </div>
    )
}

export default Box
