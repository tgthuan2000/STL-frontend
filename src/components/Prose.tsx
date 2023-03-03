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
                    prose-h1:text-gray-900 
                    prose-h2:text-gray-900 
                    prose-h3:text-gray-900 
                    prose-h4:text-gray-900 
                    prose-h5:text-gray-900
                    prose-h6:text-gray-900
                    prose-a:font-light
                    prose-a:text-cyan-400
                    prose-blockquote:font-normal
                    prose-blockquote:text-gray-600
                    prose-strong:font-medium
                    prose-li:text-gray-900
                    dark:text-slate-200
                    dark:prose-h1:text-slate-200
                    dark:prose-h2:text-slate-200
                    dark:prose-h3:text-slate-200
                    dark:prose-h4:text-slate-200
                    dark:prose-h5:text-slate-200
                    dark:prose-h6:text-slate-200
                    dark:prose-li:text-slate-200
                `,
                className
            )}
        >
            {parse(children)}
        </span>
    )
}

export default Prose
