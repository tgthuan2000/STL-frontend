import { useEffect } from 'react'
import { IRoleControl } from '~/@types/role-control'
import { TAGS } from '~/constant'
import { useQuery } from '~/hook'
import { GET_ROLES } from '~/schema/query/role-control'

interface QueryData {
    roles: Array<IRoleControl>
}

const useRole = () => {
    const [{ roles }, fetchData, deletedCaches, reloadData] = useQuery<QueryData>(
        { roles: GET_ROLES },
        {},
        { roles: TAGS.ENUM }
    )

    useEffect(() => {
        fetchData()
    }, [])

    const refetch = () => {
        deletedCaches('roles')
        reloadData()
    }

    return { roles, refetch }
}

export default useRole
