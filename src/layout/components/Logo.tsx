import { Link } from 'react-router-dom'

const Logo = () => {
    return (
        <div className='flex-shrink-0 text-center px-4 select-none'>
            <Link
                to='/'
                className='animate-text cursor-pointer bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent text-4xl font-black'
            >
                STL
            </Link>
        </div>
    )
}

export default Logo
