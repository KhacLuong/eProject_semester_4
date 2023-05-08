import React, {Suspense} from 'react';
import {Route, Routes} from "react-router-dom";
import PrivateRoute from "./privateRoute.jsx";
import {dataRouters} from "./dataRouters.jsx";

const RenderRouter = () => {
    const RecursiveRouter = (routers) => {
        return (
            routers.map(({page: Page, isIndex, path, isAuthentication, children}, index) => {
                return (
                    <Route key={index} index={isIndex} path={path} element={
                        isAuthentication ?
                            <PrivateRoute>
                                <Suspense fallback={<div>Loading...</div>}>
                                    <Page/>
                                </Suspense>
                            </PrivateRoute> :
                            <Suspense fallback={<div>Loading...</div>}>
                                <Page/>
                            </Suspense>}>
                        {(children && children.length > 0) && RecursiveRouter(children)}
                    </Route>
                )
            })
        )
    }
    return (
        <Routes>
            <Route path={`/`}>
                {RecursiveRouter(dataRouters)}
            </Route>
        </Routes>
    );
};

export default RenderRouter;