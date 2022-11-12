import React, { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { DatePicker } from '~/components'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

interface FilterProps {}

interface IFilterDate {
    date: Date | null
}

const schema = yup.object().shape({
    date: yup.date().nullable(),
})

const Filter: React.FC<FilterProps> = ({}) => {
    const form = useForm<IFilterDate>({
        defaultValues: { date: new Date() },
        resolver: yupResolver(schema),
    })

    const onSubmit = (data: IFilterDate) => {
        console.log(data)
    }

    return (
        <div className='max-w-xs'>
            <DatePicker
                className='ml-3'
                showTimeInput={false}
                form={form}
                name='date'
                onChange={form.handleSubmit(onSubmit)}
                placeholderText='Chọn thời gian'
            />
        </div>
    )
}

export default Filter
