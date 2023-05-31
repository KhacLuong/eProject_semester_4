import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import instance from "../../config/axiosConfig.jsx";
import {initialState} from "../../utils/initial.jsx";

export const fetchAllUtility = createAsyncThunk(
    'utility/getAllUtility',
    async ({pageNumber, perPage, sortField, sortDir, keyword}) => {
        try {
            const response = await instance.get(`utilities?pageNumber=${pageNumber}&perPage=${perPage}&sortField=${sortField}&sortDir=${sortDir}&keyword=${keyword}`)
            return response.data
        } catch (err) {
            console.error(err);
        }
    }
)
export const fetchGetUtilityById = createAsyncThunk(
    'utility/getUtilityById',
    async ({id}) => {
        try {
            const response = await instance.get(`utilities/${id}`)
            return response.data;
        } catch (err) {
            console.error(err);
        }
    }
)
export const fetchRemoveUtility = createAsyncThunk(
    "utility/removeUtility",
    async ({id}) => {
        try {
            const response = await instance.delete(`utilities?id=${id}`)
            return response.data;
        } catch (err) {
            console.error(err);
        }
    }
);
export const fetchSaveUtility = createAsyncThunk(
    "utility/saveUtility",
    async ({dataUtility, navigate, toast}) => {
        try {
            const response = await instance.post(`utilities`, dataUtility)
            if (response.data.code === 201) {
                toast.success(response.data.message)
                await navigate("/admin/v1/cms/coaches/utilities")
            }
            return response.data
        } catch (err) {
            console.error(err)
        }
    }
)

export const utilitySlice = createSlice({
    name: 'Utilities',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            .addCase(fetchAllUtility.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchAllUtility.fulfilled, (state, action) => {
                state.list = action.payload.data
                state.totalItems = action.payload.totalItems
                state.totalPages = action.payload.totalPages
                state.status = 'succeeded'
            })
            .addCase(fetchAllUtility.rejected, (state, action) => {
                state.status = 'failed'
            })
            .addCase(fetchRemoveUtility.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchRemoveUtility.fulfilled, (state, action) => {
                const {arg: data} = action.meta
                state.list = state.list.filter((item) => item.id !== data.id)
                state.status = 'succeeded'
            })
            .addCase(fetchRemoveUtility.rejected, (state, action) => {
                state.status = 'failed'
            })
            .addCase(fetchSaveUtility.pending,(state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchSaveUtility.fulfilled, (state, action) => {
                state.status = 'succeeded'
            })
            .addCase(fetchSaveUtility.rejected, (state, action) => {
                state.status = 'failed'
            })
    },
})
export const selectUtility = state => state.utility.list;
export default utilitySlice.reducer