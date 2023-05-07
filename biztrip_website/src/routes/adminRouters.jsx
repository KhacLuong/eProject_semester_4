import {lazy} from "react";

const ErrorPage = lazy(() => import("../pages/404.jsx"))
const DashBoardPage = lazy(() => import("../pages/admin/Dashboard.jsx"))
const UserListPage = lazy(() => import("../pages/admin/users/UserList.jsx"))
const UserFormPage = lazy(() => import("../pages/admin/users/UserForm.jsx"))
const CoachCarListPage = lazy(() => import("../pages/admin/coaches/CoachList.jsx"))
const SignInPage = lazy(() => import("../pages/admin/auth/SignIn.jsx"))
const HomePage = lazy(() => import("../pages/admin/HomePage.jsx"))
const SettingListPage = lazy(() => import("../pages/admin/settings/SettingList.jsx"))
const SettingFormPage = lazy(() => import("../pages/admin/settings/SettingForm.jsx"))
const ManagementCoachListPage = lazy(() => import("../pages/admin/management_coaches/ManagementCoachList.jsx"))
const CoachListPage = lazy(() => import("../pages/admin/coaches/CoachList.jsx"))
export const adminRouters = [
    {
        path: "*",
        page: ErrorPage,
        isIndex: false,
        isAuthentication: false,
    },
    {
        path: "sign-in",
        page: SignInPage,
        isIndex: false,
        isAuthentication: false,
    },
    {
        path: "",
        page: HomePage,
        isIndex: false,
        isAuthentication: true,
        children: [
            {
                path: "",
                page: DashBoardPage,
                isIndex: true,
                isAuthentication: true,
            },
            {
                path: "dashboard",
                page: DashBoardPage,
                isIndex: true,
                isAuthentication: true,
            },
            {
                path: "users",
                page: UserListPage,
                isIndex: false,
                isAuthentication: true,
            },
            {
                path: "users/create",
                page: UserFormPage,
                isIndex: false,
                isAuthentication: true,
            },
            {
                path: "users/edit",
                page: UserFormPage,
                isIndex: false,
                isAuthentication: true,
            },
            {
                path: ":slug/:id/danh-sach-xe",
                page: CoachCarListPage,
                isIndex: false,
                isAuthentication: true,
            },
            {
                path: "display-settings",
                page: SettingListPage,
                isIndex: false,
                isAuthentication: true
            },
            {
                path: "display-settings/create",
                page: SettingFormPage,
                isIndex: false,
                isAuthentication: true
            },
            {
                path: "display-settings/edit",
                page: SettingFormPage,
                isIndex: false,
                isAuthentication: true
            },
            {
                path: "management-coaches",
                page: ManagementCoachListPage,
                isIndex: false,
                isAuthentication: true
            },
            {
                path: "coaches",
                page: CoachListPage,
                isIndex: false,
                isAuthentication: true
            }
        ]
    },
]