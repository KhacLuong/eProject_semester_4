import React, {useState} from 'react';
import useDocumentTitle from "../../../hooks/useDocumentTitle.jsx";
import Table from "../../../components/admin/Table.jsx";
import Paginate from "../../../components/admin/Paginate.jsx";
import Banner from "../../../components/admin/Banner.jsx";
import {deleteUser, getListUser} from "../../../middleware/services/apiService.jsx";

const UserList = () => {
    useDocumentTitle("Quản lý người dùng", true)
    const [turnOffPrevNextBtn, setTurnOffPrevNextBtn] = useState(true)

    const theadData = [
        '#', 'Tên người dùng', 'Email', 'Điện thoại', 'Vai trò', 'Action'
    ]
    const tbodyData = [
        {
            id: 1,
            items: ["Duc Anh", "test1@gmail.com", "091238723", "Admin"]
        },
        {
            id: 2,
            items: ["Minh Hong", "test2@gmail.com", "087423232", "Admin"]
        },
        {
            id: 3,
            items: ["Tuan Duc", "test3@gmail.com", "098200212", "Customer"]
        },
        {
            id: 4,
            items: ["Quang Anh", "test4@gmail.com", "078273322", "Admin"]
        },
        {
            id: 5,
            items: ["Duc Anh", "test1@gmail.com", "091238723", "Admin"]
        },
        {
            id: 6,
            items: ["Minh Hong", "test2@gmail.com", "087423232", "Admin"]
        },
        {
            id: 7,
            items: ["Tuan Duc", "test3@gmail.com", "098200212", "Customer"]
        },
        {
            id: 8,
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
            name: "Quản lý người dùng",
            path: ""
        }
    ]

    return (
        <>
            <Banner dataBreadcrumb={dataBreadcrumb}
                    title={"Danh sách người dùng"}
                    pathCreate={"create"}
                    isExport={true}/>
            <div data-aos="fade-right"
                 data-aos-delay="300">
                <Table
                    theadData={theadData}
                    tbodyData={tbodyData}
                    tbodyAction={tbodyAction}
                    fetchDelete={deleteUser}
                    fetchList={getListUser}/>
                <Paginate pageCount={100}
                          pageRangeDisplayed={3}
                          marginPagesDisplayed={2}
                          turnOffPrevNextBtn={turnOffPrevNextBtn}
                          firstIndexPerPage={1}
                          lastIndexPerPage={20}
                          totalItems={1200}
                          setTurnOffPrevNextBtn={setTurnOffPrevNextBtn}/>
            </div>
        </>
    );
};

export default UserList;