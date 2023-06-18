import React, {useEffect, useRef, useState} from 'react';
import Breadcrumb from "../../../components/admin/Breadcrumb.jsx";
import moment from "moment";
import {useLocation, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import image_add from "../../../assets/image/image_add.png"
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai";
import useDocumentTitle from "../../../hooks/useDocumentTitle.jsx";
import {
    handleOpenFileInput, validateConfirmPassword,
    validateEmail, validateEmpty, validateFile,
    validateForm, validateLengthOfString, validatePhoneNumber
} from "../../../utils/helper.jsx";
import {message} from "../../../utils/message.jsx";
import {initialUserFormState} from "../../../utils/initial.jsx";
import {formBreadCrumb} from "../../../utils/data.jsx";

const formUserValidationRules = [
    {
        fieldName: "email",
        validationFn: validateEmail,
        errorMessage: message.error.email.isInvalid
    },
    {
        fieldName: "fullName",
        validationFn: validateEmpty,
        errorMessage: message.error.name.isEmpty
    },
    {
        fieldName: "phoneNumber",
        validationFn: validatePhoneNumber,
        errorMessage: message.error.phoneNumber.isInvalid
    },
    {
        fieldName: "role",
        validationFn: validateEmpty,
        errorMessage: message.error.role.isEmpty
    },
    {
        fieldName: "password",
        validationFn: validateEmpty,
        errorMessage: message.error.password.isEmpty
    },
]

const UserForm = () => {
    useDocumentTitle("Thêm mới người dùng", true)
    const navigate = useNavigate();
    const id = useLocation().state?.id
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [disableButton, setDisableButton] = useState(false)
    const [imageDefault, setImageDefault] = useState(image_add)
    const [createdAt, setCreatedAt] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [formState, setFormState] = useState(initialUserFormState)
    const [fileError, setFileError] = useState("");
    const [errorFullName, setErrorFullName] = useState("")
    const [errorEmail, setErrorEmail] = useState("")
    const [errorRole, setErrorRole] = useState("")
    const [errorPhoneNumber, setErrorPhoneNumber] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [errorConfirmPassword, setErrorConfirmPassword] = useState("")

    useEffect(() => {
        if (id) {

        }
    }, [id])

    const handleTogglePassword = () => {
        setShowPassword((showPassword) => !showPassword)
    }
    const handleToggleConfirmPassword = () => {
        setShowConfirmPassword((showConfirmPassword) => !showConfirmPassword)
    }
    const handleSelectChange = (event) => {
        const {name, value} = event.target
        setErrorRole("")
        setFormState((preState) => ({
            ...preState,
            [name]: value
        }));
    }
    const handleInputChange = (event) => {
        const {name, value} = event.target
        if (name === 'email') {
            setErrorEmail("")
        } else if (name === 'fullName') {
            setErrorFullName("")
        } else if (name === 'phoneNumber') {
            setErrorPhoneNumber("")
        } else if (name === 'password') {
            setErrorPassword("")
        }else if (name === 'confirmPassword') {
            setErrorConfirmPassword("")
        }
        setFormState((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setFileError("")
    };
    const handleSubmitForm = async e => {
        e.preventDefault()
        setDisableButton(true)
        const errors = validateForm(formState, formUserValidationRules)
        const fileError = validateFile(selectedFile)
        const passwordLengthError = validateLengthOfString(formState.password, 8, 100)
        const confirmPasswordError = validateConfirmPassword(formState.password, formState.confirmPassword)
        if (passwordLengthError) {
            errors.password = passwordLengthError
        }
        if (confirmPasswordError) {
            errors.confirmPassword = confirmPasswordError
        }
        if (fileError && !id) {
            errors.file = fileError
        }
        if (!(Object.keys(errors).length === 0)) {
            setErrorFullName(errors.fullName)
            setErrorEmail(errors.email)
            setErrorRole(errors.role)
            setErrorPhoneNumber(errors.phoneNumber)
            setErrorPassword(errors.password)
            setFileError(errors.file);
            setErrorConfirmPassword(errors.confirmPassword)
            setDisableButton(false)
        } else {
            setErrorFullName("")
            setErrorEmail("")
            setErrorRole("")
            setErrorPhoneNumber("")
            setErrorPassword("")
            setErrorConfirmPassword("")
            const containerName = 'users'
        }
    }
    return (
        <>
            <div data-aos="fade-up"
                 data-aos-delay="100"
                 className={`flex flex-col p-4 mx-4 mt-4 mb-6 rounded-2xl shadow-xl shadow-gray-200`}>
                <Breadcrumb dataBreadcrumb={formBreadCrumb(id, "Quản lý người dùng", "users/accounts")}/>
                <h1 className={`text-xl font-semibold text-gray-900 sm:text-2xl`}>Thêm mới người dùng</h1>
            </div>
            <div data-aos="fade-right"
                 data-aos-delay="300"
                 className={`flex flex-col p-4 my-4 mx-4 rounded-2xl shadow-xl shadow-gray-200 `}>
                <form className={``}>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="w-full">
                            <div className={`group relative z-0 w-full mb-6`}>
                                <input type="email"
                                       name="email"
                                       id="email"
                                       className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                       placeholder=" "
                                       autoComplete={`off`}
                                       required
                                       onChange={handleInputChange}
                                       value={formState.email}/>
                                <label htmlFor="email"
                                       className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Email
                                </label>
                                {
                                    errorEmail && errorEmail.length > 0
                                        ? <span className={`text-dangerColor-default_2 text-sm`}>{errorEmail}</span>
                                        : null
                                }
                            </div>
                            <div className={`group relative z-0 w-full mb-6`}>
                                <input type="text"
                                       name="fullName"
                                       id="fullName"
                                       className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                       placeholder=" "
                                       autoComplete={`off`}
                                       required
                                       onChange={handleInputChange}
                                       value={formState.fullName}/>
                                <label htmlFor="fullName"
                                       className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Họ và tên
                                </label>
                                {
                                    errorFullName && errorFullName.length > 0
                                        ? <span className={`text-dangerColor-default_2 text-sm`}>{errorFullName}</span>
                                        : null
                                }
                            </div>
                            <div className={`group relative z-0 w-full mb-6`}>
                                <input type="text"
                                       name="phoneNumber"
                                       id="phoneNumber"
                                       className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                       placeholder=" "
                                       autoComplete={`off`}
                                       required
                                       onChange={handleInputChange}
                                       value={formState.phoneNumber}/>
                                <label htmlFor="phoneNumber"
                                       className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Số điện thoại
                                </label>
                                {
                                    errorPhoneNumber && errorPhoneNumber.length > 0
                                        ? <span className={`text-dangerColor-default_2 text-sm`}>{errorPhoneNumber}</span>
                                        : null
                                }
                            </div>
                            <div className={`group relative z-0 w-full mb-6`}>
                                <label htmlFor="role"
                                       className="block mb-2 text-sm font-medium text-gray-900">
                                    Lựa chọn vai trò
                                </label>
                                <select id="role"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        name={"role"}
                                        value={formState.role}
                                        onChange={handleSelectChange}>
                                    <option value={""}>-- Chọn --</option>
                                    <option value={"customer"}>Khách hàng</option>
                                    <option value={"user"}>Quản trị viên</option>
                                </select>
                                {
                                    errorRole && errorRole.length > 0
                                        ? <span className={`text-dangerColor-default_2 text-sm`}>{errorRole}</span>
                                        : null
                                }
                            </div>
                            {
                                !id ?
                                    <>
                                        <div className={`group relative z-0 w-full mb-6`}>
                                            <input type={showPassword ? "text" : "password"}
                                                   name="password"
                                                   id="password"
                                                   onChange={handleInputChange}
                                                   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer relative"
                                                   placeholder=" "
                                                   required
                                                   value={formState.password}
                                                   autoComplete={`off`}/>
                                            <span
                                                className={`absolute top-1/2 right-2.5 -translate-y-1/2 cursor-pointer`}
                                                onClick={handleTogglePassword}>
                                                {
                                                    showPassword ?
                                                        <AiFillEye className={`w-5 h-5 text-black`}/> :
                                                        <AiFillEyeInvisible className={`w-5 h-5 text-black`}/>
                                                }
                                            </span>
                                            <label htmlFor="password"
                                                   className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                                            {
                                                errorPassword && errorPassword.length > 0
                                                    ? <span className={`text-dangerColor-default_2 text-sm`}>{errorPassword}</span>
                                                    : null
                                            }
                                        </div>
                                        <div className={`group relative z-0 w-full mb-6`}>
                                            <input type={showConfirmPassword ? "text" : "password"}
                                                   name="confirmPassword"
                                                   id="confirmPassword"
                                                   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                   placeholder=" "
                                                   required
                                                   onChange={handleInputChange}
                                                   value={formState.confirmPassword}
                                                   autoComplete={`off`}/>
                                            <span
                                                className={`absolute top-1/2 right-2.5 -translate-y-1/2 cursor-pointer`}
                                                onClick={handleToggleConfirmPassword}>
                                                {
                                                    showConfirmPassword ?
                                                        <AiFillEye className={`w-5 h-5 text-black`}/> :
                                                        <AiFillEyeInvisible className={`w-5 h-5 text-black`}/>
                                                }
                                            </span>
                                            <label htmlFor="confirmPassword"
                                                   className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                                Confirm password
                                            </label>
                                            {
                                                errorConfirmPassword && errorConfirmPassword.length > 0
                                                    ? <span className={`text-dangerColor-default_2 text-sm`}>{errorConfirmPassword}</span>
                                                    : null
                                            }
                                        </div>
                                    </> :
                                    <></>
                            }
                            <div className={`flex items-center justify-end`}>
                                <button type="submit"
                                        onClick={handleSubmitForm}
                                        className="duration-300 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Tạo
                                </button>
                                <button type="reset"
                                        className="ml-4 duration-300 text-white bg-gray-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Reset
                                </button>
                            </div>
                        </div>
                        <div className={`col-span-1 h-full w-full`}>
                            <input className={`hidden`}
                                   onChange={handleFileChange}
                                   accept="image/png"
                                   ref={fileInputRef}
                                   type={`file`}/>
                            <div className={`flex items-center justify-center cursor-pointer`}>
                                <img style={{
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    objectFit: "cover"
                                }}
                                     className="aspect-square rounded-full w-1/2 h-1/2 bg-gray-50 shadow-xl shadow-gray-200"
                                     src={selectedFile ? window.URL.createObjectURL(selectedFile) : imageDefault}
                                     alt="Extra large avatar"
                                     onClick={() => handleOpenFileInput(fileInputRef)}/>
                            </div>
                            {
                                fileError &&
                                <span
                                    className={`text-dangerColor-default_2 text-sm font-medium flex items-center justify-center mt-6`}>
                                                {fileError}
                                            </span>
                            }
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default UserForm;