import React from 'react';
import "aos/dist/aos.css"
import useDocumentTitle from "../../hooks/useDocumentTitle.jsx";
import {CUSTOMER_DOCUMENT_TITLE} from "../../utils/data.jsx";
import Header from "../../layouts/customer/Header.jsx";
import Footer from "../../layouts/customer/Footer.jsx";
import {Outlet} from "react-router-dom";
import Banner from "../../layouts/customer/Banner.jsx";

const CustomerHomePage = () => {
    useDocumentTitle(CUSTOMER_DOCUMENT_TITLE, true)

    return (
        <div className={`relative`}>
            <Header/>
            <div className={`block`}>
                <Banner/>
                {/*<Outlet/>*/}
            </div>
            <Footer/>
        </div>
    );
};

export default CustomerHomePage;