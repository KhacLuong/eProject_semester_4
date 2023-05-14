import React, {useState} from 'react';
import Banner from "../../../components/admin/Banner.jsx";
import Table from "../../../components/admin/Table.jsx";
import {tbodyActionDefault, tbodyActionSpecial} from "../../../utils/data.jsx";
import {deleteUser, getListUser} from "../../../middleware/services/apiService.jsx";
import Paginate from "../../../components/admin/Paginate.jsx";
import useDocumentTitle from "../../../hooks/useDocumentTitle.jsx";

const CoachList = () => {
    useDocumentTitle("Quản lý xe", true)
    const [turnOffPrevNextBtn, setTurnOffPrevNextBtn] = useState(true)
    const theadData = [
        '#', 'Image', 'Biển số', 'Tổng số ghế', 'Lái xe', 'Phụ lái', 'Miêu tả', 'Trạng thái', 'Ngày thêm vào', 'Ngày cập nhật', 'Action'
    ]
    const tbodyData = [
        {
            id: 1,
            items: [{
                imgPath: "https://eprojectsem4.blob.core.windows.net/coach/coach_car_1.jpg",
                imageName: ""
            },"29B-99888", 45, "Đức Anh", "Linh Nguyễn", "Xe liên tỉnh", "Active", "20-02-2021", "19-09-2022"]
        },
        {
            id: 2,
            items: [{
                imgPath: "https://eprojectsem4.blob.core.windows.net/coach/coach_car_1.jpg",
                imageName: ""
            },"29B-88999", 27, "Đức Anh", "Linh Nguyễn", "Xe liên tỉnh", "Active", "20-02-2021", "19-09-2022"]
        },
        {
            id: 3,
            items: [{
                imgPath: "https://eprojectsem4.blob.core.windows.net/coach/coach_car_1.jpg",
                imageName: ""
            },"29B-667788", 16, "Đức Anh", "Linh Nguyễn", "Xe liên tỉnh", "Active", "20-02-2021", "19-09-2022"]
        },
        {
            id: 4,
            items: [{
                imgPath: "https://eprojectsem4.blob.core.windows.net/coach/coach_car_1.jpg",
                imageName: ""
            },"29B-88888", 25, "Đức Anh", "Linh Nguyễn", "Xe liên tỉnh", "Active", "20-02-2021", "19-09-2022"]
        },
    ]

    const dataBreadcrumb = [
        {
            name: "Dashboard",
            path: "/admin/v1"
        },
        {
            name: "Quản lý xe",
            path: ""
        }
    ]
    return (
        <>
            <Banner dataBreadcrumb={dataBreadcrumb} title={"Danh sách xe"} pathCreate={"create"} isExport={false}/>
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

export default CoachList;