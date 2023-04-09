import {lazy} from "react";

const HomePage = lazy(() => import("../pages/admin/HomePage.jsx"))
const DashBoardPage = lazy(() => import("../pages/admin/Dashboard.jsx"))

export const adminRouters = [
    {
        path: "login",
        page: "",
        isIndex: false,
        isAuthentication: true,
    },
    {
        path: "",
        page: <DashBoardPage/>,
        isIndex: true,
        isAuthentication: true,
    },
    {
        path: "dashboard",
        page: <DashBoardPage/>,
        isIndex: true,
        isAuthentication: true,
    },
    {
        path: "users",
        page: "",
        isIndex: false,
        isAuthentication: true,
    },
    {
        path: "users/create",
        page: "",
        isIndex: false,
        isAuthentication: true,
    },
    {
        path: "users/detail/:id",
        page: "",
        isIndex: false,
        isAuthentication: true,
    },
    {
        path: "users/edit/:id",
        page: "",
        isIndex: false,
        isAuthentication: true,
    },
    {
        path: "users/update/:id",
        page: "",
        isIndex: false,
        isAuthentication: true,
    },
    {
        path: "*",
        page: "",
        isIndex: false,
        isAuthentication: true,
    },
]