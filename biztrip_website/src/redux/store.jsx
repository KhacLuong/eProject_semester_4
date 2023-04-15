import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "@redux-devtools/extension";
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage" // defaults to localStorage for web
import {configureStore} from "@reduxjs/toolkit";
import counterSlice from "./slices/counterSlice.jsx";

const persistConfig = {
    key: 'root',
    storage,
}
export const store = configureStore({
    reducer: {
        counter: counterSlice
    }
})