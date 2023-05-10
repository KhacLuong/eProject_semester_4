import React from 'react';
import {FaPencilAlt, FaSort, FaTrashAlt} from "react-icons/all.js";
import {Link} from "react-router-dom";
import {AiFillEye} from "react-icons/ai";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {toast} from "react-toastify";

const Table = ({theadData, tbodyData, tbodyAction, fetchDelete, fetchList}) => {
    const MySwal = withReactContent(Swal)
    const handleDelete = async (id) => {
        MySwal.fire({
            title: 'Bạn có chắc chắn không?',
            text: "Nếu xác nhận, Bạn sẽ không thể khôi phục dữ liệu này!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#057a55',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xác nhận!',
            cancelButtonText: 'Hủy'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await fetchDelete(id)
                if (res && res.code === '200') {
                    toast.success(res.message)
                    await fetchList()
                }
            }
        })
    }
    const handleEdit = async (id) => {

    }
    return (
        <div className={`flex flex-col my-6 mx-4 rounded-2xl shadow-xl shadow-gray-200`}>
            <div className={`overflow-x-auto rounded-2xl`}>
                <div className={`inline-block min-w-full align-middle`}>
                    <div className={`overflow-hidden shadow-lg`}>
                        <table className={`w-full text-sm text-left text-gray-500 dark:text-gray-400`}>
                            <thead
                                className={`text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400`}>
                            <tr>
                                {
                                    theadData.map((item, index) => {
                                        return (
                                            <th key={`th-${index}`} scope={`col`} className={`px-6 py-3`}
                                                title={item}>
                                                <div className={`flex items-center`}>
                                                    {item}
                                                    <div className={`flex items-center`}>
                                                        {item.name}
                                                        <a href="#">
                                                            <FaSort className={`w-3 h-3 ml-1`}/>
                                                        </a>
                                                    </div>
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
                                            <td className="px-6 py-3">{index + 1}</td>
                                            {
                                                data.items.map((item, index) => {
                                                    if (typeof item === "string") {
                                                        switch (item.toLowerCase()) {
                                                            case "active":
                                                                return (
                                                                    <td key={`td-${index}`}
                                                                        className={`px-6 py-3 text-successColor`}>{item}</td>
                                                                )
                                                            case "disable":
                                                                return (
                                                                    <td key={`td-${index}`}
                                                                        className={`px-6 py-3 text-dangerColor-default_2`}>{item}</td>
                                                                )
                                                            default:
                                                                return (
                                                                    <td key={`td-${index}`}
                                                                        className={`px-6 py-3`}>{item}</td>
                                                                )
                                                        }
                                                    } else {
                                                        if (item.iconName) {
                                                            const Icon = item.iconName
                                                            return <td key={`td-${index}`} className={`px-6 py-3`}>
                                                                <div
                                                                    className={`rounded-lg p-2 bg-primaryColor inline-block text-white`}>
                                                                    <Icon className={`w-8 h-8`}/>
                                                                </div>
                                                            </td>
                                                        } else if (item.content) {
                                                            return (<td key={`td-${index}`}
                                                                        className={`px-6 py-3 w-96 text-justify`}>
                                                                    {item.content}
                                                                </td>
                                                            )
                                                        }
                                                        return <td key={`td-${index}`} className={`px-6 py-3 w-44`}>
                                                            <img src={item.imgPath} alt={item.imgName}
                                                                 className={`aspect-square object-cover`}/>
                                                        </td>
                                                    }
                                                })
                                            }
                                            <td className="px-6 py-3">
                                                <div className={`flex items-center`}>
                                                    {
                                                        tbodyAction.map((action, index) => {
                                                            return (
                                                                <div key={`td-${index}`}
                                                                     className={`cursor-pointer inline-flex items-center justify-center text-center text-white duration-300 p-2 rounded ${action === 'edit' ? 'hover:bg-primaryColor bg-primaryColor_hover mr-3' : action === 'delete' ? 'hover:bg-dangerColor-default_3 bg-dangerColor-default_2' : 'mr-3 bg-amber-400 hover:bg-amber-500'}`}>
                                                                    {
                                                                        action === 'edit' ?
                                                                            <Link to={``} state={{id: data?.id}}>
                                                                                <FaPencilAlt className={`w-5 h-5`}/>
                                                                            </Link> :
                                                                            action === 'view' ?
                                                                                <button>
                                                                                    <AiFillEye className={`w-5 h-5`}/>
                                                                                </button> :
                                                                                <button
                                                                                    onClick={() => handleDelete(data?.id)}>
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Table;