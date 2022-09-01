const EmptyTransactionTable = () => {
    return (
        <tr>
            <td colSpan={4} className='whitespace-nowrap py-4 px-2'>
                <span className='block truncate w-full text-center text-lg text-gray-700 font-base'>
                    Không có dữ liệu!
                </span>
            </td>
        </tr>
    )
}

export default EmptyTransactionTable
