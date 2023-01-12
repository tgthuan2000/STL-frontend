import React from 'react'
import { TEMPLATE } from '~/constant/template'
import EmptyNotifyGif from '~/assets/loading.gif'

const EmptyNotify = () => {
    return (
        <div className='py-10 font-medium text-lg flex flex-col gap-2 items-center justify-center'>
            <img src={EmptyNotifyGif} className='h-28' />
            {TEMPLATE.EMPTY_NOTIFY}
        </div>
    )
}

export default EmptyNotify
