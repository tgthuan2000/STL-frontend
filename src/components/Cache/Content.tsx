import { get } from 'lodash'
import { Fragment } from 'react'
import ReactJson from 'react-json-view'
import { CACHE_RANGE, useWatchCache } from '~/context'

const Content = () => {
    const cache = useWatchCache()

    return (
        <div className='flex h-[70vh] flex-col gap-2 overflow-auto bg-white p-2'>
            {Object.keys(cache).map((key) => {
                const data = get(cache, key, [])
                const range = get(CACHE_RANGE, key)
                return (
                    <Fragment key={key}>
                        <div className='flex items-center gap-2'>
                            <p className='font-normal uppercase'>{key}</p> ·
                            <span className='text-xs italic text-gray-700'>
                                {data.length}/{range}
                            </span>
                        </div>
                        {data.map((item) => {
                            return (
                                <ReactJson
                                    key={get(item, 'key')}
                                    enableClipboard={false}
                                    src={item}
                                    collapsed={true}
                                    displayDataTypes={false}
                                    theme='rjv-default'
                                    iconStyle='square'
                                    displayObjectSize={false}
                                    collapseStringsAfterLength={35}
                                />
                            )
                        })}
                    </Fragment>
                )
            })}
        </div>
    )
}

export default Content
