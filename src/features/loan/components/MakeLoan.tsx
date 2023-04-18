import { isEmpty, isUndefined } from 'lodash'
import moment from 'moment'
import { Fragment, useEffect, useMemo } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { IMakeLoanForm, QueryDataMakeLoan } from '~/@types/loan'
import { Button, SubmitWrap } from '~/components'
import { AutoComplete, DatePicker, Input, LazySearchSelect, TextArea } from '~/components/_base'
import useLazySearchSelect from '~/components/_base/LazySearchSelect/hook/useLazySearchSelect'
import UserDeleteButton from '~/components/_base/LazySearchSelect/UserDeleteButton'
import UserList from '~/components/_base/LazySearchSelect/UserList'
import UserOption from '~/components/_base/LazySearchSelect/UserOption'
import { TAGS } from '~/constant'
import { SlideOverHOC, useCache, useCheck, useConfig, useLoading, useSlideOver } from '~/context'
import { useQuery, useServiceQuery } from '~/hook'
import LANGUAGE from '~/i18n/language/key'
import { client } from '~/sanityConfig'
import { GET_METHOD_SPENDING } from '~/schema/query/spending'
import { useProfile } from '~/store/auth'
import { getImageReference } from '~/utils'

const MakeLoan = () => {
    const { t } = useTranslation()
    const { setIsOpen } = useSlideOver()
    const navigate = useNavigate()
    const { userProfile } = useProfile()
    const { getKindSpendingId, kindSpending } = useConfig()
    const { loading, setSubmitLoading } = useLoading()
    const { needCheckWhenLeave } = useCheck()
    const { GET_PAY_DUE_LOAN, GET_RECENT_LOAN, GET_STATISTIC_LOAN } = useServiceQuery()
    const { deleteCache } = useCache()
    const [searchLoading, users, handleUserLoanSearch, handleUserLoanScrollGetMore] = useLazySearchSelect()

    const kindLoanId = useMemo(() => {
        return getKindSpendingId('LOAN')
    }, [kindSpending])

    const [{ methodSpending }, fetchData, deleteCacheData, reloadData] = useQuery<QueryDataMakeLoan>(
        { methodSpending: GET_METHOD_SPENDING },
        { userId: userProfile?._id as string },
        { methodSpending: TAGS.ENUM }
    )

    useEffect(() => {
        if (!isUndefined(kindLoanId)) {
            fetchData()
        }
    }, [kindLoanId])

    const form = useForm<IMakeLoanForm>({
        defaultValues: {
            amount: '',
            methodReference: null,
            estimatePaidDate: null,
            loanUsers: null,
            description: '',
            image: null,
        },
    })
    const __users = form.watch('loanUsers')

    const onsubmit: SubmitHandler<IMakeLoanForm> = async (data) => {
        setSubmitLoading(true)
        let { amount, methodReference, description, estimatePaidDate, loanUsers, image } = data
        let imageId = null
        amount = Number(amount)
        description = description.trim()

        try {
            // add to database
            if (image) {
                const response = await client.assets.upload('image', image)
                imageId = response._id
            }

            const documentLoan = {
                _type: 'spending',
                amount,
                description,
                paid: false,
                date: moment().format(), // for statistic
                estimatePaidDate: estimatePaidDate ? moment(estimatePaidDate).format() : undefined,
                kindSpending: {
                    _type: 'reference',
                    _ref: kindLoanId,
                },
                methodReference: {
                    _type: 'reference',
                    _ref: methodReference?._id,
                },
                // array
                // loanUsers: {
                //     _type: 'reference',
                //     _ref: loanUsers?._id,
                // },
                user: {
                    _type: 'reference',
                    _ref: userProfile?._id,
                },
                ...getImageReference(imageId),
            }

            const __ = client.transaction()
            __.create(documentLoan)

            loanUsers?.forEach((user) => {
                const updateUserLoan = client
                    .patch(user?._id as string)
                    .setIfMissing({
                        surplus: 0,
                        countUsed: 0,
                    })
                    .inc({
                        surplus: amount as number,
                        countUsed: 1,
                    })
                __.patch(updateUserLoan)
            })

            await __.commit()

            form.reset({ amount: '', methodReference, loanUsers }, { keepDefaultValues: true })
            toast.success<string>(t(LANGUAGE.NOTIFY_CREATE_LOAN_SUCCESS))
            deleteCache([GET_PAY_DUE_LOAN, GET_RECENT_LOAN, GET_STATISTIC_LOAN])
            needCheckWhenLeave()
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitLoading(false)
        }
    }

    const handleReloadData = async (keys: keyof QueryDataMakeLoan) => {
        const res = deleteCacheData(keys)
        console.log(res)
        reloadData()
    }

    const handleChangeUserLoan = (data: any) => {
        if (data) {
            if (!__users) {
                return [data]
            }
            if (!__users.find((u) => u._id === data._id)) {
                return [...__users, data]
            } else {
                return __users.filter((u) => u._id !== data._id)
            }
        }
    }

    return (
        <form onSubmit={form.handleSubmit(onsubmit)} className='flex h-full flex-col'>
            <div className='h-0 flex-1 overflow-y-auto overflow-x-hidden'>
                <div className='flex flex-1 flex-col justify-between'>
                    <div className='divide-y divide-gray-200 px-4 sm:px-6'>
                        <div className='space-y-6 pt-6 pb-5'>
                            <Input
                                name='amount'
                                form={form}
                                rules={{
                                    required: t(LANGUAGE.REQUIRED_AMOUNT) as any,
                                    min: {
                                        value: 0,
                                        message: t(LANGUAGE.AMOUNT_MIN_ZERO),
                                    },
                                }}
                                type='number'
                                label={t(LANGUAGE.AMOUNT)}
                            />

                            <AutoComplete
                                name='methodSpending'
                                form={form}
                                // rules={{
                                //     required: 'Yêu cầu chọn phương thức cho vay!',
                                // }}
                                data={methodSpending.data}
                                label={t(LANGUAGE.METHOD)}
                                loading={methodSpending.loading}
                                onReload={
                                    isEmpty(methodSpending.data) ? undefined : () => handleReloadData('methodSpending')
                                }
                            />

                            <DatePicker name='date' form={form} label={t(LANGUAGE.DATE)} />

                            <LazySearchSelect
                                name='loanUsers'
                                options={users.data?.data}
                                hasNextPage={users.data?.hasNextPage}
                                loading={searchLoading}
                                label={t(LANGUAGE.USER_LOAN)}
                                onChange={handleChangeUserLoan}
                                onSearch={handleUserLoanSearch}
                                onGetMore={handleUserLoanScrollGetMore}
                                getOptionLabel={(option, active) => <UserOption active={active} data={option} />}
                            />

                            <UserList
                                data={__users}
                                emptyComp={
                                    <p className='px-4 py-2 text-center text-gray-900 dark:text-slate-200'>
                                        {t(LANGUAGE.EMPTY_DATA)}
                                    </p>
                                }
                            >
                                {(user) => (
                                    <Fragment>
                                        <UserDeleteButton
                                            onClick={() => {
                                                const filtered = __users?.filter((u) => u._id !== user._id)
                                                if (filtered) {
                                                    form.setValue('loanUsers', filtered)
                                                }
                                            }}
                                        />
                                    </Fragment>
                                )}
                            </UserList>

                            <TextArea name='description' form={form} label={t(LANGUAGE.NOTE)} />
                        </div>
                    </div>
                </div>
            </div>
            <SubmitWrap>
                <Button color='prussianBlue' type='submit' disabled={loading.submit}>
                    {t(LANGUAGE.CREATE)}
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

export default SlideOverHOC(MakeLoan)
