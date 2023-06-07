import { yupResolver } from '@hookform/resolvers/yup'
import { isEmpty, isEqual } from 'lodash'
import React, { useEffect, useId, useMemo, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { List } from '~/@types'
import { IPermissionGroup, IRoleControl } from '~/@types/role-control'
import { Button } from '~/components'
import LoadingWait from '~/components/Loading/LoadingWait'
import { useLoading } from '~/context'
import LANGUAGE from '~/i18n/language/key'
import { client } from '~/sanityConfig'
import { getDifference } from '~/services'
import Form from './Form'

interface Props {
    data: IPermissionGroup[] | undefined
    loading: boolean
    selectedRole: List<IRoleControl> | undefined
    refetch: () => void
}

export interface FormData {
    permissions: string[]
}

const Permission: React.FC<Props> = (props) => {
    const { data, loading, selectedRole, refetch } = props
    const { t } = useTranslation()
    const formId = useId()
    const originPermission = useRef<string[]>([])
    const { setSubmitLoading } = useLoading()

    const form = useForm<FormData>({
        defaultValues: {
            permissions: [],
        },
        resolver: yupResolver(
            yup.object().shape({
                permissions: yup.array().of(yup.string().required()).required(),
            })
        ),
    })

    const permissions = form.watch('permissions')

    useEffect(() => {
        if (selectedRole) {
            const permissions = selectedRole.permissions.map((permission) => permission._id)
            originPermission.current = permissions
            form.setValue('permissions', permissions)
        } else {
            originPermission.current = []
            form.setValue('permissions', [])
        }
    }, [selectedRole])

    const isDisabledSubmitBtn = useMemo(() => {
        return !selectedRole || isEqual(permissions.sort(), originPermission.current.sort())
    }, [permissions, selectedRole])

    const handleSubmit = async (data: FormData) => {
        const { deleted, added } = getDifference(originPermission.current, data.permissions)

        if (isEmpty(deleted) && isEmpty(added)) return

        try {
            setSubmitLoading(true)
            const transaction = client.transaction()

            if (!isEmpty(deleted)) {
                deleted.forEach((permission) => {
                    const patch = client.patch(selectedRole?._id as string, {
                        unset: [`permissions[_ref=="${permission}"]`],
                    })
                    transaction.patch(patch)
                })
            }

            if (!isEmpty(added)) {
                added.forEach((permission) => {
                    const patch = client.patch(selectedRole?._id as string, {
                        insert: {
                            after: 'permissions[-1]',
                            items: [{ _ref: permission, _type: 'reference' }],
                        },
                    })
                    transaction.patch(patch)
                })
            }

            await transaction.commit({ autoGenerateArrayKeys: true })
            refetch()
            toast.success<string>(t(LANGUAGE.NOTIFY_UPDATE_SUCCESS))
        } catch (error: any) {
            console.log(error)
            toast.error<string>(error.message)
        } finally {
            setSubmitLoading(false)
        }
    }

    return (
        <div className='flex h-full flex-col'>
            <div className='flex items-center justify-between p-6'>
                <h1 className='whitespace-nowrap text-xl font-normal sm:text-2xl'>{t(LANGUAGE.PERMISSION)}</h1>

                <div className='flex items-center gap-3'>
                    <LoadingWait loading={loading} />
                </div>
            </div>
            <Form data={data} form={form} onSubmit={handleSubmit} id={formId} selectedRole={selectedRole} />
            {!isDisabledSubmitBtn && (
                <div className='flex justify-end gap-4 border-t p-3 dark:border-t-slate-700'>
                    <Button type='submit' color='indigo' form={formId}>
                        {t(LANGUAGE.SAVE)}
                    </Button>
                </div>
            )}
        </div>
    )
}

export default Permission
