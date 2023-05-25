import { get } from 'lodash'
import React from 'react'
import { useForm } from 'react-hook-form'
import { ButtonGroup } from '~/components/_base'

interface Props {
    hidden?: boolean
    data: ChartType[]
    defaultValue?: ChartType
    onSubmit: (data: Form) => void
}

interface ChartType {
    id: 'bar' | 'line'
    label: string
}

interface Form {
    chartType: ChartType
}

const ChartTool: React.FC<Props> = (props) => {
    const { hidden, data, defaultValue = data[0], onSubmit } = props

    const form = useForm<Form>({
        defaultValues: {
            chartType: defaultValue,
        },
    })

    if (hidden) {
        return <></>
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <ButtonGroup
                type='submit'
                form={form}
                name='chartType'
                data={data}
                getItemKey={(item) => get(item, 'id')}
                getItemLabel={(item) => get(item, 'label')}
            />
        </form>
    )
}

export default ChartTool
