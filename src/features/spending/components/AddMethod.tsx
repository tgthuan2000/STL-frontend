import { yupResolver } from '@hookform/resolvers/yup'
import { isEmpty } from 'lodash'
import { useEffect, useMemo } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { AddMethodQueryData, IAddMethodForm } from '~/@types/spending'
import { Button, CheckName, SlideFormWrap, SubmitWrap } from '~/components'
import { Checkbox, Input } from '~/components/_base'
import { TAGS } from '~/constant'
import { useCache, useCheck, useLoading, useSlideOver } from '~/context'
import { useQuery, useServiceQuery } from '~/hook'
import LANGUAGE from '~/i18n/language/key'
import { client } from '~/sanityConfig'
import { GET_METHOD_SPENDING } from '~/schema/query/spending'
import { useProfile } from '~/store/auth'
import { RecommendOption } from './AddCategory'

const recommends: RecommendOption[] = [
    {
        id: '1',
        name: 'Tiền mặt',
    },
    {
        id: '2',
        name: 'Momo',
    },
    {
        id: '3',
        name: 'Zalo Pay',
    },
    {
        id: '4',
        name: 'VN Pay',
    },
]

const useSchema = () => {
    const { t } = useTranslation()

    const schema = useMemo(() => {
        return yup.object().shape({
            name: yup.string().when('recommends', (recommends, schema) => {
                if (isEmpty(recommends)) {
                    return schema
                        .required(t(LANGUAGE.REQUIRED_METHOD_NAME) as string)
                        .max(50, t(LANGUAGE.METHOD_NAME_MAX_50) as string)
                }
            }),
            recommends: yup.array().of(yup.object().shape({ id: yup.string(), name: yup.string() })),
        })
    }, [t])

    return schema
}

const AddMethod = () => {
    const { t } = useTranslation()
    const { close } = useSlideOver()
    const { userProfile } = useProfile()
    const { loading, setSubmitLoading } = useLoading()
    const { deleteCache } = useCache()
    const { needCheckWhenLeave } = useCheck()
    const { METHOD_SPENDING_DESC_SURPLUS, METHOD_SPENDING } = useServiceQuery()
    const schema = useSchema()
    const form = useForm<IAddMethodForm>({
        defaultValues: {
            name: '',
            recommends: [],
        },
        resolver: yupResolver(schema),
    })

    const [{ methodSpending }, fetchData] = useQuery<AddMethodQueryData>(
        { methodSpending: GET_METHOD_SPENDING },
        { userId: userProfile?._id as string },
        { methodSpending: TAGS.ENUM }
    )

    useEffect(() => {
        fetchData()
    }, [])

    const onsubmit: SubmitHandler<IAddMethodForm> = async (data) => {
        setSubmitLoading(true)
        const { name, recommends } = data

        // add to database
        const createDocument = (name: string) => {
            // delete spaces between and last first
            name = name.replace(/\s+/g, ' ').trim()
            // capitalize first letter
            name = name.charAt(0).toUpperCase() + name.slice(1)

            return {
                _type: 'methodSpending',
                name,
                surplus: 0,
                countUsed: 0,
                user: {
                    _type: 'reference',
                    _ref: userProfile?._id,
                },
                display: true,
            }
        }
        try {
            const transaction = client.transaction()

            if (name) {
                transaction.create(createDocument(name))
            }

            if (!isEmpty(recommends)) {
                recommends.forEach((recommend) => {
                    transaction.create(createDocument(recommend.name))
                })
            }

            await transaction.commit()

            // navigate to dashboard
            const result = deleteCache([METHOD_SPENDING_DESC_SURPLUS, METHOD_SPENDING])
            console.log(result)
            toast.success<string>(t(LANGUAGE.NOTIFY_CREATE_METHOD_SUCCESS))
            form.reset({ name: '', recommends: [] }, { keepDefaultValues: true })
            needCheckWhenLeave()
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitLoading(false)
        }
    }

    const watchName = form.watch('name')

    const sameMethodList = useMemo(() => {
        return methodSpending.data?.filter((item) => {
            return item.name.toLowerCase().includes(watchName.toLowerCase())
        })
    }, [watchName])

    return (
        <SlideFormWrap
            onSubmit={form.handleSubmit(onsubmit)}
            buttonZone={
                <SubmitWrap>
                    <Button color='cyan' type='submit' disabled={loading.submit}>
                        {t(LANGUAGE.CREATE)}
                    </Button>
                    <Button color='outline' type='button' onClick={close}>
                        {t(LANGUAGE.CANCEL)}
                    </Button>
                </SubmitWrap>
            }
        >
            <Input name='name' form={form} type='text' label={t(LANGUAGE.METHOD_NAME)} />
            <CheckName
                show={Boolean(!methodSpending.loading && watchName.length >= 2)}
                list={sameMethodList}
                watchValue={watchName}
            />
            {!methodSpending.loading && isEmpty(methodSpending.data) && (
                <Checkbox
                    form={form}
                    name='recommends'
                    label={t(LANGUAGE.RECOMMEND)}
                    options={recommends}
                    getOptionKey={(item) => item?.id}
                    getOptionLabel={(item) => item?.name}
                />
            )}
        </SlideFormWrap>
    )
}

export default AddMethod
