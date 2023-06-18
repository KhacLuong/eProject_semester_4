import React from 'react';
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";

const PrivateRoute = (props) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    // const isAuthenticated = true;
    return (
        isAuthenticated
            ? props.children
            : <Navigate to={window.location.pathname.includes("admin") ? '/admin/v1/cms/sign-in' : '/v1/sign-in'}></Navigate>
    );
};

export default PrivateRoute;