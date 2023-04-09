import React, {useEffect, useState} from 'react';

const Dashboard = () => {
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
        <div className={`flex relative`}>
            <div className="fixed left-4 top-4 dark:bg-black dark:text-white p-4 bg-red-600 text-black" onClick={handleThemeSwitch}>
                123
            </div>
        </div>
    );
};

export default Dashboard;