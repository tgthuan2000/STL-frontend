import React, { useMemo } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { List } from '~/@types'
import { IPermissionGroup, IPermissions, IRoleControl } from '~/@types/role-control'
import LoadingText from '~/components/Loading/LoadingText'
import { FormData } from '.'
import Group from './Group'

interface Form {
    data: IPermissionGroup[] | undefined
    onSubmit: (data: any) => void
    id: string
    selectedRole: List<IRoleControl> | undefined
    form: UseFormReturn<FormData, any>
}

const Form: React.FC<Form> = (props) => {
    const { id, data, form, selectedRole, onSubmit } = props

    const permissions = form.watch('permissions')

    const handlePermissionCheck = (permission: IPermissions) => {
        const permissions = form.getValues('permissions')
        const index = permissions.findIndex((p) => p === permission._id)

        if (index !== -1) {
            permissions.splice(index, 1)
        } else {
            permissions.push(permission._id)
        }
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
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-1 flex-col gap-4 overflow-auto px-2 dark:border-t-slate-700 sm:p-4 md:border-t md:p-6'
        >
            {renderGroup}
        </form>
    )
}

export default Form
