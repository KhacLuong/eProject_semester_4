import React from 'react';
import {FaPencilAlt, FaSort, FaTrashAlt} from "react-icons/all.js";
import {useNavigate} from "react-router-dom";
import {AiFillEye} from "react-icons/ai";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import SyncLoader from "react-spinners/SyncLoader";
import ReactTyped from "react-typed";

const Table = ({
                   theadData,
                   tbodyData,
                   tbodyAction,
                   fetchDelete,
                   status,
                   setSortField,
                   setSortDir,
                   firstItemPerPage
               }) => {
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal)
    const dispatch = useDispatch()
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
                const res = await dispatch(fetchDelete({id})).unwrap()
                if (res) {
                    if (res.code === 200) {
                        toast.success(res.message)
                    } else {
                        toast.error(res.message)
                    }
                }
            }
        })
    }
    const handleFilter = (e, name) => {
        e.preventDefault()
        setSortField(name)
        setSortDir((sortDir) => sortDir === 'desc' ? 'asc' : 'desc')
    }
    const handleEdit = (id) => {
        navigate('edit', {
            state: {
                id: id
            }
        })
    }
    return (
        <div className={`flex flex-col my-6 mx-4 rounded-2xl shadow-xl shadow-gray-200`}>
            <div className={`overflow-x-auto rounded-2xl`}>
                <div className={`inline-block min-w-full align-middle`}>
                    <div className={`overflow-hidden shadow-lg`}>
                        <table className={`w-full text-sm text-left text-gray-500`}>
                            <thead
                                className={`text-xs text-gray-700 capitalize bg-gray-50`}>
                            <tr>
                                {
                                    theadData.map((item, index) => {
                                        if (typeof item === "object") {
                                            return (
                                                <th key={`th-${index}`} scope={`col`} className={`px-6 py-3`}
                                                    title={item.field}>
                                                    <div className={`flex items-center`}>
                                                        {item.name}
                                                        <div className={`flex items-center`}>
                                                            <button onClick={(e) => handleFilter(e, item.field)}>
                                                                <FaSort className={`w-3 h-3 ml-1`}/>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </th>
                                            )
                                        }
                                        return (
                                            <th key={`th-${index}`} scope={`col`} className={`px-6 py-3`}
                                                title={item}>
                                                <div className={`flex items-center`}>
                                                    {item}
                                                </div>
                                            </th>
                                        )
                                    })
                                }
                            </tr>
                            </thead>
                            <tbody>
                            {
                                status === "loading" ?
                                    <tr className={`w-full relative`}>
                                        <td colSpan={theadData.length}
                                            className={`text-center align-middle w-full  py-8`}>
                                            <SyncLoader loading={true} color="#374151"
                                                        className={`absolute left-1/2 -translate-y-1/2`}/>
                                        </td>
                                    </tr> :
                                    tbodyData && tbodyData.length > 0 ?
                                        tbodyData.map((data, index) => {
                                            return (
                                                <tr key={`tr-${index}`}
                                                    className={`bg-white border-b hover:bg-gray-50`}>
                                                    <td className="px-6 py-3">{firstItemPerPage++}</td>
                                                    {
                                                        data && data.items ?
                                                            data.items.map((item, index) => {
                                                                if (typeof item === "string") {
                                                                    return (
                                                                        <td key={`td-${index}`}
                                                                            className={`px-6 py-3`}>{item}</td>
                                                                    )
                                                                } else if (typeof item === "boolean") {
                                                                    return item === true ?
                                                                        <td key={`td-${index}`}
                                                                            className={`px-6 py-3 text-successColor`}>Active</td> :
                                                                        <td key={`td-${index}`}
                                                                            className={`px-6 py-3 text-dangerColor-default_2`}>Disable</td>
                                                                } else {
                                                                    if (item?.content) {
                                                                        return (<td key={`td-${index}`}
                                                                                    className={`px-6 py-3 w-80 text-justify`}>
                                                                                {item.content}
                                                                            </td>
                                                                        )
                                                                    }
                                                                    return <td key={`td-${index}`}
                                                                               className={`px-6 py-3 w-24`}>
                                                                        <img src={item?.imagePath} alt={item?.imgName}
                                                                             className={`aspect-square object-cover`}/>
                                                                    </td>
                                                                }
                                                            })
                                                            :
                                                            <></>
                                                    }
                                                    <td className="px-6 py-3">
                                                        <div className={`flex items-center`}>
                                                            {
                                                                tbodyAction.map((action, index) => {
                                                                    return (
                                                                        <div key={`td-${index}`}
                                                                             className={`cursor-pointer inline-flex items-center justify-center text-center text-white duration-300 p-2 rounded ${action === 'edit' ? 'bg-primaryColor hover:bg-primaryColor_hover mr-3' : action === 'delete' ? 'hover:bg-dangerColor-default_3 bg-dangerColor-default_2' : 'mr-3 bg-amber-400 hover:bg-amber-500'}`}>
                                                                            {
                                                                                action === 'edit' ?
                                                                                    <button
                                                                                        onClick={() => handleEdit(data?.id)}>
                                                                                        <FaPencilAlt
                                                                                            className={`w-5 h-5`}/>
                                                                                    </button> :
                                                                                    action === 'view' ?
                                                                                        <button>
                                                                                            <AiFillEye
                                                                                                className={`w-5 h-5`}/>
                                                                                        </button> :
                                                                                        <button
                                                                                            onClick={() => handleDelete(data?.id)}>
                                                                                            <FaTrashAlt
                                                                                                className={`w-5 h-5`}/>
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
                                        }) :
                                        <tr>
                                            <td colSpan={theadData.length}
                                                className={`text-center py-8 text-dangerColor-default_2 text-base font-semibold`}>
                                                Chưa có dữ liệu<ReactTyped
                                                loop
                                                typeSpeed={300}
                                                backSpeed={50}
                                                strings={["...!"]}
                                                smartBackspace
                                                shuffle={false}
                                                backDelay={1}
                                                fadeOut={false}
                                                fadeOutDelay={100}
                                                loopCount={0}
                                                showCursor
                                                cursorChar="|"
                                            />
                                            </td>
                                        </tr>
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