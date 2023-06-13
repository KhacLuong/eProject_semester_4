import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import useDocumentTitle from "../../../hooks/useDocumentTitle.jsx";
import {useNavigate} from "react-router-dom";
import {fetchAllTicket, fetchRemoveTicket, selectTicket} from "../../../redux/slices/ticketSlice.jsx";
import {produce} from "immer";
import moment from "moment";
import Banner from "../../../components/admin/Banner.jsx";
import {listBreadcrumb, tbodyActionDefault} from "../../../utils/data.jsx";
import Table from "../../../components/admin/Table.jsx";
import Paginate from "../../../components/admin/Paginate.jsx";

const TicketList = () => {
    useDocumentTitle("Quản lý vé", true)
    const theadData = [
        '#',
        {field: 'title', name: 'Loại vé'},
        {field: 'fare', name: 'Giá vé'},
        {field: 'createdAt', name: 'Ngày thêm vào'},
        {field: 'updatedAt', name: 'Ngày cập nhật'},
        'Action'
    ]
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const tickets = useSelector(selectTicket)
    const status = useSelector((state) => state.ticket.status)
    const totalItems = useSelector((state) => state.ticket.totalItems)
    const totalPages = useSelector((state) => state.ticket.totalPages)
    const [tbodyData, setTbodyData] = useState([])
    const [sortField, setSortField] = useState("updatedAt")
    const [sortDir, setSortDir] = useState("desc")
    const [pageNumber, setPageNumber] = useState(1)
    const [perPage, setPerPage] = useState(6)
    const [firstItemPerPage, setFirstItemPerPage] = useState(1)
    const [lastItemPerPage, setLastItemPerPage] = useState(perPage)
    const [keyword, setKeyword] = useState("")

    useEffect(() => {
        dispatch(fetchAllTicket({pageNumber, perPage, sortField, sortDir, keyword}))
    }, [navigate, dispatch, pageNumber, perPage, sortField, sortDir])
    useEffect(() => {
        if (tickets && tickets.length >= 0) {
            const nextState = produce([], draft => {
                tickets.map((item) => {
                    draft.push({
                        id: item?.id,
                        items: [
                            item?.title,
                            item?.fare,
                            item?.createdAt ? moment(item?.createdAt).format("DD/MM/YYYY HH:mm:ss") : "",
                            item?.updatedAt ? moment(item?.updatedAt).format("DD/MM/YYYY HH:mm:ss") : ""
                        ]
                    })
                })
            })
            setTbodyData(nextState)
        }
    }, [tickets])

    return (
        <>
            <Banner dataBreadcrumb={listBreadcrumb("Quản lý vé")}
                    title={"Danh sách vé"}
                    pathCreate={"create"}
                    perPage={perPage}
                    sortField={sortField}
                    sortDir={sortDir}
                    pageNumber={pageNumber}
                    setKeyword={setKeyword}
                    keyword={keyword}
                    fetchData={fetchAllTicket}/>
            <div data-aos="fade-right"
                 data-aos-delay="300"
                 className={`block justify-end items-center p-4 mx-4 mt-4 mb-6 bg-white rounded-2xl shadow-xl shadow-gray-200 lg:p-5 sm:flex`}>
                <div className={`flex items-centers justify-center mr-8`}>
                    <label htmlFor={`filter`} className={`text-sm whitespace-nowrap flex items-center mr-2`}>Lọc</label>
                    <select id={`filter`}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full">
                        <option>...</option>
                        <option>Trạng thái: Active</option>
                        <option>Trạng thái: Disable</option>
                    </select>
                </div>
                <div className={`flex items-centers justify-center`}>
                    <label htmlFor={`perPage`} className={`text-sm whitespace-nowrap flex items-center mr-2`}>Hiển
                        thị</label>
                    <select id={`perPage`} value={perPage} onChange={(e) => setPerPage(+e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full">
                        <option value={6}>6</option>
                        <option value={9}>9</option>
                        <option value={12}>12</option>
                        <option value={15}>15</option>
                    </select>
                </div>
            </div>
            <div data-aos="fade-right"
                 data-aos-delay="500">
                <Table theadData={theadData}
                       tbodyData={tbodyData}
                       tbodyAction={tbodyActionDefault}
                       fetchDelete={fetchRemoveTicket}
                       pageNumber={pageNumber}
                       perPage={perPage}
                       sortField={sortField}
                       sortDir={sortDir}
                       fetchAll={fetchAllTicket}
                       status={status}
                       setSortField={setSortField}
                       setSortDir={setSortDir}
                       firstItemPerPage={firstItemPerPage}/>
                {
                    totalItems > 0 && totalPages > 0 ?
                        <Paginate pageNumber={pageNumber}
                                  setPageNumber={setPageNumber}
                                  sortField={sortField}
                                  sortDir={sortDir}
                                  fetchData={fetchAllTicket}
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

export default TicketList;