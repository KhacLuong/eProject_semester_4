import React from 'react';
import {BiPlus, TbFileExport} from "react-icons/all.js";
import Breadcrumb from "../admin/Breadcrumb.jsx";
import {Link} from "react-router-dom";

const Banner = (props) => {
    const {dataBreadcrumb, title, pathCreate, isExport} = props
    const handleSearch = () => {

    }
    return (
        <div
            className={`block justify-between items-center p-4 mx-4 mt-4 mb-6 bg-white rounded-2xl shadow-xl shadow-gray-200 lg:p-5 sm:flex`}
            data-aos="fade-up"
            data-aos-delay="100">
            <div className={`mb-1 w-full`}>
                <div className={`mb-4`}>
                    <Breadcrumb dataBreadcrumb={dataBreadcrumb}/>
                    <h1 className={`text-xl font-semibold text-gray-900 sm:text-2xl`}>{title}</h1>
                </div>
                <div className={`sm:flex`}>
                    <div className={`hidden items-center mb-3 sm:flex sm:divide-x sm:divide-gray-100 sm:mb-0`}>
                        <form className={`lg:pr-3`}>
                            <label htmlFor={`user-search`} className={`sr-only`}>Search</label>
                            <div className={`relative mt-1 lg:w-64 xl:w-96`}>
                                <input type={`text`} id={`user-search`}
                                       className={`border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-neutral-50 focus:border-neutral-600 block w-full p-2.5`}
                                       placeholder={`Tìm kiếm...`}/>
                            </div>
                        </form>
                    </div>
                    <div className={`flex items-center ml-auto space-x-2 sm:space-x-3`}>
                        {
                            pathCreate ?
                                <Link to={pathCreate}
                                      className={`inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-successColor hover:bg-successColor_hover sm:ml-auto shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform duration-300`}>
                                    <BiPlus className={`mr-2 -ml-1 w-6 h-6`}/>
                                    Thêm mới
                                </Link> :
                                <></>
                        }

                        {
                            isExport ?
                                <button
                                    className={`inline-flex justify-center items-center py-2 px-3 w-1/2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:scale-[1.02] transition-transform sm:w-auto`}>
                                    <TbFileExport className={`mr-2 -ml-1 w-6 h-6`}/>
                                    Export
                                </button> :
                                <></>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;