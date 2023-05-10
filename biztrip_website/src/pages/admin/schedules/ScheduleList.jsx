import React, {useState} from 'react';
import useDocumentTitle from "../../../hooks/useDocumentTitle.jsx";
import avatar from "../../../assets/image/avatar/me.jpg";
import Banner from "../../../components/admin/Banner.jsx";
import Table from "../../../components/admin/Table.jsx";
import {tbodyActionDefault, tbodyActionSpecial} from "../../../utils/data.jsx";
import {deleteUser, getListUser} from "../../../middleware/services/apiService.jsx";
import Paginate from "../../../components/admin/Paginate.jsx";

const ScheduleList = () => {
    useDocumentTitle("Quản lý lộ trình", true)
    const [turnOffPrevNextBtn, setTurnOffPrevNextBtn] = useState(true)
    const theadData = [
        '#', 'Điểm khởi hành', 'Điểm kết thúc', 'Thời gian xuất phát', 'Thời gian đến', 'Trạng thái', 'Ngày thêm vào', 'Ngày cập nhật', 'Action'
    ]
    const tbodyData = [
        {
            id: 1,
            items: ["Bến xe Giáp Bát", "Nghệ an", "10:15", "15:00", "active", "20-12-2022", "20-12-2022"]
        },
        {
            id: 2,
            items: ["Bến xe Nước Ngầm", "Nghệ an", "12:15", "17:00", "disable", "20-12-2022", "20-12-2022"]
        },
        {
            id: 3,
            items: ["Bến xe Yên Nghĩa", "Thanh Hoá", "6:55", "11:00", "active", "20-12-2022", "20-12-2022"]
        },
    ]
    const dataBreadcrumb = [
        {
            name: "Dashboard",
            path: "/admin/v1"
        },
        {
            name: "Quản lý lộ trình",
            path: ""
        }
    ]
    return (
       <>
           <Banner dataBreadcrumb={dataBreadcrumb} title={"Danh sách lộ trình"} pathCreate={"create"} isExport={false}/>
           <div data-aos="fade-right"
                data-aos-delay="300">
               <Table
                   theadData={theadData}
                   tbodyData={tbodyData}
                   tbodyAction={tbodyActionSpecial}
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

export default ScheduleList;