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
    const [{ roles, permissions }, fetchData] = useQuery<QueryData>(
        { roles: GET_ROLES, permissions: GET_PERMISSIONS },
        {},
        { roles: TAGS.ENUM, permissions: TAGS.ENUM }
    )

    useEffect(() => {
        fetchData()
    }, [])

    return { roles, permissions }
}

export default useRoleControl
