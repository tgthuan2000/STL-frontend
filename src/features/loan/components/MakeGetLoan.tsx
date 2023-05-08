import { isEmpty, isUndefined } from 'lodash'
import moment from 'moment'
import { useEffect, useMemo } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { IMakeGetLoanForm, QueryDataMakeGetLoan } from '~/@types/loan'
import { Button, SubmitWrap } from '~/components'
import { AutoComplete, DatePicker, Input, TextArea, UploadImage } from '~/components/_base'
import { TAGS } from '~/constant'
import { useCache, useCheck, useConfig, useLoading, useSlideOver } from '~/context'
import { useQuery, useServiceQuery } from '~/hook'
import LANGUAGE from '~/i18n/language/key'
import { client } from '~/sanityConfig'
import { GET_USER_LOAN } from '~/schema/query/loan'
import { GET_METHOD_SPENDING } from '~/schema/query/spending'
import { useProfile } from '~/store/auth'
import { getImageReference } from '~/utils'
import StatusLoan from './common/StatusLoan'

const MakeGetLoan = () => {
    const { t } = useTranslation()
    const { close } = useSlideOver()
    const { userProfile } = useProfile()
    const { getKindSpendingId, kindSpending } = useConfig()
    const { loading, setSubmitLoading } = useLoading()
    const { needCheckWhenLeave } = useCheck()
    const { GET_PAY_DUE_LOAN, GET_RECENT_LOAN, GET_STATISTIC_LOAN } = useServiceQuery()
    const { deleteCache } = useCache()

    const kindLoanId = useMemo(() => {
        return getKindSpendingId('GET_LOAN')
    }, [kindSpending])

    const [{ methodSpending, userLoan }, fetchData, deleteCacheData, reloadData] = useQuery<QueryDataMakeGetLoan>(
        { methodSpending: GET_METHOD_SPENDING, userLoan: GET_USER_LOAN },
        { userId: userProfile?._id as string },
        { methodSpending: TAGS.ENUM, userLoan: TAGS.ENUM }
    )

    useEffect(() => {
        if (!isUndefined(kindLoanId)) {
            fetchData()
        }
    }, [kindLoanId])

    const form = useForm<IMakeGetLoanForm>({
        defaultValues: {
            amount: '',
            methodReference: null,
            estimatePaidDate: null,
            userLoan: null,
            description: '',
            image: null,
        },
    })

    const onsubmit: SubmitHandler<IMakeGetLoanForm> = async (data) => {
        setSubmitLoading(true)
        let { amount, methodReference, description, estimatePaidDate, userLoan, image } = data
        let imageId = null
        amount = Number(amount)
        description = description.trim()

        try {
            if (image) {
                const response = await client.assets.upload('image', image)
                imageId = response._id
            }

            const documentSpending = {
                _type: 'spending',
                amount,
                description: `${methodReference ? 'Cộng gốc' : 'Tạm vay'}${description ? `\n${description}` : ''}`,
                kindSpending: {
                    _type: 'reference',
                    _ref: kindLoanId,
                },
                date: moment().format(), // for statistic
                estimatePaidDate: estimatePaidDate ? moment(estimatePaidDate).format() : undefined,
                paid: false,
                ...(methodReference && {
                    surplus: methodReference.surplus,
                    methodReference: {
                        _type: 'reference',
                        _ref: methodReference._id,
                    },
                }),
                userLoan: {
                    _type: 'reference',
                    _ref: userLoan?._id,
                },
                user: {
                    _type: 'reference',
                    _ref: userProfile?._id,
                },
                ...getImageReference(imageId),
            }
            const __ = client.transaction()
            __.create(documentSpending)

            const updateUserLoan = client
                .patch(userLoan?._id as string)
                .setIfMissing({
                    surplus: 0,
                    countUsed: 0,
                })
                .inc({
                    surplus: amount,
                    countUsed: 1,
                })
            __.patch(updateUserLoan)

            if (methodReference) {
                const updateMethodReference = client
                    .patch(methodReference?._id as string)
                    .setIfMissing({
                        countUsed: 0,
                        surplus: 0,
                    })
                    .inc({
                        countUsed: 1,
                        surplus: amount,
                    })
                __.patch(updateMethodReference)
            }

            await __.commit()

            let res
            setTimeout(() => {
                if (methodReference) {
                    res = deleteCacheData('methodSpending', 'userLoan')
                } else {
                    res = deleteCacheData('userLoan')
                }
                console.log(res)

                reloadData()
            }, 0)

            form.reset({ amount: '', methodReference, userLoan, image: null }, { keepDefaultValues: true })
            toast.success<string>(t(LANGUAGE.NOTIFY_CREATE_GET_LOAN_SUCCESS))
            deleteCache([GET_PAY_DUE_LOAN, GET_RECENT_LOAN, GET_STATISTIC_LOAN])
            needCheckWhenLeave()
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitLoading(false)
        }
    }

    const handleReloadData = async (keys: keyof QueryDataMakeGetLoan) => {
        const res = deleteCacheData(keys)
        console.log(res)
        reloadData()
    }

    return (
        <form onSubmit={form.handleSubmit(onsubmit)} className='flex h-full flex-col'>
            <div className='h-0 flex-1 overflow-y-auto overflow-x-hidden'>
                <div className='flex flex-1 flex-col justify-between'>
                    <div className='divide-y divide-gray-200 px-4 sm:px-6'>
                        <div className='space-y-6 pt-3 pb-5'>
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
                                name='methodReference'
                                form={form}
                                data={methodSpending.data}
                                label={t(LANGUAGE.METHOD_RECEIVE)}
                                loading={methodSpending.loading}
                                onReload={
                                    isEmpty(methodSpending.data) ? undefined : () => handleReloadData('methodSpending')
                                }
                            />

                            <StatusLoan form={form} name='methodReference' />

                            <DatePicker name='estimatePaidDate' form={form} label={t(LANGUAGE.ESTIMATE_PAID_DATE)} />

                            <AutoComplete
                                name='userLoan'
                                form={form}
                                rules={{
                                    required: t(LANGUAGE.REQUIRED_USER_GET_LOAN) as any,
                                }}
                                data={userLoan.data}
                                label={t(LANGUAGE.USER_GET_LOAN)}
                                valueKey='userName'
                                loading={userLoan.loading}
                                onReload={isEmpty(userLoan.data) ? undefined : () => handleReloadData('userLoan')}
                                showImage
                                surplusName={t(LANGUAGE.ASSET)}
                            />

                            <TextArea name='description' form={form} label={t(LANGUAGE.NOTE)} />

                            <UploadImage name='image' form={form} label={t(LANGUAGE.IMAGE_OPTION)} />
                        </div>
                    </div>
                </div>
            </div>
            <SubmitWrap>
                <Button color='radicalRed' type='submit' disabled={loading.submit}>
                    {t(LANGUAGE.SAVE)}
                </Button>
                <Button color='outline' type='button' onClick={close}>
                    {t(LANGUAGE.CANCEL)}
                </Button>
            </SubmitWrap>
        </form>
    )
}

export default MakeGetLoan
