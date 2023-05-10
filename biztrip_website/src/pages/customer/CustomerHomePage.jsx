import React, {useEffect} from 'react';
import AOS from "aos";
import "aos/dist/aos.css"
import useDocumentTitle from "../../hooks/useDocumentTitle.jsx";
import {CUSTOMER_DOCUMENT_TITLE} from "../../utils/data.jsx";
import Header from "../../layouts/customer/Header.jsx";
import Footer from "../../layouts/customer/Footer.jsx";
import {Outlet} from "react-router-dom";

const CustomerHomePage = () => {
    useDocumentTitle(CUSTOMER_DOCUMENT_TITLE, true)

    return (
        <>
            <Header/>
            {/*<Outlet/>*/}
            <Footer/>
        </>
    );
};

export default CustomerHomePage;