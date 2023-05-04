import axios from "axios"
import NProgress from "nprogress"

const instance = axios.create({
    baseURL: 'https://localhost:9876/api',
})
NProgress.configure({
    showSpinner: false,
    trickleSpeed: 100
})

export default instance;