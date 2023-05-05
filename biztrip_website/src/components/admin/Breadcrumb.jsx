import React from 'react';
import {Link} from "react-router-dom";
import {RiArrowRightSLine} from "react-icons/all.js";
import {HiHome} from "react-icons/hi2"
const Breadcrumb = ({dataBreadcrumb}) => {
    return (
        <nav className={`flex mb-5`}>
            <ol className={`inline-flex items-center space-x-1 md:space-x-2`}>
                {
                    dataBreadcrumb.map((item, index) => {
                        return (
                            <li key={`breadcrumb-${index}`} className={index === 0 ? 'inline-flex items-center' : ''}>
                                {
                                    index === 0 ?
                                        <Link to={item.path}
                                              className={`inline-flex items-center text-gray-700 hover:text-gray-900`}>
                                            <HiHome className={`w-5 h-5 mr-2.5`}/>
                                            {item.name}
                                        </Link> :
                                        <div className={`flex items-center`}>
                                            <RiArrowRightSLine className={`w-6 h-6 text-gray-400`}/>
                                            {
                                                index + 1 === dataBreadcrumb.length ?
                                                    <span
                                                        className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">{item.name}</span> :
                                                    <Link to={item.path}
                                                          className={`ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2`}>{item.name}</Link>
                                            }
                                        </div>
                                }
                            </li>
                        )
                    })
                }
            </ol>
        </nav>
    );
};

export default Breadcrumb;