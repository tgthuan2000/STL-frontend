import { Combobox } from '@headlessui/react'
import React from 'react'
import { urlFor } from '~/sanityConfig'
import CreateNewOption from './CreateNewOption'
import Option from './Option'
import EmptyOption from './EmptyOption'

export interface Props {
    filterData: any[]
    idKey: string
    valueKey: string
    showImage?: boolean
    query: string
    addMore?: (value: any) => Promise<any>
    EmptyOptionFallback?: React.ReactNode
}

const Options: React.FC<Props> = (props) => {
    const { filterData, idKey, valueKey, showImage, query, EmptyOptionFallback, addMore } = props

    return (
        <Combobox.Options className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-slate-600 sm:text-sm'>
            {filterData.length <= 0 ? (
                <>{addMore ? <CreateNewOption query={query} /> : <EmptyOption fallback={EmptyOptionFallback} />}</>
            ) : (
                <>
                    {filterData.map((item) => (
                        <Option
                            key={item[idKey]}
                            value={item}
                            displayValue={(value) => value[valueKey]}
                            showImage={showImage}
                            displayImage={(value) => urlFor(value.image)}
                        />
                    ))}
                </>
            )}
        </Combobox.Options>
    )
}

export default Options
