import { yupResolver } from '@hookform/resolvers/yup'
import { isEmpty } from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { ParamsTypeUseQuery, QueryTypeUseQuery, TagsTypeUseQuery } from '~/@types/hook'
import { AddCategoryQueryData, IAddCategoryForm } from '~/@types/spending'
import { Button, CheckName, FormWrap, SubmitWrap } from '~/components'
import { Checkbox, Input, Selection } from '~/components/_base'
import { TAGS } from '~/constant'
import { KIND_SPENDING } from '~/constant/spending'
import { useCache, useCheck, useConfig, useLoading, useSlideOver } from '~/context'
import { useQuery } from '~/hook'
import LANGUAGE from '~/i18n/language/key'
import { client } from '~/sanityConfig'
import { GET_CATEGORY_SPENDING } from '~/schema/query/spending'
import { getCategorySpending } from '~/services/query'
import { useProfile } from '~/store/auth'
export interface RecommendOption {
    id: string
    name: string
}

const recommendCosts: RecommendOption[] = [
    {
        id: 'cost-1',
        name: 'Xăng xe',
    },
    {
        id: 'cost-2',
        name: 'Ăn uống',
    },
    {
        id: 'cost-3',
        name: 'Phí sinh hoạt',
    },
    {
        id: 'cost-4',
        name: 'Chi phí khác',
    },
]

const recommendReceives: RecommendOption[] = [
    {
        id: 'receive-1',
        name: 'Lương',
    },
    {
        id: 'receive-2',
        name: 'Trợ cấp',
    },
    {
        id: 'receive-3',
        name: 'Thưởng',
    },
    {
        id: 'receive-4',
        name: 'Thu nhập khác',
    },
]

const useSchema = () => {
    const { t } = useTranslation()

    const schema = useMemo(() => {
        return yup.object().shape({
            kindSpending: yup.object().required(t(LANGUAGE.REQUIRED_KIND) as string),
            name: yup.string().when('recommends', (recommends, schema) => {
                if (isEmpty(recommends)) {
                    return schema
                        .required(t(LANGUAGE.REQUIRED_CATEGORY_NAME) as string)
                        .max(50, t(LANGUAGE.CATEGORY_NAME_MAX_50) as string)
                }
            }),
            recommends: yup.array().of(yup.object().shape({ id: yup.string(), name: yup.string() })),
        })
    }, [t])

    return schema
}

const AddCategory = () => {
    const { t } = useTranslation()
    const { close } = useSlideOver()
    const navigate = useNavigate()
    const { kindSpending, getKindSpendingId } = useConfig()
    const { userProfile } = useProfile()
    const { loading, setSubmitLoading } = useLoading()
    const { deleteCache } = useCache()
    const { needCheckWhenLeave } = useCheck()
    const schema = useSchema()
    const kinds = useMemo(
        () => kindSpending.filter((kind) => [KIND_SPENDING.COST, KIND_SPENDING.RECEIVE].includes(kind.key)),
        [kindSpending]
    )

    const form = useForm<IAddCategoryForm>({
        defaultValues: {
            name: '',
            kindSpending: kinds.find((kind) => kind._id === getKindSpendingId('RECEIVE')),
            recommends: [],
        },
        resolver: yupResolver(schema),
    })

    const watchName = form.watch('name')
    const watchKind = form.watch('kindSpending._id')
    const isCost = watchKind === getKindSpendingId('COST')

    const defaultValues = useMemo(() => {
        return {
            query: {
                categorySpending: GET_CATEGORY_SPENDING,
            },
            params: {
                userId: userProfile?._id as string,
                kindSpending: watchKind as string,
            },
            tags: {
                categorySpending: TAGS.ENUM,
            },
        }
    }, [watchKind])

    useEffect(() => {
        form.setValue('recommends', [])
        setQuery(defaultValues)
        reloadData()
    }, [defaultValues])

    const [{ query, params, tags }, setQuery] = useState<{
        query: QueryTypeUseQuery<AddCategoryQueryData>
        params: ParamsTypeUseQuery
        tags: TagsTypeUseQuery<AddCategoryQueryData>
    }>(defaultValues)

    const [{ categorySpending }, , , reloadData] = useQuery<AddCategoryQueryData>(query, params, tags)

    const onsubmit: SubmitHandler<IAddCategoryForm> = async (data) => {
        setSubmitLoading(true)
        const { name, kindSpending, recommends } = data

        // add to database
        const createDocument = (name: string) => {
            // delete spaces between and last first
            name = name.replace(/\s+/g, ' ').trim()
            // capitalize first letter
            name = name.charAt(0).toUpperCase() + name.slice(1)
            return {
                _type: 'categorySpending',
                name,
                kindSpending: {
                    _type: 'reference',
                    _ref: kindSpending?._id,
                },
                countUsed: 0,
                display: true,
                user: {
                    _type: 'reference',
                    _ref: userProfile?._id,
                },
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
            const result = deleteCache([
                getCategorySpending({ userProfile, kindSpending: kindSpending?._id as string }),
            ])
            console.log(result)
            toast.success<string>(t(LANGUAGE.NOTIFY_CREATE_CATEGORY_SUCCESS))
            form.reset({ name: '', kindSpending, recommends: [] }, { keepDefaultValues: true })
            needCheckWhenLeave()
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitLoading(false)
        }
    }

    const sameCategoryList = useMemo(() => {
        return categorySpending.data?.filter((item) => {
            return item.name.toLowerCase().includes(watchName.toLowerCase())
        })
    }, [watchName, watchKind, categorySpending.data])

    return (
        <FormWrap
            onSubmit={form.handleSubmit(onsubmit)}
            renderButton={
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
            <Selection
                name='kindSpending'
                form={form}
                label={t(LANGUAGE.CATEGORY)}
                placeholder={t(LANGUAGE.PLACEHOLDER_CHOOSE_KIND)}
                data={kinds}
                idKey='_id'
                valueKey='name'
            />
            <Input name='name' form={form} type='text' label={t(LANGUAGE.CATEGORY_NAME)} />
            <CheckName
                show={Boolean(!categorySpending.loading && form.watch('kindSpending') && watchName.length >= 2)}
                list={sameCategoryList}
                watchValue={watchName}
            />
            {!categorySpending.loading && isEmpty(categorySpending.data) && (
                <Checkbox
                    form={form}
                    name='recommends'
                    label={t(LANGUAGE.RECOMMEND)}
                    options={isCost ? recommendCosts : recommendReceives}
                    getOptionKey={(item) => item?.id}
                    getOptionLabel={(item) => item?.name}
                />
            )}
        </FormWrap>
    )
}

export default AddCategory
