import numeral from 'numeral'
import { profileOptionFn } from '~/@types/profile'

export const getProfileOptions: profileOptionFn = () => [
    {
        id: 1,
        title: 'Phương thức thanh toán',
        className: 'xl:row-start-2 xl:col-start-2 xl:col-span-1 xl:row-span-2',
        values: [
            {
                id: 1,
                title: 'Sử dụng nhiều nhất',
                data: (
                    <div className='flex items-end justify-between font-normal'>
                        <p className='line-clamp-2 text-left text-gray-700'>Tiền mặt</p>
                        <span className='text-cyan-400'>100</span>
                    </div>
                ),
            },
            {
                id: 2,
                title: 'Thu nhập nhiều nhất',
                data: (
                    <div className='flex items-end justify-between font-normal'>
                        <p className='line-clamp-2 text-left text-gray-700'>TCB</p>
                        <span className='text-green-400'>{numeral('20000000').format()}</span>
                    </div>
                ),
            },
            {
                id: 3,
                title: 'Chi phí nhiều nhất',
                data: (
                    <div className='flex items-end justify-between font-normal'>
                        <p className='line-clamp-2 text-left text-gray-700'>MSB</p>
                        <span className='text-radical-red-400'>{numeral('10000000').format()}</span>
                    </div>
                ),
            },
        ],
    },
    {
        id: 2,
        title: 'Thể loại',
        className: 'xl:row-start-1 xl:col-start-1 xl:col-span-1 xl:row-span-3',
        values: [
            {
                id: 1,
                title: 'Chi phí sử dụng nhiều nhất',
                data: (
                    <div className='flex items-end justify-between font-normal'>
                        <p className='line-clamp-2 text-left text-gray-700'>Thức ăn</p>
                        <span className='text-cyan-400'>100</span>
                    </div>
                ),
            },
            {
                id: 2,
                title: 'Thu nhập sử dụng nhiều nhất',
                data: (
                    <div className='flex items-end justify-between font-normal'>
                        <p className='line-clamp-2 text-left text-gray-700'>Lương GLEADS</p>
                        <span className='text-cyan-400'>100</span>
                    </div>
                ),
            },
            {
                id: 3,
                title: 'Tổng chi phí nhiều nhất',
                data: (
                    <div className='flex items-end justify-between font-normal'>
                        <p className='line-clamp-2 text-left text-gray-700'>Thức ăn</p>
                        <span className='text-radical-red-400'>{numeral('10000000').format()}</span>
                    </div>
                ),
            },
            {
                id: 4,
                title: 'Tổng thu nhập nhiều nhất',
                data: (
                    <div className='flex items-end justify-between font-normal'>
                        <p className='line-clamp-2 text-left text-gray-700'>Lương GLEADS</p>
                        <span className='text-green-400'>{numeral('100000000').format()}</span>
                    </div>
                ),
            },
        ],
    },
    {
        id: 3,
        title: 'Ngân sách',
        className: 'xl:row-start-1 xl:col-start-2 xl:col-span-1 xl:row-span-1',
        values: [
            {
                id: 1,
                title: 'Tháng có số tiền cao nhất',
                data: (
                    <div className='flex items-end justify-between font-normal'>
                        <p className='line-clamp-2 text-left text-gray-700'>12/2022</p>
                        <span className='text-yellow-400'>{numeral('100000000').format()}</span>
                    </div>
                ),
            },
        ],
    },
]
