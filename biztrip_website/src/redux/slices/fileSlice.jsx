import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import instance from "../../config/axiosConfig.jsx";
import {initialState} from "../../utils/helper.jsx";

export const fetchCreateFile = createAsyncThunk(
    'file/createFile',
    async ({data, containerName}) => {
        try {
            const response = await instance.post(`file?containerName=${containerName}`, data)
            return response.data
        } catch (err) {
            console.error(err)
        }
    }
)
export const fileSlice = createSlice({
    name: 'File',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCreateFile.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.status = 'loading'
            })
            .addCase(fetchCreateFile.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.status = 'succeeded'
            })
            .addCase(fetchCreateFile.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.status = 'failed'
            })
    }
})
export default fileSlice.reducer