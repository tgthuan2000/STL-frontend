import { yupResolver } from '@hookform/resolvers/yup'
import { cloneDeep, isEmpty } from 'lodash'
import moment from 'moment'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { IMakeBudgetForm, MakeBudgetQueryData, StateRef, StateRefKey } from '~/@types/spending'
import { Button, Chip, SubmitWrap, Tabs } from '~/components'
import { DatePicker } from '~/components/_base'
import { TAGS } from '~/constant'
import { useCheck, useConfig, useLoading, useSlideOver } from '~/context'
import { useQuery } from '~/hook'
import LANGUAGE from '~/i18n/language/key'
import { client } from '~/sanityConfig'
import { GET_BUDGET_BY_MONTH, GET_CATEGORY_SPENDING, GET_METHOD_SPENDING } from '~/schema/query/spending'
import { getBudgetId, getDateOfMonth } from '~/services'
import useAuth from '~/store/auth'
import * as servicesBudget from '../../services/budget'
import { budgetSchema } from '../../services/schema'

const Category = React.lazy(() => import('./Category'))
const Method = React.lazy(() => import('./Method'))

const defaultStateRef = {
    removes: {
        CategorySpending: [],
        MethodSpending: [],
    },
    updates: {
        CategorySpending: [],
        MethodSpending: [],
    },
}

const MakeBudget = () => {
    const { t } = useTranslation()
    const { setIsOpen } = useSlideOver()
    const navigate = useNavigate()
    const firstRef = useRef(false)
    const isPrevMonthClick = useRef(false)
    const { userProfile } = useAuth()
    const { getKindSpendingId } = useConfig()
    const { loading, setSubmitLoading } = useLoading()
    const { needCheckWhenLeave } = useCheck()
    const stateRef = useRef<StateRef>(defaultStateRef)
    const [{ query, params, tags }, setQueryData] = useState({
        query: {
            methodSpending: GET_METHOD_SPENDING,
            categorySpending: GET_CATEGORY_SPENDING,
            budgetSpending: GET_BUDGET_BY_MONTH,
        },
        params: {
            userId: userProfile?._id as string,
            budgetId: getBudgetId(userProfile?._id as string),
            budgetKind: getKindSpendingId('COST') as string,
            startDate: getDateOfMonth('start'),
            endDate: getDateOfMonth('end'),
            kindSpending: getKindSpendingId('COST') as string,
        },
        tags: {
            categorySpending: TAGS.ENUM,
            methodSpending: TAGS.ENUM,
            budgetSpending: TAGS.ALTERNATE,
        },
    })
    const form = useForm<IMakeBudgetForm>({
        mode: 'onChange',
        defaultValues: {
            date: new Date(),
            MethodSpending: [],
            CategorySpending: [],
        },
        resolver: yupResolver(budgetSchema),
    })

    const setStateRef = (option: keyof StateRef, key: StateRefKey, method: 'push' | 'remove', value: any) => {
        const prevValues = stateRef.current

        const methods = {
            push: () => [...prevValues[option][key], value],
            remove: () => prevValues[option][key].filter((item) => item !== value),
        }
        stateRef.current = { ...prevValues, [option]: { ...prevValues[option], [key]: methods[method]() } }
    }

    const [{ methodSpending, categorySpending, budgetSpending }, fetchData, deleteCacheData, reloadData] =
        useQuery<MakeBudgetQueryData>(query, params, tags)

    useEffect(() => {
        if (firstRef.current) {
            reloadData()
        }
    }, [query, params])

    useEffect(() => {
        fetchData()
        firstRef.current = true
    }, [])

    useEffect(() => {
        const budgetData = budgetSpending.data
        if (!isEmpty(budgetData)) {
            form.setValue('MethodSpending', budgetData?.MethodSpending)
            form.setValue('CategorySpending', budgetData?.CategorySpending)
            if (!isPrevMonthClick.current) {
                form.setValue('date', moment(budgetData?.date).toDate())
                budgetData?.MethodSpending.forEach((item) => {
                    setStateRef('updates', 'MethodSpending', 'push', item._id)
                })
                budgetData?.CategorySpending.forEach((item) => {
                    setStateRef('updates', 'CategorySpending', 'push', item._id)
                })
            } else {
                isPrevMonthClick.current = false
            }
        } else {
            form.setValue('MethodSpending', [])
            form.setValue('CategorySpending', [])
            stateRef.current = defaultStateRef
        }
        return () => {
            if (!isPrevMonthClick.current) {
                stateRef.current = defaultStateRef
            } else {
                stateRef.current.updates = cloneDeep(defaultStateRef.updates)
            }
        }
    }, [budgetSpending.data])

    const onsubmit: SubmitHandler<IMakeBudgetForm> = async (data) => {
        try {
            setSubmitLoading(true)
            const { MethodSpending, CategorySpending, date } = data
            const _date = moment(date)
            const _id = getBudgetId(userProfile?._id as string, _date)
            const dateFormatted = _date.format('YYYY-MM-01')
            const __ = client.transaction()
            __.createIfNotExists({
                _type: 'budget',
                _id,
                date: dateFormatted,
                user: { _type: 'reference', _ref: userProfile?._id },
            })

            const { updates, removes } = stateRef.current

            if (updates) {
                // update methodSpending
                servicesBudget.__update__(__, 'methodSpending', updates.MethodSpending, MethodSpending)

                // update categorySpending
                servicesBudget.__update__(__, 'categorySpending', updates.CategorySpending, CategorySpending)
            }

            if (removes) {
                // delete methodSpending
                servicesBudget.__delete__(__, removes.CategorySpending)

                // delete categorySpending
                servicesBudget.__delete__(__, removes.MethodSpending)
            }

            // create methodSpending
            const methodSpendingCreates = MethodSpending?.filter(
                (item) => !item._id || !updates.MethodSpending.concat(removes.MethodSpending).includes(item._id)
            )
            servicesBudget.__create__(__, 'methodSpending', _id, methodSpendingCreates, userProfile?._id as string)

            // create categorySpending
            const categorySpendingCreates = CategorySpending?.filter(
                (item) => !item._id || !updates.CategorySpending.concat(removes.CategorySpending).includes(item._id)
            )
            servicesBudget.__create__(__, 'categorySpending', _id, categorySpendingCreates, userProfile?._id as string)

            // submit transaction
            await __.commit()
            stateRef.current = defaultStateRef
            deleteCacheData('budgetSpending')
            if (params.budgetId === _id) {
                reloadData()
            } else {
                setQueryDataFn(date)
            }
            needCheckWhenLeave()
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitLoading(false)
        }
    }

    const handleChangeDate = (date: Date) => {
        setQueryDataFn(date)
        deleteCacheData('budgetSpending')
    }

    const setQueryDataFn = (date: Date) => {
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
    }

    const handlePreviousMonth = () => {
        isPrevMonthClick.current = true
        handleChangeDate(moment(form.getValues('date')).subtract(1, 'month').toDate())
    }

    const handleDeleteItem: (key: StateRefKey, id: string | null | undefined) => void = (key, id) => {
        if (id) {
            setStateRef('removes', key, 'push', id)
            if (stateRef.current.updates[key].includes(id)) {
                setStateRef('updates', key, 'remove', id)
            }
        }
    }

    const tabOptions = useMemo(() => {
        const props = {
            form,
            loading: budgetSpending.loading || methodSpending.loading || categorySpending.loading || loading.submit,
            budgetLoading: budgetSpending.loading,
            onDelItem: handleDeleteItem,
        }
        return [
            {
                id: '1',
                label: t(LANGUAGE.METHOD),
                content: <Method optionData={methodSpending.data} optionLoading={methodSpending.loading} {...props} />,
            },
            {
                id: '2',
                label: t(LANGUAGE.CATEGORY),
                content: (
                    <Category optionData={categorySpending.data} optionLoading={categorySpending.loading} {...props} />
                ),
            },
        ]
    }, [budgetSpending.loading, methodSpending.loading, categorySpending.loading, loading, t])

    return (
        <form onSubmit={form.handleSubmit(onsubmit)} className='flex h-full flex-col'>
            <div className='h-0 flex-1 overflow-y-auto overflow-x-hidden'>
                <div className='flex flex-1 flex-col justify-between'>
                    <div className='divide-y divide-gray-200 px-4 sm:px-6'>
                        <div className='space-y-6 pt-6 pb-5'>
                            <div className='space-y-2'>
                                <div className='w-1/3'>
                                    <DatePicker
                                        name='date'
                                        form={form}
                                        showMonthYearPicker
                                        showTimeInput={false}
                                        format='MONTH'
                                        label={t(LANGUAGE.MONTH)}
                                        disabledClear
                                        onChange={handleChangeDate}
                                    />
                                </div>
                                <Chip onClick={handlePreviousMonth} disabled={loading.submit}>
                                    {t(LANGUAGE.CHOOSE_PREVIOUS_MONTH)}
                                </Chip>
                            </div>
                            <Tabs options={tabOptions} />
                        </div>
                    </div>
                </div>
            </div>
            <SubmitWrap>
                <Button color='yellow' type='submit' disabled={loading.submit}>
                    {t(LANGUAGE.SAVE)}
                </Button>
                <Button
                    color='outline'
                    type='button'
                    onClick={() => {
                        setIsOpen(false)
                        navigate(-1)
                    }}
                >
                    {t(LANGUAGE.CANCEL)}
                </Button>
            </SubmitWrap>
        </form>
    )
}

export default MakeBudget
