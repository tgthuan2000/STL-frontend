import clsx from 'clsx'
import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'
import { MobileButtonProps } from '../../ButtonMenuProvider'

const v2: React.FC<MobileButtonProps> = (props) => {
    const { data, onClick } = props
    const { title, color, icon: Icon, divider } = data

    return <></>
}
export default memo(v2)
