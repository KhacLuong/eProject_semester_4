import React from 'react';
import {MdOutlineSpaceDashboard, MdOutlineWarehouse} from "react-icons/md";
import {FiUsers} from "react-icons/fi";
import {BiDollarCircle, BiNews} from "react-icons/bi";
import {HiOutlineTicket} from "react-icons/hi";
import {TbBus, TbRoad} from "react-icons/tb";
import {FaRegMoneyBillAlt} from "react-icons/fa";
import {GrServices} from "react-icons/gr";
import {AiOutlineLike} from "react-icons/ai";

const Sidebar = () => {
    return (
        <div className={`flex relative flex-col flex-1 pt-0 min-h-0 bg-gray-50`}>
            <div className={`flex overflow-y-auto flex-col flex-1 pt-8 pb-4`}>
                <div className={`flex-1 px-3 bg-gray-50`} id={`sidebar-items`}>
                    <ul className={`pb-2 pt-1`}>
                        <li>
                            <a href={`#`} className={`flex items-center py-2.5 px-4 text-base font-normal text-dark-500 rounded-lg hover:bg-gray-200 group  transition-all duration-200`}>
                                <div className={`bg-white shadow-lg shadow-gray-300 text-dark-700 w-8 h-8 mr-1 rounded-lg text-center grid place-items-center`}>
                                    <MdOutlineSpaceDashboard className={`w-[20px] h-[20px]`}/>
                                </div>
                                <span className={`ml-3 text-dark-500 text-sm font-medium`}>Dashboard</span>
                            </a>
                        </li>
                        <li className="w-full mt-4 mb-3">
                            <h6 className="pl-4 font-bold leading-tight uppercase text-xs opacity-60">Quản lý</h6>
                        </li>
                        <li>
                            <a href={`#`} className={`flex items-center py-2.5 px-4 text-base font-normal text-dark-500 rounded-lg hover:bg-gray-200 group  transition-all duration-200`}>
                                <div className={`bg-white shadow-lg shadow-gray-300 text-dark-700 w-8 h-8 mr-1 rounded-lg text-center grid place-items-center`}>
                                    <FiUsers className={`w-[20px] h-[20px]`}/>
                                </div>
                                <span className={`ml-3 text-dark-500 text-sm font-medium`}>Users</span>
                            </a>
                        </li>
                        <li>
                            <a href={`#`} className={`flex items-center py-2.5 px-4 text-base font-normal text-dark-500 rounded-lg hover:bg-gray-200 group  transition-all duration-200`}>
                                <div className={`bg-white shadow-lg shadow-gray-300 text-dark-700 w-8 h-8 mr-1 rounded-lg text-center grid place-items-center`}>
                                    <BiDollarCircle className={`w-[20px] h-[20px]`}/>
                                </div>
                                <span className={`ml-3 text-dark-500 text-sm font-medium`}>Doanh thu</span>
                            </a>
                        </li>
                        <li>
                            <a href={`#`} className={`flex items-center py-2.5 px-4 text-base font-normal text-dark-500 rounded-lg hover:bg-gray-200 group  transition-all duration-200`}>
                                <div className={`bg-white shadow-lg shadow-gray-300 text-dark-700 w-8 h-8 mr-1 rounded-lg text-center grid place-items-center`}>
                                    <FaRegMoneyBillAlt className={`w-[20px] h-[20px]`}/>
                                </div>
                                <span className={`ml-3 text-dark-500 text-sm font-medium`}>Hóa đơn</span>
                            </a>
                        </li>
                        <li>
                            <a href={`#`} className={`flex items-center py-2.5 px-4 text-base font-normal text-dark-500 rounded-lg hover:bg-gray-200 group  transition-all duration-200`}>
                                <div className={`bg-white shadow-lg shadow-gray-300 text-dark-700 w-8 h-8 mr-1 rounded-lg text-center grid place-items-center`}>
                                    <BiNews className={`w-[20px] h-[20px]`}/>
                                </div>
                                <span className={`ml-3 text-dark-500 text-sm font-medium`}>Blog</span>
                            </a>
                        </li>

                        <li className="w-full mt-4 mb-3">
                            <h6 className="pl-4 font-bold leading-tight uppercase text-xs opacity-60">Đối tác</h6>
                        </li>
                        <li>
                            <a href={`#`} className={`flex items-center py-2.5 px-4 text-base font-normal text-dark-500 rounded-lg hover:bg-gray-200 group  transition-all duration-200`}>
                                <div className={`bg-white shadow-lg shadow-gray-300 text-dark-700 w-8 h-8 mr-1 rounded-lg text-center grid place-items-center`}>
                                    <MdOutlineWarehouse className={`w-[20px] h-[20px]`}/>
                                </div>
                                <span className={`ml-3 text-dark-500 text-sm font-medium`}>Nhà xe</span>
                            </a>
                        </li>
                        <li>
                            <a href={`#`} className={`flex items-center py-2.5 px-4 text-base font-normal text-dark-500 rounded-lg hover:bg-gray-200 group  transition-all duration-200`}>
                                <div className={`bg-white shadow-lg shadow-gray-300 text-dark-700 w-8 h-8 mr-1 rounded-lg text-center grid place-items-center`}>
                                    <TbBus className={`w-[20px] h-[20px]`}/>
                                </div>
                                <span className={`ml-3 text-dark-500 text-sm font-medium`}>Xe</span>
                            </a>
                        </li>
                        <li>
                            <a href={`#`} className={`flex items-center py-2.5 px-4 text-base font-normal text-dark-500 rounded-lg hover:bg-gray-200 group  transition-all duration-200`}>
                                <div className={`bg-white shadow-lg shadow-gray-300 text-dark-700 w-8 h-8 mr-1 rounded-lg text-center grid place-items-center`}>
                                    <AiOutlineLike className={`w-[20px] h-[20px]`}/>
                                </div>
                                <span className={`ml-3 text-dark-500 text-sm font-medium`}>Tiện ích</span>
                            </a>
                        </li>
                        <li>
                            <a href={`#`} className={`flex items-center py-2.5 px-4 text-base font-normal text-dark-500 rounded-lg hover:bg-gray-200 group  transition-all duration-200`}>
                                <div className={`bg-white shadow-lg shadow-gray-300 text-dark-700 w-8 h-8 mr-1 rounded-lg text-center grid place-items-center`}>
                                    <TbRoad className={`w-[20px] h-[20px]`}/>
                                </div>
                                <span className={`ml-3 text-dark-500 text-sm font-medium`}>Tuyến đường</span>
                            </a>
                        </li>
                        <li>
                            <a href={`#`} className={`flex items-center py-2.5 px-4 text-base font-normal text-dark-500 rounded-lg hover:bg-gray-200 group  transition-all duration-200`}>
                                <div className={`bg-white shadow-lg shadow-gray-300 text-dark-700 w-8 h-8 mr-1 rounded-lg text-center grid place-items-center`}>
                                    <HiOutlineTicket className={`w-[20px] h-[20px]`}/>
                                </div>
                                <span className={`ml-3 text-dark-500 text-sm font-medium`}>Vé</span>
                            </a>
                        </li>
                        <li className="w-full mt-4 mb-3">
                            <h6 className="pl-4 font-bold leading-tight uppercase text-xs opacity-60">Web</h6>
                        </li>
                        <li>
                            <a href={`#`} className={`flex items-center py-2.5 px-4 text-base font-normal text-dark-500 rounded-lg hover:bg-gray-200 group  transition-all duration-200`}>
                                <div className={`bg-white shadow-lg shadow-gray-300 text-dark-700 w-8 h-8 mr-1 rounded-lg text-center grid place-items-center`}>
                                    <GrServices className={`w-[20px] h-[20px]`}/>
                                </div>
                                <span className={`ml-3 text-dark-500 text-sm font-medium`}>Cài đặt</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;