import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import instance from "../../config/axiosConfig.jsx";
import {initialState} from "../../utils/initial.jsx";

export const fetchAllTicket = createAsyncThunk('ticket/getAllTicket', async ({pageNumber = 1, perPage = 100, sortField = '', sortDir = '', keyword = ''}) => {
    try {
        return await instance.get(`tickets?pageNumber=${pageNumber}&perPage=${perPage}&sortField=${sortField}&sortDir=${sortDir}&keyword=${keyword}`)
    } catch (err) {
        console.error(err)
    }
})
export const fetchGetTicketById = createAsyncThunk('ticket/getTicketById', async ({id}) => {
    try {
        return await instance.get(`tickets/${id}`)
    } catch (err) {
        console.error(err);
    }
})
export const fetchRemoveTicket = createAsyncThunk('ticket/removeTicket', async ({id}) => {
    try {
        return await instance.delete(`tickets?id=${id}`)
    } catch (err) {
        console.error(err);
    }
})
export const fetchSaveTicket = createAsyncThunk('ticket/saveTicket', async ({data, navigate, toast}) => {
    try {
        const response = await instance.post(`tickets`, data)
        if (response.code === 201) {
            toast.success(response.message)
            await navigate("/admin/v1/cms/coaches/tickets")
        }
        return response
    } catch (err) {
        console.error(err)
    }
})
export const ticketSlice = createSlice({
    name: 'Ticket',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllTicket.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchAllTicket.fulfilled, (state, action) => {
                state.list = action.payload.data
                state.totalItems = action.payload.totalItems
                state.totalPages = action.payload.totalPages
                state.status = 'succeeded'
            })
            .addCase(fetchAllTicket.rejected, (state, action) => {
                state.status = 'failed'
            })
            .addCase(fetchRemoveTicket.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchRemoveTicket.fulfilled, (state, action) => {
                const {arg: data} = action.meta
                state.list = state.list.filter((item) => item.id !== data.id)
                state.status = 'succeeded'
            })
            .addCase(fetchRemoveTicket.rejected, (state, action) => {
                state.status = 'failed'
            })
            .addCase(fetchSaveTicket.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchSaveTicket.fulfilled, (state, action) => {
                state.status = 'succeeded'
            })
            .addCase(fetchSaveTicket.rejected, (state, action) => {
                state.status = 'failed'
            })
    }
})
export const selectTicket = state => state.ticket.list
export default ticketSlice.reducer