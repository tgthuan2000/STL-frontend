import clsx from 'clsx'
import parse from 'html-react-parser'
import React from 'react'
import { ProseProps } from '~/@types/components'
import 'react-quill/dist/quill.core.css'
import './style.css'

const Prose: React.FC<ProseProps> = ({ children, className }) => {
    return <span className={clsx('__prose', className)}>{parse(children)}</span>
}

export default Prose
