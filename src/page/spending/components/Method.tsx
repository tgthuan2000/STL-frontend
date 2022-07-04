import { Link } from 'react-router-dom'
import { methodItems } from '~/constant/spending'

const Method = () => {
    return (
        <ul role='list' className='divide-y divide-gray-300'>
            {methodItems.map((item) => (
                <li key={item.id}>
                    <Link to={`method/${item.id}`} className='px-4 py-4 flex hover:bg-gray-100 cursor-pointer'>
                        <div className='w-2/3 truncate'>
                            {item.type && <h4 className='font-medium'>{item.type}</h4>}
                        </div>
                        <div className='w-1/3 truncate text-right'>{item.amount && <h4>{item.amount}</h4>}</div>
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export default Method
