import React, {useEffect, useState} from 'react';
import {MdAttachMoney} from "react-icons/md";
import {HiArrowNarrowUp, HiArrowNarrowDown, HiUsers, HiOutlineTicket} from "react-icons/hi";
import {TbBus} from "react-icons/tb";
const Dashboard = () => {
    return (
        <main>
            <div className={`px-4 pt-6`}>
                <div className={`grid grid-cols-1 gap-6 mb-6 w-full xl:grid-cols-2 2xl:grid-cols-4`}>
                    <div className={`bg-white shadow-lg shadow-gray-200 rounded-2xl p-4`}>
                        <div className={`flex items-center`}>
                            <div className={`inline-flex flex-shrink-0 justify-center items-center w-12 h-12 text-white bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg shadow-md shadow-gray-300`}>
                                <MdAttachMoney className={`w-6 h-6`}/>
                            </div>
                            <div className={`flex-shrink-0 ml-3`}>
                                <span className={`text-2xl font-bold leading-none text-gray-900`}>$3,600 / ngày</span>
                                <h3 className={`text-base font-normal text-gray-500`}>Doanh thu</h3>
                            </div>
                            <div
                                className="flex flex-1 justify-end items-center ml-5 w-0 text-base font-bold text-lime-500">
                                +16%
                               <HiArrowNarrowUp className={`w-5 h-5`}/>
                            </div>
                        </div>
                    </div>
                    <div className={`bg-white shadow-lg shadow-gray-200 rounded-2xl p-4`}>
                        <div className={`flex items-center`}>
                            <div className={`inline-flex flex-shrink-0 justify-center items-center w-12 h-12 text-white bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg shadow-md shadow-gray-300`}>
                                <HiOutlineTicket className={`w-6 h-6`}/>
                            </div>
                            <div className={`flex-shrink-0 ml-3`}>
                                <span className={`text-2xl font-bold leading-none text-gray-900`}>2,300 / ngày</span>
                                <h3 className={`text-base font-normal text-gray-500`}>Vé đã bán</h3>
                            </div>
                            <div
                                className="flex flex-1 justify-end items-center ml-5 w-0 text-base font-bold text-lime-500">
                                +3%
                                <HiArrowNarrowUp className={`w-5 h-5`}/>
                            </div>
                        </div>
                    </div>
                    <div className={`bg-white shadow-lg shadow-gray-200 rounded-2xl p-4`}>
                        <div className={`flex items-center`}>
                            <div className={`inline-flex flex-shrink-0 justify-center items-center w-12 h-12 text-white bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg shadow-md shadow-gray-300`}>
                                <HiUsers className={`w-6 h-6`}/>
                            </div>
                            <div className={`flex-shrink-0 ml-3`}>
                                <span className={`text-2xl font-bold leading-none text-gray-900`}>+3,462</span>
                                <h3 className={`text-base font-normal text-gray-500`}>Khách hàng mới</h3>
                            </div>
                            <div
                                className="flex flex-1 justify-end items-center ml-5 w-0 text-base font-bold text-red-500">
                                -2%
                                <HiArrowNarrowDown className={`w-5 h-5`}/>
                            </div>
                        </div>
                    </div>
                    <div className={`bg-white shadow-lg shadow-gray-200 rounded-2xl p-4`}>
                        <div className={`flex items-center`}>
                            <div className={`inline-flex flex-shrink-0 justify-center items-center w-12 h-12 text-white bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg shadow-md shadow-gray-300`}>
                                <TbBus className={`w-6 h-6`}/>
                            </div>
                            <div className={`flex-shrink-0 ml-3`}>
                                <span className={`text-2xl font-bold leading-none text-gray-900`}>2300</span>
                                <h3 className={`text-base font-normal text-gray-500`}>Khách hàng mới</h3>
                            </div>
                            <div
                                className="flex flex-1 justify-end items-center ml-5 w-0 text-base font-bold text-red-500">
                                -2%
                                <HiArrowNarrowDown className={`w-5 h-5`}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Dashboard;