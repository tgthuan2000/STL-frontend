import { TEMPLATE } from '~/constant/template'

const EmptyList = () => {
    return (
        <span className='block truncate w-full text-center text-md text-gray-700 bg-gray-200 p-3 sm:rounded-lg font-base'>
            {TEMPLATE.EMPTY_DATA}
        </span>
    )
}

export default EmptyList
