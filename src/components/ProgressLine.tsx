import clsx from 'clsx'
import React from 'react'

interface Props {
    className?: string
    data: Array<{ color: string; percent: number }>
    background: string
}

const ProgressLine: React.FC<Props> = (props) => {
    const { className, data, background } = props

    return (
        <div className={clsx('relative h-2 overflow-hidden rounded-full', className)}>
            <div className='absolute h-full w-full opacity-30 transition' style={{ background }} />
            <div className='absolute inset-0 flex'>
                {data.map(({ color, percent }, index) => {
                    return (
                        <span
                            key={index}
                            style={{
                                width: `${percent}%`,
                                background: color ?? background,
                            }}
                            className='transition-all'
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default ProgressLine
