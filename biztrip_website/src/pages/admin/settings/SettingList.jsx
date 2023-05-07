import React, {useState} from 'react';
import useDocumentTitle from "../../../hooks/useDocumentTitle.jsx";
import Table from "../../../components/admin/Table.jsx";
import Paginate from "../../../components/admin/Paginate.jsx";
import Banner from "../../../components/admin/Banner.jsx";

const SettingList = () => {
    useDocumentTitle("List setting")
    const [turnOffPrevNextBtn, setTurnOffPrevNextBtn] = useState(true)

    const theadData = [
        '#', 'Key', 'Value', 'Type', 'Action'
    ]
    const tbodyData = [
        {
            items: ["hot_line", "0899899998", "text"]
        },
        {
            items: ["footer", "<p>this is footer</p>", "html/css"]
        },
        {
            items: ["email", "biztrip@gmail.com", "text"]
        },
        {
            items: ["hot_line", "0899899998", "text"]
        },
        {
            items: ["footer", "<p>this is footer</p>", "html/css"]
        },
        {
            items: ["email", "biztrip@gmail.com", "text"]
        },
        {
            items: ["hot_line", "0899899998", "text"]
        },
        {
            items: ["footer", "<p>this is footer</p>", "html/css"]
        },
        {
            items: ["email", "biztrip@gmail.com", "text"]
        },
    ]
    const tbodyAction = ['edit', 'delete']
    const dataBreadcrumb = [
        {
            name: "Dashboard",
            path: "/admin/v1"
        },
        {
            name: "Cài đặt",
            path: ""
        }
    ]

    return (
        <>
            <Banner dataBreadcrumb={dataBreadcrumb} title={"Danh sách cài đặt"} pathCreate={"create"} isExport={false}/>
            <Table theadData={theadData} tbodyData={tbodyData} tbodyAction={tbodyAction}/>
            <Paginate pageCount={100} pageRangeDisplayed={3}
                      marginPagesDisplayed={2}
                      turnOffPrevNextBtn={turnOffPrevNextBtn} firstIndexPerPage={1}
                      lastIndexPerPage={20} totalItems={1200}
                      setTurnOffPrevNextBtn={setTurnOffPrevNextBtn}/>
        </>
    );
};

export default SettingList;