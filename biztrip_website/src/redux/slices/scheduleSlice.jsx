import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import instance from "../../config/axiosConfig.jsx";
import {initialState} from "../../utils/initial.jsx";

export const fetchAllLocation = createAsyncThunk('location/getAllLocation', async () => {
    try {
        return await instance.get(`schedules/get-all-location`)
    } catch (err) {
        console.error(err)
    }
})

export const fetchAllSchedule = createAsyncThunk('schedule/getAllSchedule', async ({pageNumber = 1, perPage = 100, sortField = '', sortDir = '', keyword = ''}) => {
    try {
        return await instance.get(`schedules?pageNumber=${pageNumber}&perPage=${perPage}&sortField=${sortField}&sortDir=${sortDir}&keyword=${keyword}`)
    } catch (err) {
        console.error(err)
    }
})

export const fetchGetScheduleById = createAsyncThunk('schedule/getScheduleById', async ({id}) => {
    try {
        return await instance.get(`schedules/${id}`)
    } catch (err) {
        console.error(err)
    }
})
export const fetchRemoveSchedule = createAsyncThunk('schedule/removeSchedule', async ({id}) => {
    try {
        return await instance.delete(`schedules?id=${id}`)
    } catch (err) {
        console.error(err)
    }
})
export const fetchSaveSchedule  = createAsyncThunk('schedule/saveSchedule', async ({data, navigate, toast}) => {
    try {
        const response = await instance.post(`schedules`, data)
        if (response.code === 201) {
            toast.success(response.message)
            await navigate("/admin/v1/cms/coaches/schedules")
        }
        return response
    } catch (err) {
        console.error(err)
    }
})
export const scheduleSlice = createSlice({
    name: 'Schedule',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllSchedule.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchAllSchedule.fulfilled, (state, action) => {
                state.list = action.payload.data
                state.totalItems = action.payload.totalItems
                state.totalPages = action.payload.totalPages
                state.status = 'succeeded'
            })
            .addCase(fetchAllSchedule.rejected, (state, action) => {
                state.status = 'failed'
            })
            .addCase(fetchRemoveSchedule.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchRemoveSchedule.fulfilled, (state, action) => {
                const {arg: data} = action.meta
                state.list = state.list.filter((item) => item.id !== data.id)
                state.status = 'succeeded'
            })
            .addCase(fetchRemoveSchedule.rejected, (state, action) => {
                state.status = 'failed'
            })
            .addCase(fetchSaveSchedule.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchSaveSchedule.fulfilled, (state, action) => {
                state.status = 'succeeded'
            })
            .addCase(fetchSaveSchedule.rejected, (state, action) => {
                state.status = 'failed'
            })
    }
})

export const selectSchedule = state => state.schedule.list
export default scheduleSlice.reducer