import React, {useEffect, useRef, useState} from 'react';
import Breadcrumb from "../../../components/admin/Breadcrumb.jsx";
import moment from "moment";
import {useLocation, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import image_add from "../../../assets/image/image_add.png"
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai";
import useDocumentTitle from "../../../hooks/useDocumentTitle.jsx";

const UserForm = () => {
    useDocumentTitle("Thêm mới người dùng", true)
    const navigate = useNavigate();
    const userId = useLocation().state?.userId
    const inputAvatarRef = useRef(null);

    const [avatarDefault, setAvatarDefault] = useState(image_add)
    const [avatarName, setAvatarName] = useState(null)
    const [email, setEmail] = useState("")
    const [fullName, setFullName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [type, setType] = useState("")
    const [createdAt, setCreatedAt] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    useEffect(() => {
        if (userId) {

        }
    }, [])

    const handleTogglePassword = () => {
        setShowPassword((showPassword) => !showPassword)
    }
    const handleToggleConfirmPassword = () => {
        setShowConfirmPassword((showConfirmPassword) => !showConfirmPassword)
    }

    const handleChangeAvatar = (e) => {

        const fileObj = e.target.files && e.target.files[0];

        if (!fileObj) {
            return;
        }
        setAvatarDefault(window.URL.createObjectURL(fileObj))
        setAvatarName(fileObj.name)

        // 👇️ reset file input
        e.target.value = null;
    }
    const handleOpenFileInput = () => {
        inputAvatarRef.current.click()
    }

    const handleResetForm = () => {
        setEmail("")
        setFullName("")
        setPassword("")
        setConfirmPassword("")
    }
    const dataBreadcrumb = [
        {
            name: "Dashboard",
            path: "/admin/v1"
        },
        {
            name: "Quản lý người dùng",
            path: "/admin/v1/users"
        },
        {
            name: "Thêm mới",
            path: ""
        }
    ]
    return (
        <>
            <div data-aos="fade-up"
                 data-aos-delay="100"
                 className={`flex flex-col p-4 mx-4 mt-4 mb-6 rounded-2xl shadow-xl shadow-gray-200`}>
                <Breadcrumb dataBreadcrumb={dataBreadcrumb}/>
                <h1 className={`text-xl font-semibold text-gray-900 sm:text-2xl`}>Thêm mới người dùng</h1>
            </div>
            <div data-aos="fade-right"
                 data-aos-delay="300"
                 className={`flex flex-col p-4 my-4 mx-4 rounded-2xl shadow-xl shadow-gray-200 dark:bg-gray-700`}>
                <form className={``}>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="w-full">
                            <div className={`group relative z-0 w-full mb-6`}>
                                <input type="email"
                                       name="email"
                                       id="email"
                                       className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                       placeholder=" "
                                       autoComplete={`off`}
                                       required
                                       defaultValue={email ? email : ''}/>
                                <label htmlFor="email"
                                       className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Email
                                </label>
                            </div>
                            <div className={`group relative z-0 w-full mb-6`}>
                                <input type="text"
                                       name="full_name"
                                       id="full_name"
                                       className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                       placeholder=" "
                                       autoComplete={`off`}
                                       required
                                       defaultValue={fullName ? fullName : ''}/>
                                <label htmlFor="full_name"
                                       className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Họ và tên
                                </label>
                            </div>
                            <div className={`group relative z-0 w-full mb-6`}>
                                <label htmlFor="role"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Lựa chọn vai trò
                                </label>
                                <select id="role"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        defaultValue={""}>
                                    <option value={""}>-- Chọn --</option>
                                    <option value={"customer"}>Khách hàng</option>
                                    <option value={"partner"}>Đối tác</option>
                                    <option value={"admin"}>Quản trị viên</option>
                                </select>
                            </div>
                            {
                                !userId ?
                                    <>
                                        <div className={`group relative z-0 w-full mb-6`}>
                                            <input  type={showPassword ? "text" : "password"}
                                                   name="password"
                                                   id="password"
                                                   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer relative"
                                                   placeholder=" "
                                                   required
                                                   autoComplete={`off`}/>
                                            <span
                                                className={`absolute top-1/2 right-2.5 -translate-y-1/2 cursor-pointer`}
                                                onClick={handleTogglePassword}>
                                                {
                                                    showPassword ?
                                                        <AiFillEye className={`w-5 h-5 text-white`}/> :
                                                        <AiFillEyeInvisible className={`w-5 h-5 text-white`}/>
                                                }
                                            </span>
                                            <label htmlFor="password"
                                                   className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                                        </div>
                                        <div className={`group relative z-0 w-full mb-6`}>
                                            <input type={showConfirmPassword ? "text" : "password"}
                                                   name="repeat_password"
                                                   id="repeat_password"
                                                   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                   placeholder=" "
                                                   required
                                                   autoComplete={`off`}/>
                                            <span
                                                className={`absolute top-1/2 right-2.5 -translate-y-1/2 cursor-pointer`}
                                                onClick={handleToggleConfirmPassword}>
                                                {
                                                    showConfirmPassword ?
                                                        <AiFillEye className={`w-5 h-5 text-white`}/> :
                                                        <AiFillEyeInvisible className={`w-5 h-5 text-white`}/>
                                                }
                                            </span>
                                            <label htmlFor="repeat_password"
                                                   className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm
                                                password</label>
                                        </div>
                                    </> :
                                    <></>
                            }
                            <div className={`flex items-center justify-end`}>
                                <button type="submit"
                                        className="duration-300 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-successColor dark:hover:bg-successColor_hover dark:focus:ring-blue-800">Tạo
                                </button>
                                <button type="reset"
                                        className="ml-4 duration-300 text-white bg-gray-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:text-black dark:bg-gray-50 dark:hover:bg-gray-200 dark:focus:ring-blue-800">Reset
                                </button>
                            </div>
                        </div>
                        <div className={`col-span-1 h-full w-full`}>
                            <input className={`hidden`}
                                   onChange={(e) => handleChangeAvatar(e)} accept="image/png"
                                   ref={inputAvatarRef}
                                   type={`file`}/>
                            <div className={`flex items-center justify-center cursor-pointer`}>
                                <img style={{
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    objectFit: "cover"
                                }}
                                     className="aspect-square rounded-full w-1/2 h-1/2 bg-gray-50 shadow-xl shadow-gray-200 dark:shadow-gray-700"
                                     src={avatarDefault}
                                     alt="Extra large avatar"
                                     onClick={() => handleOpenFileInput()}/>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default UserForm;