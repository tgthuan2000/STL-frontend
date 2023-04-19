import clsx from 'clsx'
import { motion } from 'framer-motion'
import React, { memo } from 'react'
import { Link } from 'react-router-dom'

interface Props {
    className?: string
}

const Logo: React.FC<Props> = ({ className }) => {
    return (
        <motion.div layout layoutId='logo' className={clsx('flex-shrink-0 select-none px-4 text-center', className)}>
            <Link
                to='/'
                className='animate-text cursor-pointer border-none bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text font-DynaPuff font-black text-transparent outline-none'
            >
                STL
            </Link>
        </motion.div>
    )
}

export default memo(Logo)
