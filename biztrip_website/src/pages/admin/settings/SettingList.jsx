import React, {useState} from 'react';
import useDocumentTitle from "../../../hooks/useDocumentTitle.jsx";
import Table from "../../../components/admin/Table.jsx";
import Paginate from "../../../components/admin/Paginate.jsx";
import Banner from "../../../components/admin/Banner.jsx";

const SettingList = () => {
    useDocumentTitle("Quản lý hiển thị", true)
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
            name: "Quản lý hiển thị",
            path: ""
        }
    ]

    return (
        <>
            <Banner dataBreadcrumb={dataBreadcrumb} title={"Danh sách hiển thị"} pathCreate={"create"} isExport={false}/>
            <div data-aos="fade-right"
                 data-aos-delay="300">
                <Table theadData={theadData} tbodyData={tbodyData} tbodyAction={tbodyAction}/>
                <Paginate pageCount={100} pageRangeDisplayed={3}
                          marginPagesDisplayed={2}
                          turnOffPrevNextBtn={turnOffPrevNextBtn} firstIndexPerPage={1}
                          lastIndexPerPage={20} totalItems={1200}
                          setTurnOffPrevNextBtn={setTurnOffPrevNextBtn}/>
            </div>
        </>
    );
};

export default SettingList;