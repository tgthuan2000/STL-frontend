import { SanityDocument } from '@sanity/client'
import { useMemo } from 'react'
import { CreateCategoryDoc, CreateDoc, CreateMethodDoc, Service } from '~/@types/hook'
import { client } from '~/sanityConfig'
import { useProfile } from '~/store/auth'

const useDocument = (): Service => {
    const { userProfile } = useProfile()

    const _createMethodDoc: CreateMethodDoc = useMemo(() => {
        return {
            _type: 'methodSpending',
            surplus: 0,
            user: {
                _type: 'reference',
                _ref: userProfile?._id,
            },
            display: true,
        }
    }, [userProfile?._id])

    const _createCategoryDoc: CreateCategoryDoc = useMemo(() => {
        return {
            _type: 'categorySpending',
            kindSpending: {
                _type: 'reference',
            },
            user: {
                _type: 'reference',
                _ref: userProfile?._id,
            },
            display: true,
        }
    }, [userProfile?._id])

    const services: Service = useMemo(() => {
        return {
            createMethod(name) {
                _createMethodDoc.name = name
                return _createMethodDoc
            },
            createCategory(name, kindSpendingId) {
                _createCategoryDoc.name = name
                _createCategoryDoc.kindSpending._ref = kindSpendingId
                return _createCategoryDoc
            },
            async create(document) {
                const data = (await client.create(document as any)) as SanityDocument<CreateDoc> // { _id, name }
                return data
            },
        }
    }, [_createMethodDoc, _createCategoryDoc])

    return services
}

export default useDocument
