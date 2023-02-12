import {
    ITrackingFieldName,
    ITrackingFieldParam,
    ITrackingFieldValue,
    ITrackingQuery,
    ITrackingService,
} from '~/@types/tracking'
import { client } from '~/sanityConfig'

const trackingService: ITrackingService = {
    transaction<T>() {
        let _query: ITrackingQuery | null = null,
            _params: ITrackingFieldParam | null = null,
            _fields: { [key in ITrackingFieldName<T>]: ITrackingFieldValue } = {}

        const validate = () => {
            if (!_query) {
                throw new Error('Tracking query is required')
            }
            if (!_params) {
                throw new Error('Tracking params is required')
            }
            if (Object.keys(_fields).length === 0) {
                throw new Error('Tracking fields is required')
            }
        }

        const log = () => {
            console.log('query', _query)
            console.log('params', _params)
            console.log('fields', _fields)
        }

        const getExecuteQuery = () => {
            return ''
        }

        const fetchTrackingData = async (query: ITrackingQuery | null) => {
            try {
                if (!_params || !query) return

                const data = await client.fetch(query, {
                    ..._params,
                    ..._fields,
                })
                return data
            } catch (error) {
                console.error(error)
            }
        }

        return {
            addQuery(query) {
                _query = query
                return this
            },
            addParams(params) {
                _params = params
                return this
            },
            addFields(name, value) {
                _fields[name] = value
                return this
            },
            async execute() {
                validate()
                log()
                const query = getExecuteQuery()
                // const data = await fetchTrackingData(query)
                // return data
            },
        }
    },
}
export default trackingService
