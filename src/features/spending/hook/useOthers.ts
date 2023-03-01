import { useEffect } from 'react'
import { Data } from '~/@types/hook'
import { OthersQueryData } from '~/@types/spending'
import { TAGS } from '~/constant'
import { useCheck } from '~/context'
import { useQuery } from '~/hook'
import { GET_CATEGORY, GET_METHOD } from '~/schema/query/spending'
import { useProfile } from '~/store/auth'

const useOthers = (): [Data<OthersQueryData>, (...keys: (keyof OthersQueryData)[]) => string | null] => {
    const { userProfile } = useProfile()
    const [data, fetchData, deleteCaches, reload] = useQuery<OthersQueryData>(
        {
            method: GET_METHOD,
            category: GET_CATEGORY,
        },
        {
            userId: userProfile?._id as string,
        },
        {
            category: TAGS.ENUM,
            method: TAGS.ENUM,
        }
    )

    useEffect(() => {
        fetchData()
    }, [])

    useCheck(reload)

    return [data, deleteCaches]
}

export default useOthers
