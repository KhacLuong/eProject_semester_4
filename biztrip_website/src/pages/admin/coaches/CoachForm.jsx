import React, {useEffect, useRef, useState} from 'react';
import useDocumentTitle from "../../../hooks/useDocumentTitle.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import image_add from "../../../assets/image/image_add.png";
import {fetchGetAllUtility, fetchGetCoachById} from "../../../redux/slices/coachSlice.jsx";
import Breadcrumb from "../../../components/admin/Breadcrumb.jsx";
import {coachFormBreadcrumb} from "../../../utils/data.jsx";
import Select, {components} from 'react-select';
import AsyncSelect from 'react-select/async';
import {produce} from "immer"
import makeAnimated from 'react-select/animated';

const CoachForm = () => {
    useDocumentTitle("Thêm mới xe", true)
    const animatedComponents = makeAnimated()
    const {NoOptionsMessage} = components
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const id = useLocation().state?.id
    const statusState = useSelector((state) => state.coach.status)
    const inputImageRef = useRef(null);
    const [imageDefault, setImageDefault] = useState(image_add)
    const [imageName, setImageName] = useState("")
    const [plateNumber, setPlateNumber] = useState("")
    const [totalSeats, setTotalSeats] = useState(0)
    const [status, setStatus] = useState("")
    const [description, setDescription] = useState("")
    const [createdAt, setCreatedAt] = useState("")
    const [errStatus, setErrStatus] = useState("")
    const [errImage, setErrImage] = useState("")
    const [disableButton, setDisableButton] = useState(false)
    const [utilities, setUtilities] = useState([])
    const [selectOption, setSelectOption] = useState(null)
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
    const handleGetAllUtility = async () => {
        const res = await dispatch(fetchGetAllUtility()).unwrap()
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

    const loadOptions = (inputValue, callback) => {
        setTimeout(() => {
            callback(filter(inputValue));
        }, 1000);
    };
    const handleSubmitForm = (e) => {
        console.log(selectOption)
    }
    const handleResetForm = (e) => {

    }
    return (
        <>
            <div data-aos="fade-up"
                 data-aos-delay="100"
                 className={`flex flex-col p-4 mx-4 mt-4 mb-6 rounded-2xl shadow-xl shadow-gray-200`}>
                <Breadcrumb dataBreadcrumb={coachFormBreadcrumb}/>
                <h1 className={`text-xl font-semibold text-gray-900 sm:text-2xl`}>Thêm mới xe</h1>
            </div>
            <div data-aos="fade-right"
                 data-aos-delay="300"
                 className={`flex flex-col p-4 my-4 mx-4 rounded-2xl shadow-xl shadow-gray-200`}>
                <form className={``}>
                    <div className={`grid md:grid-cols-2 mb:gap-6`}>
                        <div className={`w-full`}>
                            <div className={`group relative z-0 w-full mb-6`}>
                                <input type={`text`}
                                       name={"plateNumber"}
                                       id={"plateNumber"}
                                       className={"block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"}
                                       placeholder={" "}
                                       autoComplete={`off`}
                                       required
                                       defaultValue={plateNumber ? plateNumber : ''}/>
                                <label htmlFor="plateNumber"
                                       className="peer-focus:font-medium absolute  text-sm text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Biển số xe
                                </label>
                            </div>
                            <div className={`group relative z-0 w-full mb-6`}>
                                <textarea required
                                          autoComplete={`off`}
                                          name="description"
                                          id="description"
                                          placeholder={" "}
                                          onChange={(e) => setDescription(e.target.value)}
                                          value={description ? description : ""}
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
                                        value={status}>
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
                            <div className={`group relative z-0 w-full mb-6`}>
                                <label htmlFor="stauts"
                                       className="block mb-2 text-sm font-medium text-gray-900">
                                    Lựa chọn tiện ích <span className={`text-lightColor`}>(Optional)</span>
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
                                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full `}
                                    components={{...animatedComponents, NoOptionsMessage: CustomNoOptionsMessage}}
                                />
                            </div>
                            <div className={`group relative z-0 w-full mb-6`}>

                            </div>
                            <div className={`group relative z-0 w-full mb-6`}>

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
                    </div>
                </form>
            </div>
        </>
    );
};

export default CoachForm;