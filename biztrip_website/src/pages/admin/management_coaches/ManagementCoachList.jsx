import React, {useState} from 'react';
import useDocumentTitle from "../../../hooks/useDocumentTitle.jsx";
import lazyCatImg from "../../../assets/image/lazycat_code-01.png"
import Banner from "../../../components/admin/Banner.jsx";
import Paginate from "../../../components/admin/Paginate.jsx";
import Table from "../../../components/admin/Table.jsx";
const ManagementCoachList = () => {
    useDocumentTitle("Quản lý nhà xe", true)
    const [turnOffPrevNextBtn, setTurnOffPrevNextBtn] = useState(true)

    const theadData = [
        '#', 'Hình ảnh', 'Tên nhà xe', 'Chủ sở hữu', 'Hotline', 'Trạng thái', 'Ngày tạo', 'Action'
    ]
    const tbodyData = [
        {
            items: [{imgPath: lazyCatImg, imgName: ""}, "Nhà xe LazyCat", 'Lê Khả Đức Anh', "098989888", "Active", "20-04-2023"]
        },
        {
            items: [{imgPath: lazyCatImg, imgName: ""}, "Nhà xe Coder", 'Lê Khả Đức Anh', "0880088808", "Disable", "21-04-2023"]
        },
    ]
    const dataBreadcrumb = [
        {
            name: "Dashboard",
            path: "/admin/v1"
        },
        {
            name: "Quản lý nhà xe",
            path: ""
        }
    ]
    const tbodyAction = ['view', 'edit']
    return (
        <>
            <Banner dataBreadcrumb={dataBreadcrumb} title={"Danh sách nhà xe"} pathCreate={""} isExport={false}/>
            <div data-aos="fade-right"
                 data-aos-delay="300">
                <Table theadData={theadData} tbodyData={tbodyData} tbodyAction={tbodyAction}/>
                <Paginate pageCount={100} pageRangeDisplayed={3} marginPagesDisplayed={2} turnOffPrevNextBtn={turnOffPrevNextBtn} firstIndexPerPage={1} lastIndexPerPage={20} totalItems={1200} setTurnOffPrevNextBtn={setTurnOffPrevNextBtn}/>
            </div>

        </>
    );
};

export default ManagementCoachList;