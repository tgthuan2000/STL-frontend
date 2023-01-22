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
                    prose-blockquote:font-normal 
                    prose-a:font-light 
                    prose-strong:font-medium 
                    prose-a:text-cyan-400 
                    prose-blockquote:text-gray-600 
                    dark:prose-p:text-slate-200 
                    dark:prose-blockquote:text-slate-200 
                    dark:prose-h3:text-slate-200 
                    dark:prose-h1:text-slate-200 
                    dark:prose-h2:text-slate-200 
                    dark:prose-h4:text-slate-200 
                    dark:prose-h5:text-slate-200 
                    dark:prose-h6:text-slate-200
                `,
                className
            )}
        >
            {parse(children)}
        </span>
    )
}

export default Prose
