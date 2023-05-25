import React, {useEffect, useRef, useState} from 'react';
import {
    AiOutlineDelete,
    BiPlus,
    BiSelectMultiple, RiImageAddLine,
    MdKeyboardDoubleArrowUp,
    MdOutlineEdit, MdOutlineCancelPresentation,
} from "react-icons/all.js";
import img1 from "../../assets/image/lazycat_code-01.png"
import img2 from "../../assets/image/space_man.jpg"
import img3 from "../../assets/image/travel.jpg"

const CoachThumbnail = () => {
    const thumbRef = useRef()
    const [showManageThumbnail, setShowManageThumbnail] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [isSelectAll, setIsSelectAll] = useState(false)
    const [countThumbnail, setCountThumbnail] = useState(0)
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState("")
    const [data, setData] = useState([
        {
            id: 1,
            img: img1,
            description: "askj asdjkl; asdklj daskld asbre"
        },
        {
            id: 2,
            img: img2,
            description: "askj asdjkl; asdklj daskld asbre"
        },
        {
            id: 3,
            img: img3,
            description: "askj asdjkl; asdklj daskld asbre"
        },
        {
            id: 4,
            img: img2,
            description: "askj asdjkl; asdklj daskld asbre"
        },
        {
            id: 5,
            img: img1,
            description: "askj asdjkl; asdklj daskld asbre"
        },
        {
            id: 6,
            img: img3,
            description: "askj asdjkl; asdklj daskld asbre"
        },
        {
            id: 7,
            img: img1,
            description: "askj asdjkl; asdklj daskld asbre"
        },
    ]);
    useEffect(() => {
        const count = data.reduce(
            (count, item) => (item.checked ? count + 1 : count),
            0
        );
        setCountThumbnail(count);
    }, [data])
    const handleOpenAddThumbnail = (e) => {
        e.preventDefault()
        setData((prevData) =>
            prevData.map((item) => ({
                ...item,
                checked: false,
                editing: false,
            }))
        );
        setShowModal((showModal) => !showModal)
        setShowManageThumbnail(false)
    }
    const handleOpenManageThumbnail = (e) => {
        e.preventDefault()
        setImage(null);
        if (thumbRef.current?.value) {
            thumbRef.current.value = null;
        }
        setShowManageThumbnail((showManageThumbnail) => !showManageThumbnail)
        setShowModal(false)
    }
    const handleSelectAllThumbnail = (e) => {
        e.preventDefault()
        setIsSelectAll((isSelectAll) => !isSelectAll)
        setData((prevData) =>
            prevData.map((item) => ({
                ...item,
                checked: !isSelectAll,
                editing: !isSelectAll,
            }))
        );
    }
    const handleCheckboxChange = (e, index) => {
        const {checked} = e.target;
        setIsSelectAll(false)
        setData((prevData) =>
            prevData.map((item, i) => {
                if (i === index) {
                    return {
                        ...item,
                        checked,
                        editing: checked,
                    };
                }
                return item;
            })
        );
    };
    const handleEditDescription = (index, newDescription) => {
        setData((prevData) =>
            prevData.map((item, i) => {
                if (i === index) {
                    return {
                        ...item,
                        description: newDescription,
                    };
                }
                return item;
            })
        );
    };
    const handleAddThumbnail = (e) => {
        e.preventDefault()
        const newImage = {
            img: window.URL.createObjectURL(image),
            description: description,
        };
        setData((prevData) => [...prevData, newImage]);
        setImage(null);
        thumbRef.current.value = null;
        setShowModal(false)
    }
    const handleUpdateThumbnail = (e) => {
        e.preventDefault()
        // setShowManageThumbnail(false)
        // setCountThumbnail(0)
        return data.filter((item) => item.checked);
    }
    const handleRemoveThumbnail = (e) => {
        e.preventDefault()
        // setShowManageThumbnail(false)
        // setCountThumbnail(0)
        const checkedData = data.filter((item) => item.checked);
        return checkedData.map((item) => item.id);
    }
    return (
        <>
            <div className={`overflow-x-auto`}>
                <div className={`inline-block min-w-full align-middle`}>
                    <div className={`overflow-hidden my-4`}>
                        <div className={`mb-6 flex items-center justify-end`}>
                            <div className={`flex items-centers justify-center mr-4`}>
                                <button onClick={handleOpenAddThumbnail}
                                        className={`inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-successColor hover:bg-successColor_hover sm:ml-auto shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform duration-300`}>
                                    <BiPlus className={`mr-2 -ml-1 w-4 h-4`}/>
                                    Thêm ảnh
                                </button>
                            </div>
                            <div className={`flex items-centers justify-center mr-2`}>
                                <button onClick={handleOpenManageThumbnail}
                                        className={`inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-primaryColor hover:bg-primaryColor_hover sm:ml-auto shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform duration-300`}>
                                    <MdKeyboardDoubleArrowUp
                                        className={`mr-2 -ml-1 w-4 h-4 transition-transform duration-300 ${showManageThumbnail ? 'rotate-x-180' : ''}`}/>
                                    Quản lý ảnh
                                </button>
                            </div>
                        </div>
                        {
                            showModal
                                ? <div className={`h-max w-full bg-gray-200 p-4 mb-4 rounded-lg relative`}>
                                    <span
                                        className={`absolute w-4 h-4 bg-gray-200 -top-2 right-44 rotate-45 border-b-0 border-r-0`}></span>
                                    <label className="block mb-2 ml-1.5 text-sm font-medium text-gray-900"
                                           htmlFor="file_input">Tải ảnh lên</label>
                                    <input ref={thumbRef}
                                           onChange={(e) => setImage(e.target.files[0])}
                                           className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                                           aria-describedby="file_input_help" id="file_input" type="file"/>
                                    <p className="mt-1 ml-1.5 text-xs text-gray-500"
                                       id="file_input_help">SVG, PNG, JPG (MAX. 6MB)</p>
                                    <div className={`mt-4`}>
                                        <label htmlFor="description"
                                               className="block mb-2 ml-1.5 text-sm font-medium text-gray-900">
                                            Miêu tả
                                        </label>
                                        <textarea id="description"
                                                  rows="4"
                                                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 resize-none"
                                                  onChange={(e) => setDescription(e.target.value)}></textarea>
                                    </div>
                                    <div className={`flex items-center justify-end mt-4`}>
                                        <button onClick={handleAddThumbnail}
                                                className={`inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-primaryColor hover:bg-primaryColor_hover sm:ml-auto shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform duration-300`}>
                                            <RiImageAddLine className={`mr-2 -ml-1 w-4 h-4`}/>
                                            Xác nhận
                                        </button>
                                    </div>
                                </div>
                                : null
                        }
                        {
                            showManageThumbnail
                                ? <div className={`h-max w-full bg-gray-200 p-4 mb-4 rounded-lg relative`}>
                                    <span
                                        className={`absolute w-4 h-4 bg-gray-200 -top-2 right-12 rotate-45 border-b-0 border-r-0`}></span>
                                    <div className={`flex items-center justify-end`}>
                                        <div className={`flex items-centers justify-center mr-4`}>
                                            <button onClick={handleSelectAllThumbnail}
                                                    className={`inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-amber-400 hover:bg-amber-500 sm:ml-auto shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform duration-300`}>

                                                {
                                                    +countThumbnail === +data.length
                                                        ? <>
                                                            <MdOutlineCancelPresentation className={`mr-2 -ml-1 w-4 h-4`}/>
                                                            <span>Bỏ chọn tất cả</span>
                                                        </>
                                                        : <>
                                                            <BiSelectMultiple className={`mr-2 -ml-1 w-4 h-4`}/>
                                                            <span>Chọn tất cả</span>
                                                        </>
                                                }
                                            </button>
                                        </div>
                                        <div className={`flex items-centers justify-center mr-4`}>
                                            <button onClick={(e) => console.log(handleUpdateThumbnail(e))}
                                                    className={`inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white rounded-lg sm:ml-auto shadow-md shadow-gray-300 transition-transform duration-300 ${countThumbnail === 0 ? 'bg-gray-400' : 'hover:scale-[1.02] bg-primaryColor hover:bg-primaryColor_hover'}`}>
                                                <MdOutlineEdit className={`mr-2 -ml-1 w-4 h-4`}/>
                                                Cập nhật {countThumbnail > 0 ? countThumbnail : ''} ảnh
                                            </button>
                                        </div>
                                        <div className={`flex items-centers justify-center`}>
                                            <button onClick={(e) => console.log(handleRemoveThumbnail(e))}
                                                    className={`inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white rounded-lg sm:ml-auto shadow-md shadow-gray-300 transition-transform duration-300 ${countThumbnail === 0 ? 'bg-gray-400' : 'bg-dangerColor-default_2 hover:bg-dangerColor-hover_2  hover:scale-[1.02]'}`}
                                                    disabled={countThumbnail === 0}>
                                                <AiOutlineDelete className={`mr-2 -ml-1 w-4 h-4`}/>
                                                Xóa {countThumbnail > 0 ? countThumbnail : ''} ảnh
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                : null
                        }
                    </div>
                    <div className={`w-full grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-4`}>
                        {
                            data.map((item, index) => {
                                return (
                                    <div key={index} className={`grid-cols-1 w-full h-72 shadow-lg p-4 rounded-md`}>

                                        <div className={`relative h-5/6 w-full`}>
                                            {
                                                showManageThumbnail
                                                    ? <input type={`checkbox`}
                                                             checked={item.checked || false}
                                                             onChange={(e) => handleCheckboxChange(e, index)}
                                                             className={`absolute top-2 right-2 cursor-pointer`}/>
                                                    : null
                                            }
                                            <img src={item.img} alt={``} className={`w-full h-full object-cover`}/>
                                        </div>
                                        <div className={`h-1/6 w-full`}>
                                            {item.editing ? (
                                                <input className={`mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full h-full`}
                                                       type="text"
                                                       value={item.description}
                                                       onChange={(e) =>
                                                           handleEditDescription(index, e.target.value)
                                                       }
                                                />
                                            ) : (
                                                <p title={item.description} className={`mt-2 line-clamp-2`}>{item.description}</p>
                                            )}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default CoachThumbnail;