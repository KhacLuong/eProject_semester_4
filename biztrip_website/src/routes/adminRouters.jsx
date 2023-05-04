import {lazy} from "react";

const ErrorPage = lazy(() => import("../pages/404.jsx"))
const DashBoardPage = lazy(() => import("../pages/admin/Dashboard.jsx"))
const UserListPage = lazy(() => import("../pages/admin/users/UserList.jsx"))
const UserCreatePage = lazy(() => import("../pages/admin/users/UserCreate.jsx"))
const UserEditPage = lazy(() => import("../pages/admin/users/UserEdit.jsx"))
const CoachCarListPage = lazy(() => import("../pages/admin/coach_car/CoachCarList.jsx"))

export const adminRouters = [
    {
        path: "*",
        page: <ErrorPage/>,
        isIndex: false,
        isAuthentication: true,
    },
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
        page: <UserListPage/>,
        isIndex: false,
        isAuthentication: true,
    },
    {
        path: "users/create",
        page: <UserCreatePage/>,
        isIndex: false,
        isAuthentication: true,
    },
    {
        path: "users/edit/:id",
        page: <UserEditPage/>,
        isIndex: false,
        isAuthentication: true,
    },
    {
        path: ":slug/:id/danh-sach-xe",
        page: <CoachCarListPage/>,
        isIndex: false,
        isAuthentication: true,
    },
]