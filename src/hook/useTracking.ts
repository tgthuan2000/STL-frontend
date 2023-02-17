import { get } from 'lodash'
import { useCallback, useMemo, useState } from 'react'
import { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { ITrackingQuery } from '~/@types/tracking'
import {useProfile} from '~/store/auth'
import trackingService from '~/tracking'

const useTracking = <T extends FieldValues>(form: UseFormReturn<T, any>, query: ITrackingQuery) => {
    const [value, setValue] = useState<any>()
    const [loading, setLoading] = useState<boolean>(false)
    const { userProfile } = useProfile()
    const trans = useMemo(
        () =>
            trackingService
                .transaction<T>()
                .addQuery(query)
                .addParams({ userId: userProfile?._id as string }),
        []
    )

    const tracking = useCallback(
        async (name: Path<T>) => {
            const isValid = await form.trigger(name)
            if (!isValid) return

            try {
                setLoading(true)
                const value = form.getValues(name)
                trans.addFields(name, get(value, '_id') ?? value)
                const data = await trans.execute()
                setValue(data)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        },
        [trans]
    )

    return { value, tracking, loading }
}

export default useTracking
