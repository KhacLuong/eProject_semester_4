import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import instance from "../../config/axiosConfig.jsx";

export const initialState = {
    listCoachUtility: [],
    isLoading: false,
    isError: false,
    isCreating: false
}

export const fetchAllCoachUtility = createAsyncThunk(
    'posts/fetchCoachUtility',
    async () => {
        const response = await instance.get("http://localhost:9090/api/v1/coach-utilities")
        return response.data
    }
)
export const coachUtilitySlice = createSlice({
    name: 'listCoachUtility',
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
                state.listCoachUtility = action.payload
                state.isLoading = false
                state.isError = false
            })
            .addCase(fetchAllCoachUtility.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
            })
    },
})

export default coachUtilitySlice.reducer