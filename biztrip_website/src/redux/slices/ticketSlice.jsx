import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import instance from "../../config/axiosConfig.jsx";
import {initialState} from "../../utils/helper.jsx";

export const ticketSlice = createSlice({
    name: 'Ticket',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

    }
})
export default ticketSlice.reducer