import { useEffect, useMemo, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ParamsTypeUseQuery, QueryTypeUseQuery, TagsTypeUseQuery } from '~/@types/hook'
import { AddCategoryQueryData, IAddCategoryForm } from '~/@types/spending'
import { Button, CheckName, SubmitWrap } from '~/components'
import { Input, Selection } from '~/components/_base'
import { TAGS } from '~/constant'
import { KIND_SPENDING } from '~/constant/spending'
import { SlideOverHOC, useCache, useCheck, useConfig, useLoading, useSlideOver } from '~/context'
import { useQuery } from '~/hook'
import LANGUAGE from '~/i18n/language/key'
import { client } from '~/sanityConfig'
import { GET_CATEGORY_SPENDING } from '~/schema/query/spending'
import { getCategorySpending } from '~/services/query'
import { useProfile } from '~/store/auth'

const AddCategory = () => {
    const { t } = useTranslation()
    const { setIsOpen } = useSlideOver()
    const navigate = useNavigate()
    const { kindSpending, getKindSpendingId } = useConfig()
    const { userProfile } = useProfile()
    const { loading, setSubmitLoading } = useLoading()
    const { deleteCache } = useCache()
    const { needCheckWhenLeave } = useCheck()

    const kinds = useMemo(
        () => kindSpending.filter((kind) => [KIND_SPENDING.COST, KIND_SPENDING.RECEIVE].includes(kind.key)),
        [kindSpending]
    )

    const form = useForm<IAddCategoryForm>({
        defaultValues: {
            name: '',
            kindSpending: kinds.find((kind) => kind._id === getKindSpendingId('RECEIVE')),
        },
    })

    const watchName = form.watch('name')
    const watchKind = form.watch('kindSpending._id')

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
        let { name, kindSpending } = data
        // delete spaces between and last first
        name = name.replace(/\s+/g, ' ').trim()
        // capitalize first letter
        name = name.charAt(0).toUpperCase() + name.slice(1)
        // add to database
        const document = {
            _type: 'categorySpending',
            name,
            kindSpending: {
                _type: 'reference',
                _ref: kindSpending?._id,
            },
            countUsed: 0,
            user: {
                _type: 'reference',
                _ref: userProfile?._id,
            },
        }
        try {
            await client.create(document)
            const result = deleteCache([
                getCategorySpending({ userProfile, kindSpending: kindSpending?._id as string }),
            ])
            console.log(result)
            toast.success<string>(t(LANGUAGE.NOTIFY_CREATE_CATEGORY_SUCCESS))
            form.reset({ name: '', kindSpending }, { keepDefaultValues: true })
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
        <form onSubmit={form.handleSubmit(onsubmit)} className='flex h-full flex-col'>
            <div className='h-0 flex-1 overflow-y-auto overflow-x-hidden'>
                <div className='flex flex-1 flex-col justify-between'>
                    <div className='divide-y divide-gray-200 px-4 sm:px-6'>
                        <div className='space-y-6 pt-6 pb-5'>
                            <Selection
                                name='kindSpending'
                                form={form}
                                rules={{
                                    required: t(LANGUAGE.REQUIRED_KIND) as string,
                                }}
                                label={t(LANGUAGE.CATEGORY)}
                                placeholder={t(LANGUAGE.PLACEHOLDER_CHOOSE_KIND)}
                                data={kinds}
                                idKey='_id'
                                valueKey='name'
                            />

                            <Input
                                name='name'
                                form={form}
                                rules={{
                                    required: t(LANGUAGE.REQUIRED_CATEGORY_NAME) as any,
                                    maxLength: {
                                        value: 50,
                                        message: t(LANGUAGE.CATEGORY_NAME_MAX_50),
                                    },
                                }}
                                type='text'
                                label={t(LANGUAGE.CATEGORY_NAME)}
                            />

                            <CheckName
                                show={Boolean(
                                    !categorySpending.loading && form.watch('kindSpending') && watchName.length >= 2
                                )}
                                list={sameCategoryList}
                                watchValue={watchName}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <SubmitWrap>
                <Button color='cyan' type='submit' disabled={loading.submit}>
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

export default SlideOverHOC(AddCategory)
