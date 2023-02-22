import clsx from 'clsx'
import parse from 'html-react-parser'
import React from 'react'
import { ProseProps } from '~/@types/components'
import 'react-quill/dist/quill.core.css'

const Prose: React.FC<ProseProps> = ({ children, className }) => {
    return (
        <span
            className={clsx(
                `
                    prose 
                    text-gray-900 
                    prose-a:font-light 
                    prose-a:text-cyan-400 
                    prose-blockquote:font-normal 
                    prose-blockquote:text-gray-600 
                    prose-strong:font-medium
                    dark:text-slate-200
                `,
                className
            )}
        >
            {parse(children)}
        </span>
    )
}

export default Prose
