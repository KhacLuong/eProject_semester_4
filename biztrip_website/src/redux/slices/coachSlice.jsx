import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import instance from "../../config/axiosConfig.jsx";
import {initialState} from "../../utils/helper.jsx";

export const fetchAllCoach = createAsyncThunk('coach/getAllCoach', async ({pageNumber, perPage, sortField, sortDir, keyword}) => {
    const response = await instance.get(`coaches?pageNumber=${pageNumber}&perPage=${perPage}&sortField=${sortField}&sortDir=${sortDir}&keyword=${keyword}`)
    return response.data
})

export const fetchGetCoachById = createAsyncThunk('coach/getCoachById', async ({id}) => {
    try {
        const response = await instance.get(`coaches/${id}`)
        return response.data;
    } catch (err) {
        console.error(err);
    }
})

export const fetchRemoveCoach = createAsyncThunk('coach/removeCoach', async ({id}) => {
    try {
        const response = await instance.delete(`coaches?id=${id}`)
        return response.data;
    } catch (err) {
        console.error(err);
    }
})
export const fetchSaveCoach = createAsyncThunk(
    'coach/saveCoach', async ({data, navigate, toast}) => {
        try {
            const response = await instance.post(`coaches`, data)
            return response.data
        } catch (err) {
            console.error(err)
        }
    }
)
export const fetchGetAllUtility = createAsyncThunk('coach/getUtility', async () => {
    try {
        const response = await instance.get(`coaches/get-all-utility`)
        return response.data
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