import clsx from 'clsx'
import React, { useId } from 'react'
import { Draggable } from 'react-beautiful-dnd'

interface Props {
    title: string
    className?: string
    index: number
}

const SkeletonContent: React.FC<Props> = (props) => {
    const { title, className, index } = props
    const id = useId()

    return (
        <Draggable draggableId={id} index={index}>
            {({ dragHandleProps, draggableProps, innerRef }, { isDragging }) => (
                <div
                    ref={innerRef}
                    {...draggableProps}
                    {...dragHandleProps}
                    className={clsx(
                        'mb-4 select-none rounded-lg p-2 dark:text-white',
                        isDragging
                            ? 'bg-gray-700 text-white dark:bg-cyan-400'
                            : ' bg-gray-300 text-gray-900 dark:bg-slate-700',

                        className
                    )}
                >
                    <span className='text-base font-normal'>{title}</span>
                </div>
            )}
        </Draggable>
    )
}

export default SkeletonContent
