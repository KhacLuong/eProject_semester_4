import thunk from "redux-thunk";
import {composeWithDevTools} from "@redux-devtools/extension";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from "redux-persist/lib/storage" // defaults to localStorage for web
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import utilitySlice from "./slices/utilitySlice.jsx";
import ticketSlice from "./slices/ticketSlice.jsx";
import fileSlice from "./slices/fileSlice.jsx";
import coachSlice from "./slices/coachSlice.jsx";
import scheduleSlice from "./slices/scheduleSlice.jsx";
import staffSlice from "./slices/staffSlice.jsx";
import authSlice from "./slices/authSlice.jsx";

const authPersistConfig = {
    key: 'auth',
    version: 1,
    storage: storage,
    whitelist: ['account', 'isAuthenticated'],
};

const rootReducerWithPersistence = persistReducer(authPersistConfig, authSlice);
const middleware = [thunk];
export const store = configureStore({
    reducer: {
        coach: coachSlice,
        utility: utilitySlice,
        ticket: ticketSlice,
        file: fileSlice,
        schedule: scheduleSlice,
        staff: staffSlice,
        auth: rootReducerWithPersistence
    },
    middleware: [...getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }), ...middleware],
    devTools: process.env.NODE_ENV !== 'production',
})
export let persistor = persistStore(store);