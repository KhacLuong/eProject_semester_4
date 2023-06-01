import React, {useEffect, useRef, useState} from 'react';
import useDocumentTitle from "../../../hooks/useDocumentTitle.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import image_add from "../../../assets/image/image_add.png";
import {fetchAllUtility, fetchGetCoachById} from "../../../redux/slices/coachSlice.jsx";
import Breadcrumb from "../../../components/admin/Breadcrumb.jsx";
import {formBreadCrumb} from "../../../utils/data.jsx";
import {components} from 'react-select';
import AsyncSelect from 'react-select/async';
import {produce} from "immer"
import makeAnimated from 'react-select/animated';
import {initialCoachFormState} from "../../../utils/initial.jsx";
import {
    validateEmpty,
    validateFile,
    validateForm,
    validateSelectOption
} from "../../../utils/helper.jsx";
import {message} from "../../../utils/message.jsx";
import {fetchCreateFile} from "../../../redux/slices/fileSlice.jsx";
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import CoachSchedule from "../../../components/admin/CoachSchedule.jsx";
import CoachThumbnail from "../../../components/admin/CoachThumbnail.jsx";
import CoachSeat from "../../../components/admin/CoachSeat.jsx";

const formCoachValidationRules = [
    {
        fieldName: "plateNumber",
        validationFn: validateEmpty,
        errorMessage: message.error.plateNumber.isEmpty
    },
    {
        fieldName: "status",
        validationFn: validateSelectOption,
        errorMessage: message.error.status.isEmpty
    },
]
const CoachForm = () => {
    const id = useLocation().state?.id
    useDocumentTitle(id ? "Sửa thông tin xe" : "Thêm mới xe", true)
    const animatedComponents = makeAnimated()
    const {NoOptionsMessage} = components
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [imageDefault, setImageDefault] = useState(image_add)
    const [disableButton, setDisableButton] = useState(false)
    const [utilities, setUtilities] = useState([])
    const [selectOption, setSelectOption] = useState(null)
    const [formState, setFormState] = useState(initialCoachFormState)
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileError, setFileError] = useState("");
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (id) {
            const test = async () => {
                const res = await dispatch(fetchGetCoachById({id})).unwrap()
            }
            test()
        }
    }, [id])
    useEffect(() => {
        const test = async () => {
            await handleGetAllUtility()
        }
        test()
    }, [])
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setFileError("")
    };
    const handleImageClick = () => {
        fileInputRef.current.click();
    };
    const handleInputChange = (event) => {
        const {name, value} = event.target
        setFormState((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }
    const handleSelectChange = (selectedOption) => {
        setFormState((preState) => ({
            ...preState,
            status: selectedOption.target.value,
        }));
    }
    const handleGetAllUtility = async () => {
        const res = await dispatch(fetchAllUtility()).unwrap()
        if (res && res.code === 200) {
            const nextState = produce([], draft => {
                res.data.map((item) => {
                    if (item.status === true) {
                        draft.push({
                            value: item.id,
                            label: item.title
                        })
                    }
                })
            })
            setUtilities(nextState)
        }
    }
    const CustomNoOptionsMessage = (props) => {
        return (
            <NoOptionsMessage {...props}>
                Không có dữ liệu
            </NoOptionsMessage>
        );
    };
    const filter = (inputValue) => {
        return utilities.filter((i) =>
            i.label.toLowerCase().includes(inputValue.toLowerCase())
        );
    };
    const handleFormReset = () => {
        setDisableButton(false)
        setFormState(initialCoachFormState);
    };
    const loadOptions = (inputValue, callback) => {
        setTimeout(() => {
            callback(filter(inputValue));
        }, 1000);
    };
    const handleSubmitForm = async (e) => {
        e.preventDefault()
        const errors = validateForm(formState, formCoachValidationRules);
        const fileError = validateFile(selectedFile)

        if (fileError) {
            setFileError(fileError);
            return;
        } else {
            // const containerName = 'coaches'
            // let imagePath = ""
            // const data = new FormData()
            // data.append('file', selectedFile)
            // const uploadFile = await dispatch(fetchCreateFile({data, containerName})).unwrap()
            // if (uploadFile && uploadFile.code === 200) {
            //     imagePath = uploadFile.data
            //     // setImageDefault(imagePath)
            // }
            // setFormState((prevState) => ({
            //     ...prevState,
            //     imagePath: imagePath
            // }))
        }
        console.log(formState)
        if (Object.keys(errors).length === 0) {
            setDisableButton(true)
            try {
                // await axios...

                setFormState(initialCoachFormState)
                setSelectedFile(null);
                setFileError("");
                setDisableButton(false);
            } catch (error) {
                setDisableButton(false)
            }

            // Form is valid, proceed with submission
            // ...
        } else {
            // Form has errors, handle them accordingly
            // ...
        }
    }
    const dataTab = [
        {
            label: "Thông tin cơ bản",
            value: "tab-1",
        },
        {
            label: "Sơ đồ xe",
            value: "tab-2",
        },
        {
            label: "Lộ trình",
            value: "tab-3",
        },
        {
            label: "Ảnh thu nhỏ",
            value: "tab-4",
        },
    ]
    return (
        <>
            <div data-aos="fade-up"
                 data-aos-delay="100"
                 className={`flex flex-col p-4 mx-4 mt-4 mb-6 rounded-2xl shadow-xl shadow-gray-200`}>
                <Breadcrumb dataBreadcrumb={formBreadCrumb(id, "Quản lý xe", "coaches/list")}/>
                <h1 className={`text-xl font-semibold text-gray-900 sm:text-2xl`}>{id ? "Sửa thông tin xe" : "Thêm mới xe"}</h1>
            </div>
            <div data-aos="fade-right"
                 data-aos-delay="300"
                 className={`flex flex-col p-4 my-4 mx-4 rounded-2xl shadow-xl shadow-gray-200`}>
                <form className={``}>
                    <Tabs value="tab-1" className={`overflow-visible`}>
                        <TabsHeader className="w-1/2 rounded-none border-b border-blue-gray-50 bg-transparent mb-6 py-4"
                                    indicatorProps={{
                                        className: "bg-transparent border-b-2 border-primaryColor shadow-none mt-4 rounded-none",
                                    }}>
                            {dataTab.map(({ label, value }) => (
                                <Tab key={value} value={value} className={`before:content[''] before:inline-block before:absolute before:w-0 before:bg-primaryColor before:h-[2px] before:bottom-[-16px] hover:before:w-full hover:before:duration-300 `}>
                                    {label}
                                </Tab>
                            ))}
                        </TabsHeader>
                        <TabsBody className={`overflow-visible`} animate={{
                            initial: {y: 250},
                            mount: {y: 0},
                            unmount: {y: 250},
                        }}>
                            <TabPanel value={`tab-1`} className={``}>
                                <div className={`grid md:grid-cols-2 mb:gap-6`}>
                                    <div className={`w-full`}>
                                        <div className={`group relative z-0 w-full mb-6`}>
                                            <input type={"text"}
                                                   name={"plateNumber"}
                                                   value={formState.plateNumber}
                                                   onChange={handleInputChange}
                                                   className={"block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"}
                                                   placeholder={" "}
                                                   autoComplete={`off`}
                                                   required/>
                                            <label htmlFor="plateNumber"
                                                   className="peer-focus:font-medium absolute  text-sm text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                                Biển số xe
                                            </label>
                                        </div>
                                        <div className={`group relative z-0 w-full mb-6`}>
                                <textarea name="description"
                                          id="description"
                                          placeholder={" "}
                                          onChange={handleInputChange}
                                          value={formState.description}
                                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer resize-none h-44"></textarea>
                                            <label htmlFor="description"
                                                   className="peer-focus:font-medium absolute text-sm text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                                Miêu tả <span className={`text-lightColor`}>(Optional)</span>
                                            </label>
                                        </div>
                                        <div className={`group relative z-0 w-full mb-6`}>
                                            <label htmlFor="status"
                                                   className="block mb-2 text-sm font-medium text-gray-900">
                                                Lựa chọn trạng thái
                                            </label>
                                            <select id="status"
                                                    name={"status"}
                                                    onChange={handleSelectChange}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                    defaultValue={formState.status}>
                                                <option value={""}>-- Chọn --</option>
                                                <option value={"disable"}>Vô hiệu hóa</option>
                                                <option value={"active"}>Đang hoạt động</option>
                                                <option value={"maintenance"}>Bảo trì</option>
                                            </select>
                                        </div>
                                        <div className={`group relative z-50 w-full mb-6`}>
                                            <label htmlFor="stauts"
                                                   className="block mb-2 text-sm font-medium text-gray-900">
                                                Lựa chọn tiện ích <span
                                                className={`text-lightColor`}>(Optional)</span>
                                            </label>
                                            <AsyncSelect
                                                isClearable
                                                isSearchable
                                                isMulti
                                                value={selectOption}
                                                onChange={setSelectOption}
                                                cacheOptions
                                                defaultOptions={utilities}
                                                loadOptions={loadOptions}
                                                placeholder={"-- Chọn --"}
                                                className={`react-select-custom bg-gray-50 text-gray-900 text-sm block w-full`}
                                                components={{
                                                    ...animatedComponents,
                                                    NoOptionsMessage: CustomNoOptionsMessage
                                                }}
                                            />
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
                                                 className="aspect-square rounded-md w-1/2 h-1/2 bg-gray-50 shadow-xl shadow-gray-200"
                                                 src={selectedFile ? window.URL.createObjectURL(selectedFile) : imageDefault}
                                                 alt="Ảnh đại diện"
                                                 onClick={handleImageClick}/>
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
                            </TabPanel>
                            <TabPanel value={`tab-2`}>                                <CoachSeat/>
                            </TabPanel>
                            <TabPanel value={`tab-3`}>
                                <CoachSchedule/>
                            </TabPanel>
                            <TabPanel value={`tab-4`}>
                                <CoachThumbnail/>
                            </TabPanel>
                        </TabsBody>
                    </Tabs>
                    <div className={`flex items-center justify-end`}>
                        <button disabled={disableButton}
                                onClick={handleSubmitForm}
                                type="submit"
                                className="duration-300 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                            {id ? 'Cập nhật' : 'Tạo'}
                        </button>
                        {
                            !id ?
                                <button onClick={handleFormReset}
                                        type="reset"
                                        className="ml-4 duration-300 bg-gray-100 text-gray-400 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Reset
                                </button> :
                                <></>
                        }
                    </div>
                </form>
            </div>
        </>
    );
};

export default CoachForm;