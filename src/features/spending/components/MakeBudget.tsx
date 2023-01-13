import { useAutoAnimate } from '@formkit/auto-animate/react'
import { ArrowSmLeftIcon, PlusCircleIcon, RefreshIcon, TrashIcon } from '@heroicons/react/outline'
import { yupResolver } from '@hookform/resolvers/yup'
import { isEmpty } from 'lodash'
import moment from 'moment'
import { useEffect, useRef, useState } from 'react'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { IMakeBudgetForm, MakeBudgetQueryData, StateRef } from '~/@types/spending'
import { Button } from '~/components'
import { AutoComplete, DatePicker, Input } from '~/components/_base'
import { TAGS } from '~/constant'
import { useConfig, useLoading, useSlideOver } from '~/context'
import { useQuery } from '~/hook'
import { client } from '~/sanityConfig'
import { GET_BUDGET_BY_MONTH, GET_METHOD_SPENDING } from '~/schema/query/spending'
import { getBudgetId, getDateOfMonth } from '~/services'
import useAuth from '~/store/auth'

const defaultStateRef = {
    removes: [],
    updates: [],
}

const schema = yup.object().shape({
    date: yup.date().typeError('Yêu cầu chọn ngày!').required('Yêu cầu chọn ngày!'),
    MethodSpending: yup.array().of(
        yup.object().shape({
            _id: yup.string().nullable(),
            amount: yup
                .number()
                .nullable()
                .required('Bất buộc nhập!')
                .typeError('Hãy nhập số')
                .moreThan(0, 'Hạn mức cần lớn hơn 0'),
            methodSpending: yup
                .object()
                .shape({
                    _id: yup.string().required(),
                    name: yup.string().required(),
                })
                .nullable()
                .required('Yêu cầu chọn phương thức!'),
        })
    ),
})

const MakeBudget = () => {
    const { setIsOpen } = useSlideOver()
    const navigate = useNavigate()
    const { userProfile } = useAuth()
    const { getKindSpendingId } = useConfig()
    const { loading, setSubmitLoading } = useLoading()
    const stateRef = useRef<StateRef>(defaultStateRef)
    const [{ query, params, tags }, setQueryData] = useState({
        query: { methodSpending: GET_METHOD_SPENDING, budgetSpending: GET_BUDGET_BY_MONTH },
        params: {
            userId: userProfile?._id as string,
            budgetId: getBudgetId(userProfile?._id as string),
            budgetKind: getKindSpendingId('COST') as string,
            startDate: getDateOfMonth('start'),
            endDate: getDateOfMonth('end'),
        },
        tags: {
            methodSpending: TAGS.ENUM,
            budgetSpending: TAGS.ALTERNATE,
        },
    })
    const firstRef = useRef(false)

    const setStateRef = (option: keyof StateRef, method: 'push' | 'remove', value: any) => {
        const prevValues = stateRef.current

        const methods = {
            push: [...prevValues[option], value],
            remove: prevValues[option].filter((item) => item !== value),
        }
        stateRef.current = { ...prevValues, [option]: methods[method] }
    }

    const [{ methodSpending, budgetSpending }, fetchData, deleteCacheData, reloadData] = useQuery<MakeBudgetQueryData>(
        query,
        params,
        tags
    )
    const [wrapRef] = useAutoAnimate<HTMLDivElement>()
    const [loadingRef] = useAutoAnimate<HTMLButtonElement>()
    const [loadingRef2] = useAutoAnimate<HTMLButtonElement>()
    const isPrevMonthClick = useRef(false)

    useEffect(() => {
        if (firstRef.current) {
            reloadData()
        }
    }, [query, params])

    useEffect(() => {
        fetchData()
        firstRef.current = true
    }, [])

    const form = useForm<IMakeBudgetForm>({
        mode: 'onChange',
        defaultValues: {
            date: new Date(),
            MethodSpending: [],
        },
        resolver: yupResolver(schema),
    })

    useEffect(() => {
        const budgetData = budgetSpending.data
        if (!isEmpty(budgetData)) {
            form.setValue('MethodSpending', budgetData?.MethodSpending)
            if (!isPrevMonthClick.current) {
                form.setValue('date', moment(budgetData?.date).toDate())
            } else {
                isPrevMonthClick.current = false
            }

            budgetData?.MethodSpending.forEach((item) => {
                setStateRef('updates', 'push', item._id)
            })
        } else {
            form.setValue('MethodSpending', [])
            stateRef.current = defaultStateRef
        }
    }, [budgetSpending.data])

    const { fields, append, remove } = useFieldArray({
        name: 'MethodSpending' as never,
        control: form.control,
    })

    const handleAddMoreMethodSpending = async (name: string) => {
        const document = {
            _type: 'methodSpending',
            name,
            surplus: 0,
            user: {
                _type: 'reference',
                _ref: userProfile?._id,
            },
        }

        try {
            const { _id, name } = await client.create(document)
            const res = deleteCacheData('methodSpending')
            console.log(res)
            reloadData()
            return { _id, name }
        } catch (error) {
            console.log(error)
        }
    }

    const handleReloadData = async (keys: keyof MakeBudgetQueryData) => {
        const res = deleteCacheData(keys)
        console.log(res)
        reloadData()
    }

    const onsubmit: SubmitHandler<IMakeBudgetForm> = async (data) => {
        try {
            setSubmitLoading(true)
            const { MethodSpending, date } = data
            const _date = moment(date)
            const _id = getBudgetId(userProfile?._id as string, _date)
            const dateFormated = _date.format('YYYY-MM-01')
            const __ = client.transaction()
            __.createIfNotExists({
                _type: 'budget',
                _id,
                date: dateFormated,
                user: { _type: 'reference', _ref: userProfile?._id },
            })

            const { updates, removes } = stateRef.current

            // update methodSpending
            if (!isEmpty(updates)) {
                updates.forEach((item) => {
                    const found = MethodSpending?.find((i) => i._id === item)
                    if (found) {
                        const { amount, methodSpending } = found
                        __.patch(item, {
                            set: {
                                amount,
                                methodSpending: { _type: 'reference', _ref: methodSpending._id },
                            },
                        })
                    }
                })
            }
            // delete methodSpending
            if (!isEmpty(removes)) {
                removes.forEach((item) => {
                    __.delete(item)
                })
            }

            // create methodSpending
            const creates = MethodSpending?.filter((item) => !item._id || !updates.concat(removes).includes(item._id))

            if (creates && !isEmpty(creates)) {
                creates.forEach((item) => {
                    const { amount, methodSpending } = item
                    if (amount && methodSpending) {
                        __.create({
                            _type: 'budgetDetail',
                            amount: Number(amount),
                            methodSpending: { _type: 'reference', _ref: methodSpending._id },
                            budgetSpending: { _type: 'reference', _ref: _id },
                            user: { _type: 'reference', _ref: userProfile?._id },
                        })
                    }
                })
            }
            // submit transaction
            await __.commit()
            stateRef.current = defaultStateRef
            deleteCacheData('budgetSpending')
            reloadData()
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitLoading(false)
        }
    }
    const handleAddItem = () => {
        append({
            amount: '',
            methodSpending: null,
        })
    }

    const handleDeleteItem = (id: string | null | undefined, index: number) => {
        remove(index)
        if (id) {
            setStateRef('removes', 'push', id)
            if (stateRef.current.updates.includes(id)) {
                setStateRef('updates', 'remove', id)
            }
        }
    }

    const handleChangeDate = (date: Date) => {
        const _date = moment(date)
        const _id = getBudgetId(userProfile?._id as string, _date)
        setQueryData((prev) => ({
            ...prev,
            params: {
                ...prev.params,
                budgetId: _id,
                startDate: getDateOfMonth('start', _date),
                endDate: getDateOfMonth('end', _date),
            },
        }))
        deleteCacheData('budgetSpending')
    }

    const handlePreviousMonth = () => {
        isPrevMonthClick.current = true
        handleChangeDate(moment(form.getValues('date')).subtract(1, 'month').toDate())
    }

    return (
        <form onSubmit={form.handleSubmit(onsubmit)} className='flex h-full flex-col'>
            <div className='h-0 flex-1 overflow-y-auto overflow-x-hidden'>
                <div className='flex flex-1 flex-col justify-between'>
                    <div className='divide-y divide-gray-200 px-4 sm:px-6'>
                        <div className='space-y-6 pt-6 pb-5'>
                            <div className='w-1/3'>
                                <DatePicker
                                    name='date'
                                    form={form}
                                    showMonthYearPicker
                                    showTimeInput={false}
                                    format='MONTH'
                                    label='Tháng'
                                    disabledClear
                                    onChange={handleChangeDate}
                                />
                            </div>

                            <div className='flex justify-between items-center'>
                                <Button
                                    type='button'
                                    color='outline-prussianBlue'
                                    className='items-center gap-1 truncate'
                                    onClick={handleAddItem}
                                    disabled={budgetSpending.loading || methodSpending.loading || loading.submit}
                                    ref={loadingRef}
                                >
                                    {budgetSpending.loading ? (
                                        <RefreshIcon className='h-6 w-6 animate-spin -scale-100' />
                                    ) : (
                                        <>
                                            <PlusCircleIcon className='h-6 w-6' />
                                            Thêm phương thức
                                        </>
                                    )}
                                </Button>
                                <Button
                                    type='button'
                                    color='outline-yellow'
                                    className='items-center gap-1 truncate'
                                    onClick={handlePreviousMonth}
                                    disabled={
                                        budgetSpending.loading ||
                                        methodSpending.loading ||
                                        loading.submit ||
                                        !isEmpty(fields)
                                    }
                                    ref={loadingRef2}
                                >
                                    {budgetSpending.loading ? (
                                        <RefreshIcon className='h-6 w-6 animate-spin -scale-100' />
                                    ) : (
                                        <ArrowSmLeftIcon className='h-6 w-6' />
                                    )}
                                </Button>
                            </div>
                            <div className='space-y-6' ref={wrapRef}>
                                {fields.map((item, index) => (
                                    <div key={item.id}>
                                        <div className='flex justify-start'>
                                            <button
                                                type='button'
                                                className='text-radical-red-500 disabled:text-gray-300 cursor-pointer hover:opacity-50 disabled:hover:opacity-100 disabled:cursor-not-allowed transition-all'
                                                onClick={() => {
                                                    handleDeleteItem(
                                                        form.getValues(`MethodSpending.${index}._id`),
                                                        index
                                                    )
                                                }}
                                            >
                                                <TrashIcon className='h-6 w-6' />
                                            </button>
                                        </div>
                                        <div className='flex gap-3'>
                                            <div className='flex-[2]'>
                                                <AutoComplete
                                                    name={`MethodSpending.${index}.methodSpending`}
                                                    form={form}
                                                    data={methodSpending.data}
                                                    label='Phương thức'
                                                    loading={methodSpending.loading}
                                                    addMore={handleAddMoreMethodSpending}
                                                    onReload={
                                                        isEmpty(methodSpending.data)
                                                            ? undefined
                                                            : () => handleReloadData('methodSpending')
                                                    }
                                                />
                                            </div>
                                            <div className='flex-1'>
                                                <Input
                                                    name={`MethodSpending.${index}.amount`}
                                                    form={form}
                                                    type='number'
                                                    label='Hạn mức'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6'>
                <div className='flex sm:justify-start justify-end space-x-3'>
                    <Button color='yellow' type='submit' disabled={loading.submit}>
                        Lưu
                    </Button>
                    <Button
                        color='outline'
                        type='button'
                        onClick={() => {
                            setIsOpen(false)
                            navigate(-1)
                        }}
                    >
                        Hủy bỏ
                    </Button>
                </div>
            </div>
        </form>
    )
}

export default MakeBudget
