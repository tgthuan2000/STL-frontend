import _axios from 'axios'
import { handleDataStatus } from './services/axios'

const axios = _axios.create({
    baseURL: `${import.meta.env.VITE_SERVER}/api`,
    headers: {
        'Content-Type': 'application/json',
    },
})

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

axios.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

axios.interceptors.response.use(
    (response) => {
        const isSuccess = handleDataStatus(response.data.code)

        if (typeof isSuccess === 'boolean' && isSuccess === true) {
            return response.data
        }
        return Promise.reject(response.data.code)
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default axios
