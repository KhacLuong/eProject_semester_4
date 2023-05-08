import React, {useEffect} from 'react';
import Sidebar from "../../layouts/admin/Sidebar.jsx";
import Navbar from "../../layouts/admin/Navbar.jsx";
import {Outlet} from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css"
import useDocumentTitle from "../../hooks/useDocumentTitle.jsx";
import {ADMIN_DOCUMENT_TITLE} from "../../utils/data.jsx";

const AdminHomePage = () => {
    useDocumentTitle(ADMIN_DOCUMENT_TITLE, true)
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 0,
            easing: 'ease-in-out',
            delay: 0,
            mirror: false,
            disable: false,
        })
        AOS.refresh()
    }, [])
    return (
        <>
            <nav className={`fixed z-30 w-full bg-gray-50`}>
                <Navbar/>
            </nav>
            <div className={`flex overflow-hidden bg-white pt-16 h-screen`}>
                <aside id={`sidebar`}
                       className={`flex fixed top-0 left-0 z-20 flex-col flex-shrink-0 pt-16 w-64 h-full duration-200 lg:flex transition-width lg:w-64 ps`}
                       aria-label={`Sidebar`}>
                    <Sidebar/>
                </aside>
                <div id={`main-content`} className={`h-full w-full bg-gray-50 relative overflow-y-scroll lg:ml-64`}>
                    <Outlet/>
                </div>
            </div>
        </>
    );
};

export default AdminHomePage;