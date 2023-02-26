import { isEmpty } from 'lodash'
import { useEffect } from 'react'
import { Data } from '~/@types/hook'
import { IMethodSpending } from '~/@types/spending'
import { TAGS } from '~/constant'
import { useCheck, useConfig } from '~/context'
import { useQuery } from '~/hook'
import { GET_METHOD_SPENDING_DESC_SURPLUS } from '~/schema/query/spending'
import { useProfile } from '~/store/auth'

const useMethod = (): [Data<{ method: IMethodSpending[] }>] => {
    const { kindSpending } = useConfig()
    const { userProfile } = useProfile()

    const [data, fetchData, , reload] = useQuery<{
        method: IMethodSpending[]
    }>({ method: GET_METHOD_SPENDING_DESC_SURPLUS }, { userId: userProfile?._id as string }, { method: TAGS.ALTERNATE })

    useEffect(() => {
        if (!isEmpty(kindSpending)) {
            fetchData()
        }
    }, [kindSpending])

    useCheck(reload)

    return [data]
}

export default useMethod
