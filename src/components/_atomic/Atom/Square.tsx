import React from 'react'

interface Props {
    style?: React.CSSProperties
}

const Square: React.FC<Props> = (props) => {
    const { style } = props

    return <span className='inline-block h-6 w-6 rounded' style={style} />
}

export default Square
