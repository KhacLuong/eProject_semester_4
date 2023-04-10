import React from 'react';
import useDocumentTitle from "../../../hooks/useDocumentTitle.jsx";

const UserList = () => {
    useDocumentTitle("List user")
    return (
        <div>
            This is user list page
        </div>
    );
};

export default UserList;