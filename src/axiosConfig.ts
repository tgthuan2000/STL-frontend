import _axios from 'axios'

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
        return response
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default axios
