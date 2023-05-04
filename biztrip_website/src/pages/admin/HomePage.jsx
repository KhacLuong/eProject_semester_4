import React from 'react';
import Sidebar from "../../layouts/admin/Sidebar.jsx";
import Navbar from "../../layouts/admin/Navbar.jsx";
import {Outlet} from "react-router-dom";
import Footer from "../../layouts/admin/Footer.jsx";

const HomePage = () => {
    return (
        <>
            <nav className={`fixed z-30 w-full bg-gray-50`}>
                <Navbar/>
            </nav>
            <div className={`flex overflow-hidden bg-white pt-16`}>
                <aside id={`sidebar`} className={`flex hidden fixed top-0 left-0 z-20 flex-col flex-shrink-0 pt-16 w-64 h-full duration-200 lg:flex transition-width lg:w-64 ps`} aria-label={`Sidebar`}>
                    <Sidebar/>
                </aside>
                <div id={`main-content`} className={`h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64`}>
                    <Outlet/>
                    <Footer/>
                    <p className="my-10 text-sm text-center text-gray-500">
                        © 2019-2023 Built with ❤️ by
                        <a href="#" className="hover:underline" target="_blank"> Creative BizTrip Team</a>. All
                        rights reserved.
                    </p>
                </div>
            </div>
        </>
    );
};

export default HomePage;