import moment from 'moment'

export const renderTitle = (data: any) => (
    <h4 className='bg-cyan-200 p-2 text-base font-normal text-gray-900 dark:bg-transparent dark:text-sky-400 lg:text-lg lg:font-light'>
        {data}
    </h4>
)

export const groupBy = (id: any) => (data: any) => moment(data.notify._createdAt).format(id)

export const rowClick = (data: any) => `/notify/${data.notify._id}`
