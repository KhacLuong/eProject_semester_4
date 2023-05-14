import axios from "axios"
import NProgress from "nprogress"

const instance = axios.create({
    baseURL: 'http://localhost:9090/api/v1/',
})
NProgress.configure({
    showSpinner: false,
    trickleSpeed: 100
})

export default instance;