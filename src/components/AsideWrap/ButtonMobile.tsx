import clsx from 'clsx'
import React, { Fragment } from 'react'
import { AsideProps } from '~/@types/components'
import { useSideBar } from '~/context'

const ButtonMobile: React.FC<AsideProps> = ({ children }) => {
    const { desktop } = useSideBar()
    return (
        <Fragment>
            <div className='h-16' />
            <aside
                className={clsx(
                    'block xl:hidden transition-all fixed bottom-0 bg-white dark:bg-slate-700 border-t-2 border-gray-300 dark:border-slate-500 left-0 right-0 h-16',
                    !desktop.open ? 'md:left-16' : 'md:left-64'
                )}
            >
                {children}
            </aside>
        </Fragment>
    )
}

export default ButtonMobile
