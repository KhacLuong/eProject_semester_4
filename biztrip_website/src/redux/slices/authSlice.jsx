import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import instance from "../../config/axiosConfig.jsx";

export const fetchLogin = createAsyncThunk('login', async ({data}) => {
    try {
        const response = await instance.post(`auth/authenticate`, data)
        return response.data
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
                state.status = 'loading'
            })
            .addCase(fetchLogin.fulfilled, (state, action) => {
                return {
                    ...state,
                    account: {
                        accessToken: action?.payload?.data?.access_token,
                        refreshToken: action?.payload?.data?.refresh_token,
                        email: action?.payload?.data?.email,
                    },
                    isAuthenticated: true,
                    status: 'succeeded'
                }
            })
            .addCase(fetchLogin.rejected, (state, action) => {
                state.status = 'failed'
            })
    }
})
export default authSlice.reducer