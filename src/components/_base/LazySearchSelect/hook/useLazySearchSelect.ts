import { useRef, useState } from 'react'
import { IUserProfile } from '~/@types/auth'
import { ParamsTypeUseQuery, QueryTypeUseQuery, TagsTypeUseQuery } from '~/@types/hook'
import { COUNT_PAGINATE, TAGS } from '~/constant'
import { useQuery } from '~/hook'
import { SEARCH_USER_PAGINATE } from '~/schema/query/user'

interface UseLazySearchSelect {
    users: {
        data: IUserProfile[]
        hasNextPage: boolean
    }
}

interface DataQuery {
    loading: boolean
    data: { data: IUserProfile[]; hasNextPage: boolean } | undefined
    query: string
    params?: ParamsTypeUseQuery | undefined
    tags: TAGS
}

type useLazySearchResult = [boolean, DataQuery, (search: string) => void, () => void]

const useLazySearchSelect = (): useLazySearchResult => {
    const [{ query, params, tags }, setQuery] = useState<{
        query: QueryTypeUseQuery<UseLazySearchSelect>
        params: ParamsTypeUseQuery
        tags: TagsTypeUseQuery<UseLazySearchSelect>
    }>({
        query: { users: SEARCH_USER_PAGINATE },
        params: { search: '', __fromUser: 0, __toUser: COUNT_PAGINATE },
        tags: { users: TAGS.SHORT },
    })
    const [{ users }, , , reload] = useQuery<UseLazySearchSelect>(query, params, tags)
    const searchFirst = useRef(false)
    const searchLoading = searchFirst.current ? users.loading : false

    const search = (search: string) => {
        if (search) {
            if (!searchFirst.current) {
                searchFirst.current = true
            }
            setQuery((prev) => ({
                ...prev,
                params: {
                    ...prev.params,
                    search: '*' + search.toLowerCase() + '*',
                },
            }))

            reload()
        }
    }

    const getMore = () => {
        const length = users?.data?.data.length

        if (length) {
            setQuery((prev) => ({
                ...prev,
                params: { ...prev.params, __fromUser: length, __toUser: length + COUNT_PAGINATE },
            }))
            reload('users')
        }
    }

    return [searchLoading, users, search, getMore]
}

export default useLazySearchSelect
