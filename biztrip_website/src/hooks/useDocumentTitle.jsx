import React from 'react'
import {useRef, useEffect} from 'react'
import {ADMIN_DOCUMENT_TITLE} from "../utils/data.jsx";

const useDocumentTitle = (title, prevailOnUnmount = false) => {
    const defaultTitle = useRef(document.title)
    useEffect(() => {
        document.title = title
    }, [title])
    useEffect(() => {
        if (!prevailOnUnmount) {
            document.title = defaultTitle.current
        }
    }, [])
};

export default useDocumentTitle;