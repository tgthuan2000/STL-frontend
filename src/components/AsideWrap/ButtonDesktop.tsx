import React from 'react'
import { AsideProps } from '~/@types/components'

const ButtonDesktop: React.FC<AsideProps> = ({ children }) => {
    return (
        <aside className='hidden xl:block xl:col-span-1'>
            <div className='sticky z-20 top-[70px] space-y-4'>{children}</div>
        </aside>
    )
}

export default ButtonDesktop
