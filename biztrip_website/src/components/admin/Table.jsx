import React from 'react';
import {FaPencilAlt, FaSort, FaTrashAlt} from "react-icons/all.js";
import {Link} from "react-router-dom";

const Table = ({theadData, tbodyData}) => {
    return (
        <table className={`w-full text-sm text-left text-gray-500 dark:text-gray-400`}>
            <thead className={`text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400`}>
            <tr>
                {
                    theadData.map((item, index) => {
                        return (
                            <th key={`th-${index}`} scope={`col`} className={`px-6 py-3 w-[${item?.width}]`}
                                title={item.name}>
                                <div className={`flex items-center`}>
                                    {item.name}
                                    <a href="#">
                                        <FaSort className={`w-3 h-3 ml-1`}/>
                                    </a>
                                </div>
                            </th>
                        )
                    })
                }
            </tr>
            </thead>
            <tbody>
            {
                tbodyData.map((data, index) => {
                    return (
                        <tr key={`tr-${index}`}
                            className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600`}>
                            {
                                data.items.map((item, index) => {
                                    return (
                                        <td key={`td-${index}`} className={`px-6 py-3 w-[${item?.width}]`}></td>
                                    )
                                })
                            }
                            <td className="px-6 py-3">
                                <div className={`flex items-center`}>
                                    {
                                        data.actions.map((action, index) => {
                                            return (
                                                <div key={`td-${index}`}
                                                     className={`cursor-pointer inline-flex items-center justify-center text-center text-white duration-300 p-2 rounded ${action === 'edit' ? 'hover:bg-primaryColor bg-primaryColor_hover mr-3' : action === 'delete' ? 'hover:bg-dangerColor-default_3 bg-dangerColor-default_2' : 'mr-3'}`}>
                                                    {
                                                        action === 'edit' ?
                                                            <Link to={``} state={{id: data?.id}}>
                                                                <FaPencilAlt className={`w-5 h-5`}/>
                                                            </Link> :
                                                            <button onClick={() => data.handleDelete(data.id)}>
                                                                <FaTrashAlt className={`w-5 h-5`}/>
                                                            </button>
                                                    }
                                                </div>
                                            )
                                        })
                                    }
                                </div>

                            </td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    );
};

export default Table;