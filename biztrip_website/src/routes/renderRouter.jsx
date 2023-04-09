import React, {Suspense} from 'react';
import {Route, Routes} from "react-router-dom";
import PrivateRoute from "./privateRoute.jsx";
import {adminRouters} from "./adminRouters.jsx";
import {customerRouters} from "./customerRouters.jsx";
import HomePage from "../pages/admin/HomePage.jsx";

const RenderRouter = () => {
    const RecursiveRouter = (routers) => {
        return (
            routers.map(({page, isIndex, path, isAuthentication}, index) => {
                return (
                    <Route key={index} index={isIndex} path={path} element={
                        isAuthentication ?
                            <PrivateRoute>
                                <Suspense fallback={<div>Loading...</div>}>
                                    {page}
                                </Suspense>
                            </PrivateRoute> :
                            <Suspense fallback={<div>Loading...</div>}>
                                {page}
                            </Suspense>}>
                    </Route>
                )
            })
        )
    }
    return (
        <Routes>
            <Route path={`/`}>
                {RecursiveRouter(customerRouters)}
            </Route>
            <Route path={`admin/v1`} element={<HomePage/>}>
                {RecursiveRouter(adminRouters)}
            </Route>
        </Routes>
    );


};

export default RenderRouter;