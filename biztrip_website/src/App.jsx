import './App.css'
import {BrowserRouter} from "react-router-dom";
import RenderRouter from "./routes/renderRouter.jsx";
import {useEffect, useState} from "react";

const App = () => {
    const [theme, setTheme] = useState("light")

    // check chế độ theme ở browser
    useEffect(() => {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark')
        } else {
            setTheme('light')
        }
    }, [])

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }, [theme])

    const handleThemeSwitch = () => {
        setTheme(theme === "dark" ? "light" : "dark")
    }
    return (
        <BrowserRouter>
            <RenderRouter/>
        </BrowserRouter>
    )
}

export default App
