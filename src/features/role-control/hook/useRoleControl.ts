import { useEffect } from 'react'
import { IPermissionGroup, IRoleControl } from '~/@types/role-control'
import { TAGS } from '~/constant'
import { useQuery } from '~/hook'
import { GET_PERMISSIONS, GET_ROLES } from '~/schema/query/role-control'

interface QueryData {
    roles: Array<IRoleControl>
    permissions: Array<IPermissionGroup>
}

const useRoleControl = () => {
    const [{ roles, permissions }, fetchData, deletedCaches, reloadData] = useQuery<QueryData>(
        { roles: GET_ROLES, permissions: GET_PERMISSIONS },
        {},
        { roles: TAGS.ENUM, permissions: TAGS.ENUM }
    )

    useEffect(() => {
        fetchData()
    }, [])

    const refetch = () => {
        deletedCaches('permissions', 'roles')
        reloadData()
    }

    return { roles, permissions, refetch }
}

export default useRoleControl
