import React, {useEffect} from 'react';
import AOS from "aos";
import "aos/dist/aos.css"
import useDocumentTitle from "../../hooks/useDocumentTitle.jsx";
import {CUSTOMER_DOCUMENT_TITLE} from "../../utils/data.jsx";

const CustomerHomePage = () => {
    useDocumentTitle(CUSTOMER_DOCUMENT_TITLE, true)
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
        <div>

        </div>
    );
};

export default CustomerHomePage;