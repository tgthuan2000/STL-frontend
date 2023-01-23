import React, { Fragment } from 'react'
import { AsideProps } from '~/@types/components'

const ButtonMobile: React.FC<AsideProps> = ({ children }) => {
    return (
        <Fragment>
            <div className='h-16' />
            <aside className='block xl:hidden transition-all fixed md:left-64 bottom-0 bg-white dark:bg-slate-700 border-t-2 border-gray-300 dark:border-slate-500 left-0 right-0 h-16'>
                {children}
            </aside>
        </Fragment>
    )
}

export default ButtonMobile
