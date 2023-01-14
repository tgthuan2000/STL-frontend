import clsx from 'clsx'
import parse from 'html-react-parser'
import React from 'react'
import { ProseProps } from '~/@types/components'

const Prose: React.FC<ProseProps> = ({ children, className }) => {
    return (
        <span
            className={clsx(
                'prose prose-blockquote:font-normal prose-blockquote:text-gray-600 prose-strong:font-medium',
                className
            )}
        >
            {parse(children)}
        </span>
    )
}

export default Prose
