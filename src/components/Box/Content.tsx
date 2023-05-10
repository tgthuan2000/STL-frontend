import { DefaultTFuncReturn } from 'i18next'
import React from 'react'
import AnimateWrap from '~/components/AnimateWrap'
import Paper from '~/components/Paper'
import Title from './Title'

export interface Props {
    title?: string | DefaultTFuncReturn
    children: React.ReactNode
    to?: string
    onReload?: () => void
    loading?: boolean
    fullWidth?: boolean
    customHeaderEvent?: React.ReactNode
    className?: string
    id?: string
    order: number
}

const ContentBox: React.FC<Props> = (props) => {
    const { title, children, to, onReload, loading, customHeaderEvent, className, order } = props

    return (
        <div className={className} style={{ order }}>
            <Title to={to} title={title} onReload={onReload} loading={loading} customEvent={customHeaderEvent} />
            <Paper disabledPadding>
                <AnimateWrap>{children}</AnimateWrap>
            </Paper>
        </div>
    )
}

export default ContentBox
