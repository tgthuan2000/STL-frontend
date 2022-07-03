import { recentItems } from '~/constant/spending'

const Recent = () => {
    return (
        <ul role='list' className='divide-y divide-gray-300'>
            {recentItems.map((item) => (
                <li key={item.id} className='px-4 py-4 flex hover:bg-gray-100 cursor-pointer'>
                    <div className='w-2/3 truncate'>
                        {item.date && <span>{item.date}</span>}
                        {item.type && <h4 className='font-bold'>{item.type}</h4>}
                        {item.note && <span className='truncate'>{item.note}</span>}
                    </div>
                    <div className='w-1/3 truncate text-right'>
                        {item.kind && <span className='font-medium'>{item.kind}</span>}
                        {item.amount && <h4>{item.amount}</h4>}
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default Recent
