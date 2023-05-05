import React from 'react';
import useDocumentTitle from "../../../hooks/useDocumentTitle.jsx";
import Table from "../../../components/admin/Table.jsx";
import Breadcrumb from "../../../components/admin/Breadcrumb.jsx";
import {BiPlus, TbFileExport} from "react-icons/all.js";

const UserList = () => {
    const theadData = [
        '#', 'Tên người dùng', 'Email', 'Điện thoại', 'Vai trò', 'Action'
    ]
    const tbodyData = [
        {
            items: ["Duc Anh", "test1@gmail.com", "091238723", "Admin"]
        },
        {
            items: ["Minh Hong", "test2@gmail.com", "087423232", "Admin"]
        },
        {
            items: ["Tuan Duc", "test3@gmail.com", "098200212", "Customer"]
        },
        {
            items: ["Quang Anh", "test4@gmail.com", "078273322", "Admin"]
        },
    ]
    const tbodyAction = ['edit', 'delete']
    const dataBreadcrumb = [
        {
            name: "Dashboard",
            path: "/admin/v1"
        },
        {
            name: "Người dùng",
            path: ""
        }
    ]
    useDocumentTitle("List user")
    return (
        <>
            <div
                className={`block justify-between items-center p-4 mx-4 mt-4 mb-6 bg-white rounded-2xl shadow-xl shadow-gray-200 lg:p-5 sm:flex`}>
                <div className={`mb-1 w-full`}>
                    <div className={`mb-4`}>
                        <Breadcrumb dataBreadcrumb={dataBreadcrumb}/>
                        <h1 className={`text-xl font-semibold text-gray-900 sm:text-2xl`}>Danh sách người dùng</h1>
                    </div>
                    <div className={`sm:flex`}>
                        <div className={`hidden items-center mb-3 sm:flex sm:divide-x sm:divide-gray-100 sm:mb-0`}>
                            <form className={`lg:pr-3`}>
                                <label htmlFor={`user-search`} className={`sr-only`}>Search</label>
                                <div className={`relative mt-1 lg:w-64 xl:w-96`}>
                                    <input type={`text`} id={`user-search`}
                                           className={`border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5`}
                                           placeholder={`Tìm kiếm người dùng`}/>
                                </div>
                            </form>
                        </div>
                        <div className={`flex items-center ml-auto space-x-2 sm:space-x-3`}>
                            <button type={`button`}
                                    className={`inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-primaryColor hover:bg-primaryColor_hover sm:ml-auto shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform`}>
                                <BiPlus className={`mr-2 -ml-1 w-6 h-6`}/>
                                Thêm mới
                            </button>
                            <button
                                className={`inline-flex justify-center items-center py-2 px-3 w-1/2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:scale-[1.02] transition-transform sm:w-auto`}>
                                <TbFileExport className={`mr-2 -ml-1 w-6 h-6`}/>
                                Export
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Table theadData={theadData} tbodyData={tbodyData} tbodyAction={tbodyAction}/>
        </>
    );
};

export default UserList;