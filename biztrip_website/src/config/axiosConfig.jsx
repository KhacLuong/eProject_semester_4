import axios from "axios"
import NProgress from "nprogress"
import {store} from '../redux/store'
import {fetchRefreshToken} from "../redux/slices/authSlice.jsx";

const instance = axios.create({
    baseURL: 'http://localhost:9090/api/v1/',
})
NProgress.configure({
    showSpinner: false,
    trickleSpeed: 100
})
// Add a request interceptor
instance.interceptors.request.use( (config) => {
    // Do something before request is sent
    const accessToken = store.getState().auth.account.accessToken
    const refreshToken = store.getState().auth.account.refreshToken
    config.headers["Authorization"] = `Bearer ${accessToken}`
    config.headers["refresh-token"] = `${refreshToken}`
    NProgress.start()
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});
// Add a response interceptor
instance.interceptors.response.use((response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    NProgress.done();
    return response && response.data ? response.data : response;
}, async function (error) {
    const refreshToken = store.getState().auth.account.refreshToken
    const originalRequest = error.config;
    // if (error.response.status === 401) {
    //     instance.defaults.headers.common["Authorization"] = `Bearer ${refreshToken}`
    //     // const res = await store.dispatch(fetchRefreshToken()).unwrap()
    //     if (res.code === 200) {
    //         instance.defaults.headers.common["Authorization"] = `Bearer ${res.data.access_token}`
    //     } else {
    //         window.location.href = '/admin/v1/sign-in'
    //     }
    //     return instance(originalRequest)
    // }

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    NProgress.done();
    return error && error.response && error.response.data ? error.response.data : Promise.reject(error);
});
export default instance;