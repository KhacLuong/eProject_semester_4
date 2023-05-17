import React, {useEffect, useRef, useState} from 'react';
import Breadcrumb from "../../../components/admin/Breadcrumb.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import useDocumentTitle from "../../../hooks/useDocumentTitle.jsx";
import image_add from "../../../assets/image/image_add.png";
import {handleChangeImage, handleOpenFileInput} from "../../../utils/helper.jsx";
import {message} from "../../../utils/message.jsx";
import {useDispatch, useSelector} from 'react-redux'
import {fetchCreateFile} from "../../../redux/slices/fileSlice.jsx";
import moment from "moment";
import {fetchGetUtilityById, fetchSaveUtility} from "../../../redux/slices/utilitySlice.jsx";
import {toast} from "react-toastify";
import {utilityFormBreadcrumb} from "../../../utils/data.jsx";

const UtilityForm = () => {
    useDocumentTitle("Thêm mới tiện ích", true)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const id = useLocation().state?.id
    const statusState = useSelector((state) => state.utility.status)
    const inputImageRef = useRef(null);
    const [imageDefault, setImageDefault] = useState(image_add)
    const [imageName, setImageName] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [status, setStatus] = useState(2)
    const [createdAt, setCreatedAt] = useState("")
    const [errTitle, setErrTitle] = useState("")
    const [errStatus, setErrStatus] = useState("")
    const [errImage, setErrImage] = useState("")
    const [disableButton, setDisableButton] = useState(false)
    useEffect(() => {
        if (id) {
            const test = async () => {
                const res = await dispatch(fetchGetUtilityById({id})).unwrap()
                if (res && res.code === 200) {
                    setTitle(res.data.title)
                    setDescription(res.data.description)
                    setStatus(res.data.status === true ? 1 : 0)
                    setImageDefault(res.data.imagePath)
                    setCreatedAt(res.data.createdAt)
                }
            }
            test()
        }
    }, [id])
    useEffect(() => {
        if (statusState === 'succeeded') {
            setDisableButton(false)
        }
    }, [statusState])

    const handleValidate = () => {
        if (title === "") {
            setErrTitle(message.error.title.isEmpty)
            return false
        } else if (status === 2) {
            setErrStatus(message.error.status.isEmpty)
            return false
        } else if (imageDefault === "") {
            setErrImage(message.error.file.isEmpty)
            return false
        } else if (imageName.size / 1024 > 6144) {
            setErrImage(message.error.file.max)
            return false
        }
        return true
    }
    const handleSubmitForm = async (e) => {
        e.preventDefault()
        setDisableButton(true)
        const dataUtility = {
            'title': title,
            'description': description,
            'status': status,
        }
        const containerName = 'utilities'
        let imagePath = ""

        if (!handleValidate()) {
            setDisableButton(false)
            return
        }
        if (imageDefault) {
            if (imageName) {
                const data = new FormData()
                data.append('file', imageName)
                const uploadFile = await dispatch(fetchCreateFile({data, containerName})).unwrap()
                if (uploadFile && uploadFile.code === 200) {
                    imagePath = uploadFile.data
                    setImageDefault(imagePath)
                }
            }
        } else {
            setDisableButton(false)
            setErrImage(message.error.file.isEmpty)
            return
        }
        if (id) {
            dataUtility.id = id
            dataUtility.createdAt = createdAt
            dataUtility.imagePath = imageName ? imagePath : imageDefault
            dataUtility.updatedAt = moment(new Date()).format()
        } else {
            const createdAt = moment(new Date()).format()
            dataUtility.id = ''
            dataUtility.imagePath = imagePath
            dataUtility.createdAt = createdAt
            dataUtility.updatedAt = createdAt
        }
        await dispatch(fetchSaveUtility({dataUtility, navigate, toast}))
    }
    const handleResetForm = () => {
        setTitle("")
        setDescription("")
        setImageName("")
        setCreatedAt("")
        setStatus(2)
        setImageDefault(image_add)
        setErrStatus("")
        setErrTitle("")
        setErrImage("")
        setDisableButton(false)
    }
    const handleOnChangeTitle = (e) => {
        setTitle(e.target.value)
        setErrTitle("")
    }
    const handleOnChangeStatus = (e) => {
        setStatus(+e.target.value)
        setErrStatus("")
    }

    return (
        <>
            <div data-aos="fade-up"
                 data-aos-delay="100"
                 className={`flex flex-col p-4 mx-4 mt-4 mb-6 rounded-2xl shadow-xl shadow-gray-200`}>
                <Breadcrumb dataBreadcrumb={utilityFormBreadcrumb}/>
                <h1 className={`text-xl font-semibold text-gray-900 sm:text-2xl`}>Thêm mới tiện ích</h1>
            </div>
            <div data-aos="fade-right"
                 data-aos-delay="300"
                 className={`flex flex-col p-4 my-4 mx-4 rounded-2xl shadow-xl shadow-gray-200`}>
                <form className={``}>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="w-full">
                            <div className={`group relative z-0 w-full mb-6`}>
                                <input type="text"
                                       name="title"
                                       id="title"
                                       className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                       placeholder=" "
                                       autoComplete={`off`}
                                       required
                                       onChange={(e) => handleOnChangeTitle(e)}
                                       defaultValue={title ? title : ''}/>
                                <label htmlFor="title"
                                       className="peer-focus:font-medium absolute text-sm text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Tiêu đề
                                </label>
                                {
                                    errTitle && errTitle.length > 0 ?
                                        <span
                                            className={`text-dangerColor-default_2 text-sm font-medium`}>
                                            {errTitle}
                                        </span> :
                                        <></>
                                }
                            </div>
                            <div className={`group relative z-0 w-full mb-6`}>
                                <textarea required
                                          autoComplete={`off`}
                                          name="description"
                                          id="description"
                                          placeholder={" "}
                                          value={description ? description : ""}
                                          onChange={(e) => setDescription(e.target.value)}
                                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer resize-none h-44">{description ? description : ''}</textarea>
                                <label htmlFor="description"
                                       className="peer-focus:font-medium absolute text-sm text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Miêu tả <span className={`text-lightColor`}>(Optional)</span>
                                </label>
                            </div>
                            <div className={`group relative z-0 w-full mb-6`}>
                                <label htmlFor="stauts"
                                       className="block mb-2 text-sm font-medium text-gray-900">
                                    Lựa chọn trạng thái
                                </label>
                                <select id="stauts"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        value={status}
                                        onChange={(e) => handleOnChangeStatus(e)}>
                                    <option value={2}>-- Chọn --</option>
                                    <option value={0}>Disable</option>
                                    <option value={1}>Active</option>
                                </select>
                                {
                                    errStatus && errStatus.length > 0 ?
                                        <span
                                            className={`text-dangerColor-default_2 text-sm font-medium`}>
                                            {errStatus}
                                        </span> :
                                        <></>
                                }
                            </div>
                            <div className={`flex items-center justify-end`}>
                                <button disabled={disableButton} onClick={handleSubmitForm}
                                        type="submit"
                                        className="duration-300 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                                    {id ? 'Cập nhật' : 'Tạo'}
                                </button>
                                {
                                    !id ?
                                        <button onClick={handleResetForm}
                                                type="reset"
                                                className="ml-4 duration-300 bg-gray-100 text-gray-400 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Reset
                                        </button> :
                                        <></>
                                }

                            </div>
                        </div>
                        <div className={`col-span-1 h-full w-full`}>
                            <input className={`hidden`}
                                   onChange={(e) => handleChangeImage(e, setImageDefault, setImageName, setErrImage)}
                                   accept="image/png"
                                   ref={inputImageRef}
                                   type={`file`}/>
                            <div className={`flex items-center justify-center cursor-pointer`}>
                                <img style={{
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    objectFit: "cover"
                                }}
                                     className="aspect-square rounded-full w-1/3 h-1/3 bg-gray-50 shadow-xl shadow-gray-200"
                                     src={imageDefault}
                                     alt="Extra large avatar"
                                     onClick={() => handleOpenFileInput(inputImageRef)}/>
                            </div>
                            {
                                errImage && errImage.length > 0 ?
                                    <p
                                        className={`text-dangerColor-default_2 text-sm font-medium flex items-center justify-center mt-6`}>
                                        {errImage}
                                    </p> :
                                    <></>
                            }
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default UtilityForm;