import React, {useEffect, useState} from 'react';
import useDocumentTitle from "../../../hooks/useDocumentTitle.jsx";
import Banner from "../../../components/admin/Banner.jsx";
import Table from "../../../components/admin/Table.jsx";
import Paginate from "../../../components/admin/Paginate.jsx";
import {useSelector, useDispatch} from 'react-redux'
import {
    fetchAllCoachUtility,
    fetchRemoveCoachUtility,
    selectCoachUtility,
} from "../../../redux/slices/coachUtilitySlice.jsx";
import {produce} from "immer"
import {tbodyActionDefault} from "../../../utils/data.jsx";
import moment from "moment";
import {useNavigate} from "react-router-dom";

const UtilityList = () => {
    const theadData = [
        '#ID', 'Image', 'Tên', 'Miêu tả', 'Trạng thái', 'Ngày thêm vào', 'Ngày cập nhật', 'Action'
    ]
    useDocumentTitle("Quản lý tiện ích", true)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const coachUtilities = useSelector(selectCoachUtility)
    const status = useSelector((state) => state.coachUtility.status)
    const totalItems = useSelector((state) => state.coachUtility.totalItems)
    const totalPages = useSelector((state) => state.coachUtility.totalPages)

    const [tbodyData, setTbodyData] = useState([])
    const [sortField, setSortField] = useState("updatedAt")
    const [sortDir, setSortDir] = useState("desc")
    const [pageNumber, setPageNumber] = useState(1)
    const [perPage, setPerPage] = useState(6)


    useEffect(() => {
        const keyword = ""
        dispatch(fetchAllCoachUtility({pageNumber, perPage, sortField, sortDir, keyword}))
    }, [navigate, dispatch, pageNumber, perPage, sortField, sortDir])

    useEffect(() => {
        if (coachUtilities.length >= 0) {
            const nextState = produce([], draft => {
                coachUtilities.map((item) => {
                    draft.push({
                        id: item?.id,
                        items: [
                            {
                                imagePath: item?.imagePath || "",
                                imageName: item?.imageName || ""
                            },
                            item?.title,
                            {
                                content: item?.description || ""
                            },
                            item?.status,
                            item?.createdAt ? moment(item?.createdAt).format("DD/MM/YYYY HH:mm:ss") : "",
                            item?.updatedAt ? moment(item?.updatedAt).format("DD/MM/YYYY HH:mm:ss") : ""
                        ]
                    })
                })
            })
            setTbodyData(nextState)
        }
    }, [coachUtilities]);

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
            <Banner dataBreadcrumb={dataBreadcrumb}
                    title={"Danh sách tiện ích"}
                    pathCreate={"create"}
                    perPage={perPage}
                    sortField={sortField}
                    sortDir={sortDir}
                    pageNumber={pageNumber}
                    fetchData={fetchAllCoachUtility}/>
            <div data-aos="fade-right"
                 data-aos-delay="300">
                <Table theadData={theadData}
                       tbodyData={tbodyData}
                       tbodyAction={tbodyActionDefault}
                       fetchDelete={fetchRemoveCoachUtility}/>
                {
                    totalItems > 0 && totalPages > 0 ?
                        <Paginate setPageNumber={setPageNumber}
                                  sortField={sortField}
                                  sortDir={sortDir}
                                  fetchData={fetchAllCoachUtility}
                                  totalPages={totalPages}
                                  perPage={perPage}
                                  totalItems={totalItems}/> :
                        <></>
                }

            </div>
        </>
    );
};

export default UtilityList;