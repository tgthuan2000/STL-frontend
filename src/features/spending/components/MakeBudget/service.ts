import moment from 'moment'
import { UseFormReturn, useFieldArray } from 'react-hook-form'

interface Options {
    form: UseFormReturn<any, object>
    name: string
    appendOption: any
    onDelItem: any
}

const useFieldMakeBudget = (options: Options) => {
    const { form, name, appendOption, onDelItem } = options
    const { fields, remove, append } = useFieldArray({
        name,
        control: form.control,
    })

    const getDaysInMonth = () => {
        return moment(form.getValues('date')).daysInMonth()
    }

    const handleAddItem = () => {
        append(appendOption)
    }

    const handleDeleteItem = (id: string | null | undefined, index: number) => {
        remove(index)
        onDelItem(name, id)
    }

    const handleAvgAmountChange = (index: number, value: number) => {
        if (!Number.isNaN(value)) {
            form.setValue(`${name}.${index}.amount`, Math.round(value * getDaysInMonth()))
        }
    }

    const handleAmountChange = (index: number, value: number) => {
        if (!Number.isNaN(value)) {
            form.setValue(`${name}.${index}.avgAmount`, Math.round(value / getDaysInMonth()))
        }
    }

    return {
        fields,
        handleAddItem,
        handleDeleteItem,
        handleAvgAmountChange,
        handleAmountChange,
    }
}

export default useFieldMakeBudget
