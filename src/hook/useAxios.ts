import { AxiosRequestConfig } from 'axios'
import { useCallback } from 'react'
import axios from '~/axiosConfig'
import { CODE } from '~/constant/code'
import { useAxiosService } from '~/services/axios'

type ReturnType<T> = { code?: CODE; data?: T }
type Url = string
type Data = any
type Config = AxiosRequestConfig<any> | undefined

const useAxios = () => {
    const { notify } = useAxiosService()

    const _catchNotify = useCallback(
        <T>(res: ReturnType<T>) => {
            if (res.code) {
                const isSuccess = notify(res.code)

                if (typeof isSuccess === 'boolean' && isSuccess === true) {
                    return res
                }
                throw new Error(res.code)
            }

            return res
        },
        [notify]
    )

    const post = useCallback(
        async <T>(url: Url, data?: Data, config?: Config) => {
            try {
                const res = (await axios.post(url, data, config)) as ReturnType<T>
                const _data = _catchNotify<T>(res)
                return _data
            } catch (error: any) {
                throw new Error(error)
            }
        },
        [_catchNotify, axios]
    )

    const get = useCallback(
        async <T>(url: Url, config?: Config) => {
            try {
                const res = (await axios.get(url, config)) as ReturnType<T>
                const _data = _catchNotify(res)
                return _data
            } catch (error: any) {
                throw new Error(error)
            }
        },
        [_catchNotify, axios]
    )

    const put = useCallback(
        async <T>(url: Url, data?: Data, config?: Config) => {
            try {
                const res = (await axios.put(url, data, config)) as ReturnType<T>
                const _data = _catchNotify(res)
                return _data
            } catch (error: any) {
                throw new Error(error)
            }
        },
        [_catchNotify, axios]
    )

    const _delete = useCallback(
        async <T>(url: Url, config: Config) => {
            try {
                const res = (await axios.delete(url, config)) as ReturnType<T>
                const _data = _catchNotify(res)
                return _data
            } catch (error: any) {
                throw new Error(error)
            }
        },
        [_catchNotify, axios]
    )

    return {
        post,
        get,
        put,
        delete: _delete,
    }
}

export default useAxios
