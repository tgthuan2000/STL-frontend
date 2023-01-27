import clsx from 'clsx'
import numeral from 'numeral'
import React, { useState } from 'react'
import { SeeMoreButtonProps } from '~/@types/feedback'

const SeeMoreButton: React.FC<SeeMoreButtonProps> = ({ replyNum, onClick }) => {
    const [loading, setLoading] = useState(false)
    const handleClick = () => {
        if (!loading) {
            setLoading(true)
            onClick()
            setTimeout(() => {
                setLoading(false)
            }, 1000)
        }
    }
    return (
        <button
            type='button'
            className={clsx('pt-10 dark:text-cyan-400 text-cyan-500 hover:opacity-70', loading && 'animate-pulse')}
            onClick={handleClick}
        >
            {loading ? 'Đang tải...' : `Xem thêm ${numeral(replyNum).format()} phản hồi`}
        </button>
    )
}

export default SeeMoreButton
