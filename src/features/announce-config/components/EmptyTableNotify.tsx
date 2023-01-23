import { TEMPLATE } from '~/constant/template'

const EmptyTableNotify = () => {
    return (
        <tr>
            <td colSpan={5} className='whitespace-nowrap py-4 px-2'>
                <span className='block truncate w-full text-center text-md text-gray-700 dark:text-slate-200 font-base'>
                    {TEMPLATE.EMPTY_DATA}
                </span>
            </td>
        </tr>
    )
}

export default EmptyTableNotify
