import React, {useState} from 'react';
import useDocumentTitle from "../../../hooks/useDocumentTitle.jsx";
import Table from "../../../components/admin/Table.jsx";
import Paginate from "../../../components/admin/Paginate.jsx";
import Banner from "../../../components/admin/Banner.jsx";
import avatar from "../../../assets/image/avatar/me.jpg"
import {deleteUser, getListUser} from "../../../middleware/services/apiService.jsx";

const StaffList = () => {
    useDocumentTitle("Quản lý nhân viên", true)
    const [turnOffPrevNextBtn, setTurnOffPrevNextBtn] = useState(true)
    const theadData = [
        '#', 'Avatar', 'Tên nhân viên', 'Email', 'Điện thoại', 'Vị trí', 'Ngày sinh', 'Địa chỉ', 'Trạng thái', 'Thời gian làm việc', 'Hệ số', 'Action'
    ]
    const tbodyData = [
        {
            id: 1,
            items: [{
                imgPath: avatar,
                imgName: ""
            }, "Đức Anh", "staff001@gmail.com", "089748123", "Lái xe", "28-02-1999", "Hà Nội", "Chính thức", "379 ngày", "5"]
        },
        {
            id: 2,
            items: [{
                imgPath: avatar,
                imgName: ""
            }, "Đức Thắng", "staff002@gmail.com", "032338123", "Phụ xe", "28-02-1999", "Thanh Hoá", "Chính thức", "179 ngày", "3"]
        },
        {
            id: 3,
            items: [{
                imgPath: avatar,
                imgName: ""
            }, "Minh Tuấn", "staff003@gmail.com", "076678123", "Lái xe", "28-02-1999", "Hà Nội", "Thử việc", "29 ngày", "1.5"]
        },
        {
            id: 4,
            items: [{
                imgPath: avatar,
                imgName: ""
            }, "Quang Anh", "staff004@gmail.com", "093459345", "Phụ xe", "28-02-1999", "Hà Nội", "Thử việc", "10 ngày", "1"]
        },
    ]
    const tbodyAction = ['edit', 'delete']
    const dataBreadcrumb = [
        {
            name: "Dashboard",
            path: "/admin/v1"
        },
        {
            name: "Quản lý nhân viên",
            path: ""
        }
    ]
    return (
       <>
           <Banner dataBreadcrumb={dataBreadcrumb} title={"Danh sách nhân viên"} pathCreate={"create"} isExport={false}/>
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

export default StaffList;