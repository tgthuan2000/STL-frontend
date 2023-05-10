import React from 'react'
import { Droppable } from 'react-beautiful-dnd'

interface Props {
    children: React.ReactNode
    id: string
}

const DraggableWrapContent: React.FC<Props> = (props) => {
    const { children, id } = props

    return (
        <Droppable droppableId={id}>
            {({ droppableProps, innerRef, placeholder }) => (
                <div ref={innerRef} {...droppableProps} className='flex flex-1 flex-col'>
                    {children}
                    {placeholder}
                </div>
            )}
        </Droppable>
    )
}

export default DraggableWrapContent
