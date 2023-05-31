import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "@redux-devtools/extension";
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage" // defaults to localStorage for web
import {configureStore} from "@reduxjs/toolkit";
import utilitySlice from "./slices/utilitySlice.jsx";
import ticketSlice from "./slices/ticketSlice.jsx";
import fileSlice from "./slices/fileSlice.jsx";
import coachSlice from "./slices/coachSlice.jsx";
import scheduleSlice from "./slices/scheduleSlice.jsx";

const persistConfig = {
    key: 'root',
    storage,
}
export const store = configureStore({
    reducer: {
        coach: coachSlice,
        utility: utilitySlice,
        ticket: ticketSlice,
        file: fileSlice,
        schedule: scheduleSlice
    }
})
