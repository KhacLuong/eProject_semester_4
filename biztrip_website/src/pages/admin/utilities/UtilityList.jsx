import React, {useState} from 'react';
import useDocumentTitle from "../../../hooks/useDocumentTitle.jsx";
import Banner from "../../../components/admin/Banner.jsx";
import Table from "../../../components/admin/Table.jsx";
import {deleteUser, getListUser} from "../../../middleware/services/apiService.jsx";
import Paginate from "../../../components/admin/Paginate.jsx";
import {MdAirlineSeatReclineExtra} from "react-icons/md"
import {FaRegLightbulb} from "react-icons/fa"
import {BiCurrentLocation} from "react-icons/bi"
import {TbFlipFlops} from "react-icons/tb"
import {ImManWoman} from "react-icons/im"

const UtilityList = () => {
    useDocumentTitle("Quản lý tiện ích", true)
    const [turnOffPrevNextBtn, setTurnOffPrevNextBtn] = useState(true)
    const theadData = [
        '#', 'Icon', 'Tên', 'Miêu tả', 'Trạng thái', 'Ngày thêm vào', 'Ngày cập nhật', 'Action'
    ]
    const tbodyData = [
        {
            id: 1,
            items: [{
                iconName: BiCurrentLocation
            }, "Ghế massage", "Ghế massage giúp cho hành khách ngồi trên xe thoải mái trong thời gian dài", "active", "08-05-2023", "08-05-2023"]
        },
        {
            id: 2,
            items: [{
                iconName: ImManWoman
            }, "Toilet", "Có nhà vệ sinh trên xe", "active", "08-05-2023", "08-05-2023"]
        },
        {
            id: 3,
            items: [{
                iconName: MdAirlineSeatReclineExtra
            }, "Xem vị trí trực tuyến", 'Cho phép hành khách nhìn thấy được lộ trình và thời gian di chuyển của chiếc xe khách mình đã đặt vé', "active", "08-05-2023", "08-05-2023"]
        },
        {
            id: 4,
            items: [{
                iconName: FaRegLightbulb
            }, "Đèn đọc sách", "Hỗ trợ hành khách đọc sách dễ dàng và an toàn khi ngồi trên xe", "active", "08-05-2023", "08-05-2023"]
        },
        {
            id: 5,
            items: [{
                iconName: TbFlipFlops
            }, "Dép", "Khi dừng ở trạm dừng chân sẽ có dép của nhà xe cho hành khách xuống xe", "active", "08-05-2023", "08-05-2023"]
        },
    ]
    const tbodyAction = ['edit', 'delete']
    const dataBreadcrumb = [
        {
            name: "Dashboard",
            path: "/admin/v1"
        },
        {
            name: "Quản lý tiện ích",
            path: ""
        }
    ]
    return (
        <>
            <Banner dataBreadcrumb={dataBreadcrumb} title={"Danh sách tiện ích"} pathCreate={"create"}
                    isExport={false}/>
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

export default UtilityList;