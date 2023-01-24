import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

const Profile = () => {
    return (
        <div>
            <Suspense fallback={<div className='text-gray-900 dark:text-white'>Loading...</div>}>
                <Outlet />
            </Suspense>
        </div>
    )
}

export default Profile
