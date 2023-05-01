import { useAutoAnimate } from '@formkit/auto-animate/react'
import { ChevronUpIcon, PlusIcon } from '@heroicons/react/24/outline'
import { yupResolver } from '@hookform/resolvers/yup'
import clsx from 'clsx'
import { isEmpty } from 'lodash'
import React, { memo, useEffect, useId, useMemo, useState } from 'react'
import { UseFormReturn, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { List } from '~/@types'
import { IPermissionGroup, IPermissions, IRoleControl } from '~/@types/role-control'
import { AnimateWrap, Button, CheckButton, ErrorText } from '~/components'
import LoadingText from '~/components/Loading/LoadingText'
import { Input, RichText, TextArea } from '~/components/_base'
import { useCheck, useDetailDialog, useLoading } from '~/context'
import LANGUAGE from '~/i18n/language/key'
import { client } from '~/sanityConfig'

interface Props {
    data: IPermissionGroup[] | undefined
    loading: boolean
    selectedRole: List<IRoleControl> | undefined
}

const schema = yup.object().shape({})

const Permission: React.FC<Props> = (props) => {
    const { data, loading, selectedRole } = props
    const { t } = useTranslation()
    const formId = useId()

    const handleSubmit = (data: any) => {
        console.log(data)
    }

    // if (loading) return <LoadingText className='p-6' />

    // if (!data || isEmpty(data) || !Array.isArray(data)) return <ErrorText className='p-6' />

    return (
        <div className='flex h-full flex-col'>
            <div className='flex items-center justify-between p-6'>
                <h1 className='text-xl font-normal sm:text-2xl'>{t(LANGUAGE.PERMISSION)}</h1>
                <Button type='submit' color='radicalRed' id={formId}>
                    {t(LANGUAGE.SAVE)}
                </Button>
            </div>
            {/* <div className='p-6'>search</div> */}
            <Form data={data} onSubmit={handleSubmit} id={formId} selectedRole={selectedRole} />
        </div>
    )
}

interface Form {
    data: IPermissionGroup[] | undefined
    onSubmit: (data: any) => void
    id: string
    selectedRole: List<IRoleControl> | undefined
}

interface FormData {
    permissions: string[]
}

const Form: React.FC<Form> = (props) => {
    const { id, data, selectedRole, onSubmit } = props
    const [ref] = useAutoAnimate<HTMLFormElement>()
    const form = useForm<FormData>({
        defaultValues: {
            permissions: [],
        },
        resolver: yupResolver(schema),
    })

    useEffect(() => {
        if (selectedRole) {
            const permissions = selectedRole.permissions.map((permission) => permission._id)
            form.setValue('permissions', permissions)
        } else {
            form.setValue('permissions', [])
        }
    }, [selectedRole])

    const permissions = form.watch('permissions')

    const handlePermissionCheck = (permission: IPermissions) => {
        const permissions = form.getValues('permissions')
        const index = permissions.findIndex((p) => p === permission._id)

        if (index !== -1) {
            permissions.splice(index, 1)
        } else {
            permissions.push(permission._id)
        }
        console.log(permissions)
        form.setValue('permissions', permissions)
    }

    const renderGroup = useMemo(() => {
        return (
            data?.map((group) => {
                const permissionsChecked = group.permissions.filter((permission) => {
                    return permissions.find((p) => p === permission._id)
                })

                return (
                    <Group
                        key={group._id}
                        data={group}
                        form={form}
                        permissionsChecked={permissionsChecked}
                        onPermissionCheck={handlePermissionCheck}
                        disabled={!selectedRole}
                    />
                )
            }) ?? <LoadingText />
        )
    }, [permissions, data])

    return (
        <form
            id={id}
            ref={ref}
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col gap-4 overflow-auto px-2 dark:border-t-slate-700 sm:p-4 md:border-t md:p-6'
        >
            {renderGroup}
        </form>
    )
}

interface GroupProps {
    data: IPermissionGroup
    form: UseFormReturn<FormData, any>
    permissionsChecked: IPermissions[]
    onPermissionCheck: (permission: IPermissions) => void
    disabled: boolean
}

const Group: React.FC<GroupProps> = (props) => {
    const { data, form, permissionsChecked, disabled, onPermissionCheck } = props
    const [expand, setExpand] = useState(false)

    const numberChecked = useMemo(
        () => (permissionsChecked.length > 0 ? `${permissionsChecked.length}/${data.permissions.length}` : ''),
        [permissionsChecked]
    )

    return (
        <AnimateWrap>
            <ExpandHeader
                id={data._id}
                label={data.name}
                expand={expand}
                onExpand={(value) => setExpand(value)}
                numberChecked={numberChecked}
            />
            {!isEmpty(data.permissions) && (
                <div
                    className={clsx('grid grid-cols-1 gap-3 transition-all lg:grid-cols-2 xl:grid-cols-3', {
                        'my-2': expand,
                    })}
                >
                    {expand ? (
                        <>
                            {data.permissions.map((permission) => {
                                const checked = !!permissionsChecked.find((p) => p._id === permission._id)

                                return (
                                    <CheckButton
                                        key={permission._id}
                                        type='checkbox'
                                        checked={checked}
                                        label={permission.name}
                                        onChange={() => {
                                            onPermissionCheck(permission)
                                        }}
                                        value={permission._id}
                                        className=''
                                        disabled={disabled}
                                        subLabel={permission.description}
                                    />
                                )
                            })}
                        </>
                    ) : (
                        <></>
                    )}
                </div>
            )}
        </AnimateWrap>
    )
}

interface ExpandHeaderProps {
    onExpand?: (expand: boolean) => void
    expand?: boolean
    label: string
    id: string
    numberChecked?: number | string
}

const ExpandHeader: React.FC<ExpandHeaderProps> = (props) => {
    const { onExpand, id, expand, label, numberChecked } = props
    const { set } = useDetailDialog()

    const toggleExpand = () => {
        onExpand?.(!expand)
    }

    const handleCreatePermission: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation()
        set({
            title: label,
            content: <Content groupId={id} />,
            fallback: <LoadingText />,
        })
    }

    return (
        <div
            className={clsx(
                'group flex cursor-pointer select-none items-center justify-between rounded-xl p-2 transition hover:bg-gray-200 dark:text-slate-300 dark:hover:bg-slate-700',
                { 'bg-gray-200 dark:bg-slate-700': expand }
            )}
            onClick={toggleExpand}
        >
            <h4 className='text-sm font-normal sm:text-base'>{label}</h4>
            <div className='flex items-center gap-2'>
                <ExpandButton expand={expand} Icon={PlusIcon} onClick={handleCreatePermission} />
                <ExpandButton expand={expand} className={clsx({ '-rotate-180': expand })} Icon={ChevronUpIcon} />
                <span>{numberChecked}</span>
            </div>
        </div>
    )
}

interface ContentProps {
    groupId: string
}

interface CreatePermissionForm {
    name: string
    description?: string
}

const Content: React.FC<ContentProps> = (props) => {
    const { groupId } = props
    const { t } = useTranslation()
    const { close } = useDetailDialog()
    const { setSubmitLoading } = useLoading()
    const { needCheckWhenLeave } = useCheck()

    const form = useForm<CreatePermissionForm>({
        defaultValues: {
            name: '',
            description: '',
        },
        resolver: yupResolver(
            yup.object().shape({
                name: yup.string().required(t(LANGUAGE.REQUIRED_FIELD) as string),
                description: yup.string(),
            })
        ),
    })

    const onSubmit = async (data: CreatePermissionForm) => {
        try {
            setSubmitLoading(true)
            const name = data.name.trim()
            const description = data.description?.trim()

            await client.createIfNotExists({
                _type: 'permission',
                _id: name.replaceAll(' ', '_').toUpperCase(),
                name,
                description,
                group: {
                    _type: 'reference',
                    _ref: groupId,
                },
            })
            toast.success<string>(t(LANGUAGE.NOTIFY_CREATE_SUCCESS))
            needCheckWhenLeave()
            close()
        } catch (error: any) {
            console.log(error)
            toast.error<string>(error.message)
        } finally {
            setSubmitLoading(false)
        }
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex h-full flex-col gap-2'>
            <div className='flex flex-1 flex-col gap-4 px-6 pb-6 pt-4'>
                <Input form={form} type='text' name='name' label={t(LANGUAGE.NAME)} />

                <TextArea form={form} name='description' label={t(LANGUAGE.SHORT_DESCRIPTION)} />
            </div>
            <div className='flex justify-end gap-2 px-6 pb-6 pt-4'>
                <Button type='button' color='outline' onClick={close}>
                    {t(LANGUAGE.CLOSE)}
                </Button>
                <Button type='submit' color='indigo'>
                    {t(LANGUAGE.CREATE)}
                </Button>
            </div>
        </form>
    )
}

interface ExpandButtonProps {
    className?: string
    expand?: boolean
    Icon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const ExpandButton: React.FC<ExpandButtonProps> = (props) => {
    const { expand, className, Icon, onClick } = props

    return (
        <button
            type='button'
            onClick={onClick}
            className={clsx(
                'text-gray-700 transition dark:text-slate-300 sm:group-hover:opacity-100',
                expand ? 'opacity-100' : 'sm:opacity-0',
                className
            )}
        >
            <Icon className='h-5 w-5' />
        </button>
    )
}

export default memo(Permission)
