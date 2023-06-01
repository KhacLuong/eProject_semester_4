import axios from "axios"
import NProgress from "nprogress"
import {store} from '../redux/store'

const instance = axios.create({
    baseURL: 'http://localhost:9090/api/v1/',
})
NProgress.configure({
    showSpinner: false,
    trickleSpeed: 100
})
// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    const accessToken = store.getState()
    console.log(accessToken)
    config.headers["Authorization"] = `Bearer ${accessToken}`
    NProgress.start()
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});
// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    NProgress.done();
    return response && response.data ? response.data : response;
}, async function (error) {
    const email = store.getState().auth.account.email
    const refreshToken = store.getState().auth.account.refreshToken
    const originalRequest = error.config;
    // if (error.response.status === 401) {
    //     const res = await postRefreshToken(email, refreshToken);
    //     if (res && res.status === true) {
    //         store.dispatch(doRefreshToken(res.data))
    //         instance.defaults.headers.common["Authorization"] = `Bearer ${res.data.accessToken}`
    //     } else {
    //         window.location.href = '/login'
    //     }
    //     return instance(originalRequest)
    // }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    NProgress.done();
    return error && error.response && error.response.data ? error.response.data : Promise.reject(error);
});
export default instance;