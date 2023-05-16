import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import instance from "../../config/axiosConfig.jsx";
import {initialState} from "../../utils/helper.jsx";

export const fetchAllCoachUtility = createAsyncThunk(
    'utility/getAllCoachUtility',
    async ({pageNumber, perPage, sortField, sortDir, keyword}) => {
        const response = await instance.get(`coach-utilities?pageNumber=${pageNumber}&perPage=${perPage}&sortField=${sortField}&sortDir=${sortDir}&keyword=${keyword}`)
        return response.data
    }
)
export const fetchGetCoachUtilityById = createAsyncThunk(
    'utility/getCoachUtilityById',
    async ({id}) => {
        try {
            const response = await instance.get(`coach-utilities/${id}`)
            return response.data;
        } catch (err) {
            console.error(err);
        }
    }
)
export const fetchRemoveCoachUtility = createAsyncThunk(
    "utility/removeCoachUtility",
    async ({id}) => {
        try {
            const response = await instance.delete(`coach-utilities?id=${id}`)
            return response.data;
        } catch (err) {
            console.error(err);
        }
    }
);
export const fetchSaveCoachUtility = createAsyncThunk(
    "utility/saveCoachUtility",
    async ({dataUtility, navigate, toast}) => {
        try {
            const response = await instance.post(`coach-utilities`, dataUtility)
            if (response.data.code === 200) {
                toast.success(response.data.message)
                await navigate("/admin/v1/coaches/utilities")
            }
            return response.data
        } catch (err) {
            console.error(err)
        }
    }
)

export const coachUtilitySlice = createSlice({
    name: 'CoachUtilities',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            .addCase(fetchAllCoachUtility.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchAllCoachUtility.fulfilled, (state, action) => {
                state.list = action.payload.data
                state.totalItems = action.payload.totalItems
                state.totalPages = action.payload.totalPages
                state.status = 'succeeded'
            })
            .addCase(fetchAllCoachUtility.rejected, (state, action) => {
                state.status = 'failed'
            })
            .addCase(fetchGetCoachUtilityById.pending,(state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchGetCoachUtilityById.fulfilled, (state, action) => {
                state.status = 'succeeded'
            })
            .addCase(fetchGetCoachUtilityById.rejected, (state, action) => {
                state.status = 'failed'
            })
            .addCase(fetchRemoveCoachUtility.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchRemoveCoachUtility.fulfilled, (state, action) => {
                const {arg: data} = action.meta
                state.list = state.list.filter((item) => item.id !== data.id)
                state.status = 'succeeded'
            })
            .addCase(fetchRemoveCoachUtility.rejected, (state, action) => {
                state.status = 'failed'
            })
            .addCase(fetchSaveCoachUtility.pending,(state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchSaveCoachUtility.fulfilled, (state, action) => {
                state.status = 'succeeded'
            })
            .addCase(fetchSaveCoachUtility.rejected, (state, action) => {
                state.status = 'failed'
            })
    },
})
export const selectCoachUtility = state => state.coachUtility.list;
export default coachUtilitySlice.reducer