import React from 'react'
import { AsideProps } from '~/@types/components'

const ButtonDesktop: React.FC<AsideProps> = ({ children }) => {
    return (
        <aside className='hidden xl:col-span-1 xl:block'>
            <div className='sticky top-[70px] z-20 space-y-4'>{children}</div>
        </aside>
    )
}

export default ButtonDesktop
