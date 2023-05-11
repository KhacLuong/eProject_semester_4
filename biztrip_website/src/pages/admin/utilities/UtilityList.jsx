import React, {useEffect, useState} from 'react';
import useDocumentTitle from "../../../hooks/useDocumentTitle.jsx";
import Banner from "../../../components/admin/Banner.jsx";
import Table from "../../../components/admin/Table.jsx";
import {deleteUser, getListUser} from "../../../middleware/services/apiService.jsx";
import Paginate from "../../../components/admin/Paginate.jsx";
import {useSelector, useDispatch} from 'react-redux'
import {fetchAllCoachUtility} from "../../../redux/slices/coachUtilitySlice.jsx";
import {produce} from "immer"

const UtilityList = () => {
    useDocumentTitle("Quản lý tiện ích", true)
    const dispatch = useDispatch()
    const [turnOffPrevNextBtn, setTurnOffPrevNextBtn] = useState(true)
    const theadData = [
        '#', 'Icon', 'Tên', 'Miêu tả', 'Trạng thái', 'Ngày thêm vào', 'Ngày cập nhật', 'Action'
    ]
    const [tbodyData, setTbodyData] = useState([])
    const coachUtility = useSelector((state) => state.coachUtility.listCoachUtility)
    const isLoading = useSelector((state) => state.coachUtility.isLoading)
    const isError = useSelector((state) => state.coachUtility.isError)

    useEffect(() => {
        const test = async () => {
            await handleGetCoachUtility();
        }
        test()
    }, [dispatch])
    const handleGetCoachUtility = async () => {
        const res = await dispatch(fetchAllCoachUtility()).unwrap()
        const newData = []
        if (res && res.code === 200) {
            const nextState = produce(newData, draft => {
                coachUtility.data.map((item, index) => {
                    draft.push({id: item.id, items: [Object.entries(item).map(([key, value]) => ({key,value}))]})
                })
            })
            setTbodyData(nextState)
            console.log(tbodyData)
        } else {
            setTbodyData([])
        }
    }
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