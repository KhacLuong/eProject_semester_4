import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import instance from "../../config/axiosConfig.jsx";
import {initialState} from "../../utils/initial.jsx";

export const fetchAllStaff = createAsyncThunk('staff/getAllStaff', async ({pageNumber = 1, perPage = 100, sortField = '', sortDir = '', keyword = ''}) => {
    try {
        const response = await instance.get(`staffs?pageNumber=${pageNumber}&perPage=${perPage}&sortField=${sortField}&sortDir=${sortDir}&keyword=${keyword}`)
        return response.data
    } catch (err) {
        console.error(err)
    }
})

export const fetchGetStaffById = createAsyncThunk('staff/getStaffById', async ({id}) => {
    try {
        const response = await instance.get(`staffs/${id}`)
        return response.data
    } catch (err) {
        console.error(err)
    }
})

export const fetchRemoveStaff = createAsyncThunk('staff/removeStaff', async ({id}) => {
    try {
        const response = await instance.delete(`staffs?id=${id}`)
        return response.data
    } catch (err) {
        console.error(err)
    }
})

export const fetchSaveStaff = createAsyncThunk('staff/saveStaff', async ({data, navigate, toast}) => {
    try {
        const response = await instance.post(`staffs`, data)
        if (response.data.code === 201) {
            toast.success(response.data.message)
            await navigate("/admin/v1/cms/users/staffs")
        }
    } catch (err) {
        console.error(err)
    }
})

export const staffSlice = createSlice({
    name: 'Staff',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllStaff.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchAllStaff.fulfilled, (state, action) => {
                state.list = action.payload.data
                state.totalItems = action.payload.totalItems
                state.totalPages = action.payload.totalPages
                state.status = 'succeeded'
            })
            .addCase(fetchAllStaff.rejected, (state, action) => {
                state.status = 'failed'
            })
            .addCase(fetchRemoveStaff.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchRemoveStaff.fulfilled, (state, action) => {
                const {arg: data} = action.meta
                state.list = state.list.filter((item) => item.id !== data.id)
                state.status = 'succeeded'
            })
            .addCase(fetchRemoveStaff.rejected, (state, action) => {
                state.status = 'failed'
            })
            .addCase(fetchSaveStaff.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchSaveStaff.fulfilled, (state, action) => {
                state.status = 'succeeded'
            })
            .addCase(fetchSaveStaff.rejected, (state, action) => {
                state.status = 'failed'
            })
    }
})
export const selectStaff = state => state.staff.list
export default staffSlice.reducer