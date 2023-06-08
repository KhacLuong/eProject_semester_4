import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import instance from "../../config/axiosConfig.jsx";
import {initialState} from "../../utils/initial.jsx";

export const fetchAllUser = createAsyncThunk('user/getAllUSer', async ({
                                                                           pageNumber = 1,
                                                                           perPage = 100,
                                                                           sortField = '',
                                                                           sortDir = '',
                                                                           keyword = ''
                                                                       }) => {
    try {
        return await instance.get(`users?pageNumber=${pageNumber}&perPage=${perPage}&sortField=${sortField}&sortDir=${sortDir}&keyword=${keyword}`)
    } catch (err) {
        console.error(err)
    }
})
export const fetchGetUserById = createAsyncThunk('user/getUserById', async ({id}) => {
    try {
        return await instance.get(`users/${id}`)
    } catch (err) {
        console.error(err)
    }
})

export const fetchRemoveUser = createAsyncThunk('user/removeUser', async ({id}) => {
    try {
        return await instance.delete(`users?id=${id}`)
    } catch (err) {
        console.error(err)
    }
})

export const fetchSaveUser = createAsyncThunk('user/saveUser', async ({data, navigate, toast}) => {
    try {
        const response = await instance.post(`users`, data)
        if (response.code === 201) {
            toast.success(response.message)
            await navigate("/admin/v1/cms/coaches/users")
        }
    } catch (err) {
        console.error(err)
    }
})

export const userSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllUser.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchAllUser.fulfilled, (state, action) => {
                state.list = action.payload.data
                state.totalItems = action.payload.totalItems
                state.totalPages = action.payload.totalPages
                state.status = 'succeeded'
            })
            .addCase(fetchAllUser.rejected, (state, action) => {
                state.status = 'failed'
            })
            .addCase(fetchSaveUser.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchSaveUser.fulfilled, (state, action) => {
                state.status = 'succeeded'
            })
            .addCase(fetchSaveUser.rejected, (state, action) => {
                state.status = 'failed'
            })
            .addCase(fetchRemoveUser.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchRemoveUser.fulfilled, (state, action) => {
                const {arg: data} = action.meta
                state.list = state.list.filter((item) => item.id !== data.id)
                state.status = 'succeeded'
            })
            .addCase(fetchRemoveUser.rejected, (state, action) => {
                state.status = 'failed'
            })
    }
})

export const selectUser = state => state.user.list

export default userSlice.reducer