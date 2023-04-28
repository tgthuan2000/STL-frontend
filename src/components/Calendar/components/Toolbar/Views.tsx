import React, { Fragment } from 'react'
import { View } from 'react-big-calendar'
import Wrap from './Wrap'
import Button from './Button'
import clsx from 'clsx'

interface ViewsProps {
    view: View
    views: View[]
    onView: (view: View) => void
}

const Views: React.FC<ViewsProps> = (props) => {
    const { onView, view, views } = props

    return (
        <Fragment>
            <Wrap className='hidden md:flex'>
                {views.map((v) => (
                    <Button
                        onClick={() => onView(v)}
                        noHover
                        className={clsx('cursor-default capitalize', {
                            '!text-radical-red-500 dark:!text-cyan-400': view === v,
                        })}
                    >
                        {v}
                    </Button>
                ))}
            </Wrap>
        </Fragment>
    )
}

export default Views
