import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import instance from "../../config/axiosConfig.jsx";

export const fetchLogin = createAsyncThunk('auth/login', async ({data}) => {
    try {
        return await instance.post(`auth/authenticate`, data)
    } catch (err) {
        console.error(err)
    }
})
export const fetchLogout = createAsyncThunk('auth/logout', async () => {
    try {
        return await instance.get(`auth/logout`)
    } catch (err) {
        console.error(err)
    }
})

export const fetchAdminRegister = createAsyncThunk('auth/adminRegister', async ({data}) => {
    try {

    } catch (err) {
        console.error(err)
    }
})
export const fetchCustomerRegister = createAsyncThunk('auth/customerRegister', async ({data}) => {
    try {

    } catch (err) {
        console.error(err)
    }
})
export const fetchRefreshToken = createAsyncThunk('auth/refreshToken', async () => {
    try {
        return await instance.post(`auth/refresh-token`)
    } catch (err) {
        console.error(err)
    }
})
const initialState = {
    account: {
        accessToken: '',
        refreshToken: '',
        email: '',
    },
    isAuthenticated: false,
    status: 'idle',
}
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLogin.pending, (state, action) => {
                return {
                    ...state,
                    isAuthenticated: false,
                    status: 'loading'
                }
            })
            .addCase(fetchLogin.fulfilled, (state, action) => {
                return {
                    ...state,
                    account: {
                        accessToken: action?.payload?.data?.access_token,
                        refreshToken: action?.payload?.data?.refresh_token,
                        email: action?.payload?.data?.email,
                    },
                    isAuthenticated: action?.payload?.code === 200,
                    status: action?.payload?.code === 200 ? 'succeeded' : 'failed'
                }
            })
            .addCase(fetchLogin.rejected, (state, action) => {
                return {
                    ...state,
                    isAuthenticated: false,
                    status: 'failed'
                }
            })
            .addCase(fetchRefreshToken.pending, (state, action) => {
                return {
                    ...state,
                    isAuthenticated: false,
                    status: 'loading'
                }
            })
            .addCase(fetchRefreshToken.fulfilled, (state, action) => {
                return {
                    ...state,
                    account: {
                        ...state.account,
                        accessToken: action?.payload?.data?.access_token,
                        refreshToken: action?.payload?.data?.refresh_token,
                    },
                    isAuthenticated: action?.payload?.code === 200,
                    status: action?.payload?.code === 200 ? 'succeeded' : 'failed'
                }
            })
            .addCase(fetchRefreshToken.rejected, (state, action) => {
                return {
                    ...state,
                    isAuthenticated: false,
                    status: 'failed'
                }
            })
            .addCase(fetchLogout.pending, (state, action) => {
                return {
                    ...state,
                    status: 'loading'
                }
            })
            .addCase(fetchLogout.fulfilled, (state, action) => {
                return {
                    ...state,
                    account: {
                        accessToken: '',
                        refreshToken: '',
                        email: '',
                    },
                    isAuthenticated: false,
                    status: 'succeeded',
                }
            })
            .addCase(fetchLogout.rejected, (state, action) => {
                return {
                    ...state,
                    status: 'failed'
                }
            })
    }
})
export default authSlice.reducer