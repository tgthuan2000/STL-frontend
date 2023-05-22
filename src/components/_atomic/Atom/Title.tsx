import React from 'react'

interface Props {
    title: string | number | undefined
    fallback?: React.ReactNode
}

const Title: React.FC<Props> = (props) => {
    const { title, fallback } = props

    if (!title) {
        return <>{fallback}</>
    }

    return <>{title}</>
}

export default Title
