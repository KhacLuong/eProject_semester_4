import './App.css'
import {BrowserRouter} from "react-router-dom";
import RenderRouter from "./routes/renderRouter.jsx";
import ToastifyComponent from "./components/toastifyComponent.jsx";

const App = () => {
    return (
        <BrowserRouter>
            <RenderRouter/>
        </BrowserRouter>
    )
}

export default App
