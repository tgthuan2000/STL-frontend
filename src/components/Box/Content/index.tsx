import { DefaultTFuncReturn } from 'i18next'
import React, { Fragment } from 'react'
import AnimateWrap from '~/components/AnimateWrap'
import PaperWrap from '~/components/Paper'
import Title from './Title'

export interface Props {
    title?: string | DefaultTFuncReturn
    children: React.ReactNode
    to?: string
    onReload?: () => void
    loading?: boolean
    fullWidth?: boolean
    customHeaderEvent?: React.ReactNode
}

const ContentBox: React.FC<Props> = (props) => {
    const { title, children, to, onReload, loading, customHeaderEvent } = props

    return (
        <Fragment>
            <Title to={to} title={title} onReload={onReload} loading={loading} customEvent={customHeaderEvent} />
            <PaperWrap disabledPadding>
                <AnimateWrap>{children}</AnimateWrap>
            </PaperWrap>
        </Fragment>
    )
}

export default ContentBox
