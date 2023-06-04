import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import instance from "../../config/axiosConfig.jsx";
import {initialState} from "../../utils/initial.jsx";

export const fetchAllCoach = createAsyncThunk('coach/getAllCoach', async ({pageNumber, perPage, sortField, sortDir, keyword}) => {
    try {
        return await instance.get(`coaches?pageNumber=${pageNumber}&perPage=${perPage}&sortField=${sortField}&sortDir=${sortDir}&keyword=${keyword}`)
    } catch (err) {
        console.error(err)
    }
})

export const fetchGetCoachById = createAsyncThunk('coach/getCoachById', async ({id}) => {
    try {
        return await instance.get(`coaches/${id}`)
    } catch (err) {
        console.error(err);
    }
})

export const fetchRemoveCoach = createAsyncThunk('coach/removeCoach', async ({id}) => {
    try {
        return await instance.delete(`coaches?id=${id}`)
    } catch (err) {
        console.error(err);
    }
})
export const fetchSaveCoach = createAsyncThunk(
    'coach/saveCoach', async ({data, navigate, toast}) => {
        try {
            return instance.post(`coaches`, data)
        } catch (err) {
            console.error(err)
        }
    }
)
export const fetchAllUtility = createAsyncThunk('coach/getUtility', async () => {
    try {
        return await instance.get(`coaches/get-all-utility`)
    } catch (err) {
        console.error(err)
    }
})
export const coachSlice = createSlice({
    name: 'Coaches',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllCoach.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchAllCoach.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.list = action.payload.data
                state.totalItems = action.payload.totalItems
                state.totalPages = action.payload.totalPages
            })
            .addCase(fetchAllCoach.rejected, (state, action) => {
                state.status = 'failed'
            })
            .addCase(fetchRemoveCoach.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchRemoveCoach.fulfilled, (state, action) => {
                const {arg: data} = action.meta
                state.list = state.list.filter((item) => item.id !== data.id)
                state.status = 'succeeded'
            })
            .addCase(fetchRemoveCoach.rejected, (state, action) => {
                state.status = 'failed'
            })
            .addCase(fetchSaveCoach.pending,(state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchSaveCoach.fulfilled, (state, action) => {
                state.status = 'succeeded'
            })
            .addCase(fetchSaveCoach.rejected, (state, action) => {
                state.status = 'failed'
            })
    }
})
export const selectCoach = state => state.coach.list;
export default coachSlice.reducer