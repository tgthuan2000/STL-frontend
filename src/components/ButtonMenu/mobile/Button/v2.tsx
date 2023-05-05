import clsx from 'clsx'
import React, { memo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { MobileButtonProps } from '../../ButtonMenuProvider'

const v2: React.FC<MobileButtonProps> = ({ data, onClick }) => {
    const { title, color, icon: Icon, query, to } = data
    const [searchParams] = useSearchParams()

    const generateLink = () => {
        const paramsUrl = new URLSearchParams(searchParams)
        let link = to ?? ''

        if (query) {
            for (let [key, value] of Object.entries(query)) {
                paramsUrl.set(key, value)
            }

            link += `?${paramsUrl.toString()}`
        }
        return link
    }

    return (
        <>
            <Link
                to={generateLink()}
                onClick={onClick}
                className={clsx(
                    'group inline-flex snap-start items-center justify-center gap-0.5 rounded-md border border-transparent py-2 px-3 font-medium dark:bg-slate-800',
                    color
                )}
                title={title}
            >
                <Icon className='h-8 w-8 sm:h-10 sm:w-10' />
                <span className='block w-full truncate text-center'>{title}</span>
            </Link>
        </>
    )
}
export default memo(v2)
