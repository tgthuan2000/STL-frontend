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
                    'fixed bottom-0 left-0 right-0 z-[4] block h-16 border-t border-gray-300 bg-white transition-all dark:border-slate-500 dark:bg-slate-700 xl:hidden',
                    !desktop.open ? 'md:left-16' : 'md:left-64'
                )}
            >
                {children}
            </aside>
        </Fragment>
    )
}

export default ButtonMobile
