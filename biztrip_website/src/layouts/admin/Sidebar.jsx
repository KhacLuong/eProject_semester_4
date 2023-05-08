import React from 'react';
import {Link} from "react-router-dom";
import {dataSidebarAdmin} from "../../utils/data.jsx";

const Sidebar = () => {
    return (
        <div className={`flex relative flex-col flex-1 pt-0 min-h-0 bg-gray-50`}>
            <div className={`flex overflow-y-auto flex-col flex-1 pt-8 pb-4`}>
                <div className={`flex-1 px-3 bg-gray-50`} id={`sidebar-items`}>
                    <ul className={`pb-2 pt-1`}>
                        {
                            dataSidebarAdmin.map((item, index) => {
                                const Icon = item.icon
                                if (item.isSubcategory) {
                                    return (
                                        <li key={`navbar-item-${index}`}>
                                            <Link to={item.url} className={`flex items-center py-2.5 px-4 text-base font-normal text-dark-500 rounded-lg hover:bg-gray-200 group  transition-all duration-200`}>
                                                <div className={`bg-white shadow-lg shadow-gray-300 text-dark-700 w-8 h-8 mr-1 rounded-lg text-center grid place-items-center`}>
                                                    <Icon className={`w-[20px] h-[20px]`}/>
                                                </div>
                                                <span className={`ml-3 text-dark-500 text-sm font-medium`}>{item.name}</span>
                                            </Link>
                                        </li>
                                    )
                                } else {
                                    return (
                                        <li key={`navbar-item-${index}`} className="w-full mt-4 mb-3">
                                            <h6 className="pl-4 font-bold leading-tight uppercase text-xs opacity-60">{item.name}</h6>
                                        </li>
                                    )
                                }
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;