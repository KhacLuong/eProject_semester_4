import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import instance from "../../config/axiosConfig.jsx";

export const initialState = {
    list: [],
    isLoading: false,
    isError: false,
    isCreating: false,
}

export const fetchAllCoachUtility = createAsyncThunk(
    'utility/getCoachUtility',
    async () => {
        try {
            const response = await instance.get("http://localhost:9090/api/v1/coach-utilities")
            return response.data
        } catch (error) {
            console.error(error);
        }
    }
)

export const fetchRemoveCoachUtility = createAsyncThunk(
    "utility/removeCoachUtility",
    async ({id}) => {
        try {
            const response = await instance.delete(`http://localhost:9090/api/v1/coach-utilities?id=${id}`);
            return response.data;
        } catch (err) {
            console.error(err);
        }
    }
);
export const coachUtilitySlice = createSlice({
    name: 'CoachUtility',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            .addCase(fetchAllCoachUtility.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(fetchAllCoachUtility.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.list = action.payload.data
            })
            .addCase(fetchAllCoachUtility.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
            })
            .addCase(fetchRemoveCoachUtility.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(fetchRemoveCoachUtility.fulfilled, (state, action) => {
                const {arg: id} = action.meta
                state.list = state.list.filter((item) => {
                    return item.id !== id
                })
                state.isLoading = false
                state.isError = false
            })
            .addCase(fetchRemoveCoachUtility.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
            })
    },
})
export const selectCoachUtility = state => state.coachUtility.list;
export const isLoading = (state) => state.coachUtility.isLoading
export const isError = (state) => state.coachUtility.isError
export default coachUtilitySlice.reducer