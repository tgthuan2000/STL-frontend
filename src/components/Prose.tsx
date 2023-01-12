import clsx from 'clsx'
import React from 'react'
import parse from 'html-react-parser'

interface ProseProps {
    children: string
    className?: string
}

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
