import {lazy} from "react";

export const customerRouters = [
    {
        path: "",
        page: "",
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
        path: "dashboard",
        page: "",
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