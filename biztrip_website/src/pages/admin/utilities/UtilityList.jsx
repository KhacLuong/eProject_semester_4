import React, {useEffect, useState} from 'react';
import useDocumentTitle from "../../../hooks/useDocumentTitle.jsx";
import Banner from "../../../components/admin/Banner.jsx";
import Table from "../../../components/admin/Table.jsx";
import {deleteUser, getListUser} from "../../../middleware/services/apiService.jsx";
import Paginate from "../../../components/admin/Paginate.jsx";
import {useSelector, useDispatch} from 'react-redux'
import {
    fetchAllCoachUtility,
    fetchRemoveCoachUtility,
    selectCoachUtility
} from "../../../redux/slices/coachUtilitySlice.jsx";
import {produce} from "immer"
import {tbodyActionDefault} from "../../../utils/data.jsx";

const UtilityList = () => {
    useDocumentTitle("Quản lý tiện ích", true)
    const dispatch = useDispatch()
    const [turnOffPrevNextBtn, setTurnOffPrevNextBtn] = useState(true)
    const theadData = [
        '#', 'Image', 'Tên', 'Miêu tả', 'Trạng thái', 'Ngày thêm vào', 'Ngày cập nhật', 'Action'
    ]
    const [tbodyData, setTbodyData] = useState([])
    const coachUtility = useSelector(selectCoachUtility)

    useEffect(() => {
        dispatch(fetchAllCoachUtility())
        const nextState = produce([], draft => {
            coachUtility.map((item) => {
                draft.push({
                    id: item?.id,
                    items: [
                        {
                            imagePath: item?.imagePath || "",
                            imageName: item?.imageName || ""
                        },
                        item?.title || "",
                        {
                            content: item?.description || ""
                        },
                        item?.status || "",
                        item?.createdAt || "28-02-2023",
                        item?.updatedAt || "14-04-2023"
                    ]
                })
            })
        })
        setTbodyData(nextState)
    }, [dispatch])
    const handleGetCoachUtility = async () => {
    }
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
    const handleRemove = (id) => {
        dispatch(fetchRemoveCoachUtility({id}))
    }
    return (
        <>
            <Banner dataBreadcrumb={dataBreadcrumb} title={"Danh sách tiện ích"} pathCreate={"create"}
                    isExport={false}/>
            <div data-aos="fade-right"
                 data-aos-delay="300">
                <Table
                    theadData={theadData}
                    tbodyData={tbodyData}
                    tbodyAction={tbodyActionDefault}
                    fetchDelete={handleRemove}
                    fetchList={handleGetCoachUtility}/>
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