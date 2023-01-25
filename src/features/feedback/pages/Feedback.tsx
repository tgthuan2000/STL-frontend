import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

const Feedback = () => {
    return (
        <Suspense fallback={<div className='text-gray-900 dark:text-white'>Loading...</div>}>
            <Outlet />
        </Suspense>
    )
}

export default Feedback
