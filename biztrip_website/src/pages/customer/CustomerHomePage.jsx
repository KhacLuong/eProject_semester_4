import React from 'react';
import "aos/dist/aos.css"
import useDocumentTitle from "../../hooks/useDocumentTitle.jsx";
import {CUSTOMER_DOCUMENT_TITLE} from "../../utils/data.jsx";
import Header from "../../layouts/customer/Header.jsx";
import Footer from "../../layouts/customer/Footer.jsx";
import {Outlet} from "react-router-dom";
import Banner from "../../layouts/customer/Banner.jsx";
import Booking from "../../layouts/customer/Booking.jsx";
import SidebarLeft from "../../layouts/customer/SidebarLeft.jsx";
import SidebarRight from "../../layouts/customer/SidebarRight.jsx";


const CustomerHomePage = () => {
    useDocumentTitle(CUSTOMER_DOCUMENT_TITLE, true)

    return (
        <div className={`relative`}>
            {/*<Header/>*/}
            {/*<div className={`block`}>*/}
            {/*    <Banner/>*/}
            {/*    /!*<Outlet/>*!/*/}
            {/*</div>*/}
            {/*<Footer/>*/}
            {/*<nav className={`fixed z-30 w-full bg-gray-50`}>*/}

            {/*</nav>*/}
            <div className={`flex overflow-hidden bg-white h-screen`}>
                <aside id={`sidebar`}
                       className={`flex fixed top-0 left-0 z-20 flex-col flex-shrink-0 w-56 h-full duration-200 lg:flex transition-width lg:w-56`}
                       aria-label={`Sidebar`}>
                    <SidebarLeft/>
                </aside>
                <div id={`main-content`} className={`h-full w-full bg-gray-50 relative overflow-y-scroll lg:ml-56`}>
                    {/*<Outlet/>*/}
                </div>
                <aside id={`sidebar`}
                       className={`flex fixed top-0 right-0 z-20 flex-col flex-shrink-0 w-64 h-full duration-200 lg:flex transition-width lg:w-80`}
                       aria-label={`Sidebar`}>
                    <SidebarRight/>
                </aside>
            </div>
        </div>
    );
};

export default CustomerHomePage;