import React, {useEffect, useState} from 'react';
import {NavLink, useLocation } from "react-router-dom";
import {
    AiOutlineMinus,
    AiOutlinePlus,
    MdOutlineKeyboardDoubleArrowRight
} from "react-icons/all.js";


const ElementSidebar = ({item, Icon}) => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const isChildPage = location.pathname.startsWith(`/admin/v1/${item.key}`);
        setIsOpen(isChildPage);
    }, [location]);
    const toggleMenu = () => {
        setIsOpen((isOpen) => !isOpen)
    }
    return (
        <>
            {
                item.url ?
                    <NavLink to={item.url}
                             className={({isActive}) => `${isActive ? 'text-primaryColor' : 'text-black'} flex justify-between items-center py-2.5 px-4 text-base font-normal rounded-lg hover:bg-gray-200 group transition-all duration-300`}>
                        <div className={`flex items-center`}>
                            <div
                                className={`bg-white shadow-lg shadow-gray-300 text-dark-700 w-8 h-8 mr-1 rounded-lg text-center grid place-items-center`}>
                                <Icon className={`w-[20px] h-[20px]`}/>
                            </div>
                            <span className={`ml-3 text-dark-500 text-sm font-medium`}>
                                {item.name}
                            </span>
                        </div>
                        {
                            item.key
                                ? <span
                                    className={`text-sm bg-dangerColor-hover_2 rounded-md w-6 h-6 flex items-center justify-center text-white font-semibold`}>20</span>
                                : <></>
                        }
                    </NavLink> :
                    <div onClick={toggleMenu}
                         className={`flex justify-between items-center py-2.5 px-4 text-base font-normal rounded-lg hover:bg-gray-200 group transition-all duration-300 text-black cursor-pointer`}>
                        <div className={`flex items-center`}>
                            <div
                                className={`bg-white shadow-lg shadow-gray-300 text-dark-700 w-8 h-8 mr-1 rounded-lg text-center grid place-items-center`}>
                                <Icon className={`w-[20px] h-[20px]`}/>
                            </div>
                            <span className={`ml-3 text-dark-500 text-sm font-medium`}>
                                {item.name}
                            </span>
                        </div>
                        <span>
                              {
                                  isOpen
                                      ? <AiOutlineMinus></AiOutlineMinus>
                                      : <AiOutlinePlus></AiOutlinePlus>
                              }
                        </span>
                    </div>

            }
            {
                item.children && item.children.length > 0 ?
                    <ul className={`${isOpen ? 'max-h-96 visible' : 'max-h-0 invisible'} py-2 space-y-2 transition-all duration-500 ease-in-out overflow-hidden`}>
                        {
                            item.children.map((childrenItem, key) => {
                                return (
                                    <li key={key}>
                                        <NavLink to={childrenItem.url}
                                                 className={({isActive}) => `${isActive ? 'text-primaryColor' : 'text-black'} flex items-center w-full p-2 transition duration-300 pl-11 group text-sm`}>
                                            <MdOutlineKeyboardDoubleArrowRight className={`mr-2 w-4 h-4`}/> {childrenItem.name}
                                        </NavLink>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    :
                    <></>
            }
        </>
    );
};

export default ElementSidebar;