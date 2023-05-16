import React, {useEffect, useState} from 'react';
import Banner from "../../../components/admin/Banner.jsx";
import Table from "../../../components/admin/Table.jsx";
import {coachListBreadcrumb, tbodyActionSpecial} from "../../../utils/data.jsx";
import Paginate from "../../../components/admin/Paginate.jsx";
import useDocumentTitle from "../../../hooks/useDocumentTitle.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {fetchAllCoach, fetchRemoveCoach, selectCoach} from "../../../redux/slices/coachSlice.jsx";

const CoachList = () => {
    useDocumentTitle("Quản lý xe", true)
    const [turnOffPrevNextBtn, setTurnOffPrevNextBtn] = useState(true)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const coaches = useSelector(selectCoach)
    const status = useSelector((state) => state.coach.status)
    const totalItems = useSelector((state) => state.coach.totalItems)
    const totalPages = useSelector((state) => state.coach.totalPages)

    const theadData = [
        '#',
        'Image',
        {field: 'plateNumber', name: 'Biển số'},
        {field: 'totalSeats', name: 'Tổng số ghế'},
        {field: 'description', name: 'Miêu tả'},
        {field: 'status', name: 'Trạng thái'},
        {field: 'createdAt', name: 'Ngày thêm vào'},
        {field: 'updatedAt', name: 'Ngày cập nhật'},
        'Action'
    ]
    const [tbodyData, setTbodyData] = useState([])
    const [sortField, setSortField] = useState("updatedAt")
    const [sortDir, setSortDir] = useState("desc")
    const [pageNumber, setPageNumber] = useState(1)
    const [perPage, setPerPage] = useState(6)
    const [firstItemPerPage, setFirstItemPerPage] = useState(1)
    const [lastItemPerPage, setLastItemPerPage] = useState(perPage)
    const [keyword, setKeyword] = useState("")

    useEffect(() => {
        dispatch(fetchAllCoach({pageNumber, perPage, sortField, sortDir, keyword}))
    }, [navigate, dispatch, pageNumber, perPage, sortField, sortDir])

    return (
        <>
            <Banner dataBreadcrumb={coachListBreadcrumb}
                    title={"Danh sách xe"}
                    pathCreate={"/admin/v1/cms/coaches/create"}
                    perPage={perPage}
                    sortField={sortField}
                    sortDir={sortDir}
                    pageNumber={pageNumber}
                    setKeyword={setKeyword}
                    keyword={keyword}
                    fetchData={fetchAllCoach}/>
            <div data-aos="fade-right"
                 data-aos-delay="300" className={`block justify-start items-center p-4 mx-4 mt-4 mb-6 bg-white rounded-2xl shadow-xl shadow-gray-200 lg:p-5 sm:flex`}>
                <div className={`flex items-centers justify-center  mr-4`}>
                    <span className={`text-sm whitespace-nowrap flex items-center mr-2`}>Hiển thị</span>
                    <select value={perPage} onChange={(e) => setPerPage(+e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full">
                        <option value={6}>6</option>
                        <option value={9}>9</option>
                        <option value={12}>12</option>
                        <option value={15}>15</option>
                    </select>
                </div>
                <div className={`flex items-centers justify-center`}>
                    <span className={`text-sm whitespace-nowrap flex items-center mr-2`}>Lọc</span>
                    <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full">
                        <option>...</option>
                        <option>Trạng thái: Active</option>
                        <option>Trạng thái: Disable</option>
                    </select>
                </div>
            </div>
            <div data-aos="fade-right"
                 data-aos-delay="300">
                <Table
                    theadData={theadData}
                    tbodyData={tbodyData}
                    tbodyAction={tbodyActionSpecial}
                    fetchDelete={fetchRemoveCoach}
                    status={status}
                    setSortField={setSortField}
                    setSortDir={setSortDir}
                    firstItemPerPage={firstItemPerPage}/>
                {
                    totalItems > 0 && totalPages > 0 ?
                        <Paginate setPageNumber={setPageNumber}
                                  sortField={sortField}
                                  sortDir={sortDir}
                                  fetchData={fetchAllCoach}
                                  totalPages={totalPages}
                                  perPage={perPage}
                                  totalItems={totalItems}
                                  firstItemPerPage={firstItemPerPage}
                                  setFirstItemPerPage={setFirstItemPerPage}
                                  lastItemPerPage={lastItemPerPage}
                                  setLastItemPerPage={setLastItemPerPage}/> :
                        <></>
                }
            </div>
        </>
    );
};

export default CoachList;