import clsx from 'clsx'
import { isEmpty } from 'lodash'
import React, { useMemo, useState } from 'react'
import { IPermissionGroup, IPermissions } from '~/@types/role-control'
import { CheckButton } from '~/components'
import ExpandHeader from './ExpandHeader'

interface GroupProps {
    data: IPermissionGroup
    permissionsChecked: IPermissions[]
    onPermissionCheck: (permission: IPermissions) => void
    disabled: boolean
}

const Group: React.FC<GroupProps> = (props) => {
    const { data, permissionsChecked, disabled, onPermissionCheck } = props
    const [expand, setExpand] = useState(false)

    const numberChecked = useMemo(
        () => (permissionsChecked.length > 0 ? `${permissionsChecked.length}/${data.permissions.length}` : ''),
        [permissionsChecked]
    )

    return (
        <div>
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
        </div>
    )
}

export default Group
