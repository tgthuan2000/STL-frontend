import { AxiosRequestConfig } from 'axios'
import { get as lodashGet } from 'lodash'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import axios from '~/axiosConfig'
import { CODE } from '~/constant/code'
import { useAccessToken, useLoading } from '~/context'
import LANGUAGE from '~/i18n/language/key'
import { useAxiosService } from '~/services/axios'

type ReturnType<T> = { code?: CODE; data?: T }
type Url = string
type Data = any
type Config = AxiosRequestConfig<any> | undefined

const useAxios = () => {
    const { notify } = useAxiosService()
    const { getAccessToken } = useAccessToken()
    const { setConfigLoading } = useLoading()
    const { t } = useTranslation()

    const getError = async (error: any) => {
        const code = lodashGet(error, 'response.data.code')

        switch (code) {
            case CODE.ACCESS_TOKEN_EXPIRED: {
                try {
                    setConfigLoading(true)
                    axios.defaults.headers.common['Authorization'] = null
                    const accessToken = await getAccessToken()
                    if (accessToken) {
                        toast.warn<string>(t(LANGUAGE.NOTIFY_RE_GET_ACCESS_TOKEN))
                        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
                    }
                } catch (error) {
                } finally {
                    setConfigLoading(false)
                }
            }
            case CODE.FORBIDDEN: {
            }
        }

        return code
    }

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
                throw new Error(await getError(error))
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
                throw new Error(await getError(error))
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
                throw new Error(await getError(error))
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
                throw new Error(await getError(error))
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
