import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {PersistGate} from "redux-persist/integration/react";
import {store} from "./redux/store.jsx";
import {Provider} from 'react-redux'
import ToastifyComponent from "./components/toastifyComponent.jsx";

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Provider store={store}>
        <App/>
        <ToastifyComponent/>
    </Provider>
)
