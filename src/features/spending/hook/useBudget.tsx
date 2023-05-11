import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IMakeBudgetForm, MakeBudgetQueryData, StateRef, StateRefKey } from '~/@types/spending'
import { TAGS } from '~/constant'
import { useCheck, useConfig, useLoading, useSlideOver } from '~/context'
import LANGUAGE from '~/i18n/language/key'
import { GET_BUDGET_BY_MONTH, GET_CATEGORY_SPENDING, GET_METHOD_SPENDING } from '~/schema/query/spending'
import { service } from '~/services'
import { useProfile } from '~/store/auth'
import { useBudgetSchema } from './schema'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useQuery } from '~/hook'
import { isEmpty } from 'lodash'
import moment from 'moment'
import { toast } from 'react-toastify'
import { servicesBudget } from '../services/budget'
import { client } from '~/sanityConfig'

const Category = React.lazy(() => import('../components/MakeBudget/Category'))
const Method = React.lazy(() => import('../components/MakeBudget/Method'))

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

const useBudget = () => {
    const { t } = useTranslation()
    const firstRef = useRef(false)
    const isPrevMonthClick = useRef(false)
    const { userProfile } = useProfile()
    const budgetSchema = useBudgetSchema()
    const { loading, setSubmitLoading } = useLoading()
    const {
        getKindSpendingId,
        budgetSpending: { _id: budgetSpendingId },
    } = useConfig()
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
            kindSpending: getKindSpendingId('COST') as string,
            startDate: service.getDateOfMonth('start'),
            endDate: service.getDateOfMonth('end'),
            budgetKind: getKindSpendingId('COST') as string,
            budgetId: budgetSpendingId,
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
                budgetData?.MethodSpending?.forEach((item) => {
                    setStateRef('updates', 'MethodSpending', 'push', item._id)
                })
                budgetData?.CategorySpending?.forEach((item) => {
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
                stateRef.current.updates = structuredClone(defaultStateRef.updates)
            }
        }
    }, [budgetSpending.data])

    const onsubmit: SubmitHandler<IMakeBudgetForm> = async (data) => {
        try {
            setSubmitLoading(true)
            const { MethodSpending, CategorySpending, date } = data
            const _date = moment(date)
            const _id = service.getBudgetId(userProfile?._id as string, _date)
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
                servicesBudget.update(__, 'methodSpending', updates.MethodSpending, MethodSpending)

                // update categorySpending
                servicesBudget.update(__, 'categorySpending', updates.CategorySpending, CategorySpending)
            }

            if (removes) {
                // delete methodSpending
                servicesBudget.delete(__, removes.CategorySpending)

                // delete categorySpending
                servicesBudget.delete(__, removes.MethodSpending)
            }

            // create methodSpending
            const methodSpendingCreates = MethodSpending?.filter(
                (item) => !item._id || !updates.MethodSpending.concat(removes.MethodSpending).includes(item._id)
            )
            servicesBudget.create(__, 'methodSpending', _id, methodSpendingCreates, userProfile?._id as string)

            // create categorySpending
            const categorySpendingCreates = CategorySpending?.filter(
                (item) => !item._id || !updates.CategorySpending.concat(removes.CategorySpending).includes(item._id)
            )
            servicesBudget.create(__, 'categorySpending', _id, categorySpendingCreates, userProfile?._id as string)

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
            toast.success<string>(t(LANGUAGE.NOTIFY_UPDATE_BUDGET_SUCCESS))
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
        const _id = service.getBudgetId(userProfile?._id as string, _date)
        setQueryData((prev) => ({
            ...prev,
            params: {
                ...prev.params,
                budgetId: _id,
                startDate: service.getDateOfMonth('start', _date),
                endDate: service.getDateOfMonth('end', _date),
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
    }, [budgetSpending, methodSpending, categorySpending, loading, t])

    return {
        form,
        onsubmit,
        handleChangeDate,
        handlePreviousMonth,
        tabOptions,
    }
}

export default useBudget
