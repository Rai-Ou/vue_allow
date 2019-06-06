import axios from 'axios'

const http = axios.create({
    baseURL: '/api/',
    withCredentials: true
})

//请求拦截
http.interceptors.request.use(
    config => {
        config.headers['Authorization'] = 'back'
        config.headers['memberId'] = 1
        config.headers['x-auth-token'] = sessionStorage.getItem('xAuthToken')
        return config
    },
    error => {
        return Promise.reject(error)
    }
)
//影响拦截
http.interceptors.response.use(
    response => {
        if ('x-auth-token' in response.headers) {
            sessionStorage.setItem('xAuthToken', response.headers['x-auth-token'])
        }
        if (response.data.code == 404) {
            sessionStorage.clear()
            window.location.href = process.env.VUE_APP_HTTP_LOGIN
        } else {
            return response.data
        }
        // return response.data
    },
    error => {
        return Promise.reject(error)
    }
)

export default http
