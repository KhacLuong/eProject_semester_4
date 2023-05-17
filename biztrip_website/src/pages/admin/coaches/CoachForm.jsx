import React, {useEffect, useRef, useState} from 'react';
import useDocumentTitle from "../../../hooks/useDocumentTitle.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import image_add from "../../../assets/image/image_add.png";
import {fetchSaveCoachUtility} from "../../../redux/slices/coachUtilitySlice.jsx";
import {fetchGetCoachById} from "../../../redux/slices/coachSlice.jsx";
import Breadcrumb from "../../../components/admin/Breadcrumb.jsx";
import {utilityFormBreadcrumb} from "../../../utils/data.jsx";

const CoachForm = () => {
    useDocumentTitle("Thêm mới xe", true)
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

    useEffect(() => {
        if (id) {
            const test = async () => {
                const res = await dispatch(fetchGetCoachById({id})).unwrap()
            }
            test()
        }
    }, [id])

    return (
        <>
            <div data-aos="fade-up"
                 data-aos-delay="100"
                 className={`flex flex-col p-4 mx-4 mt-4 mb-6 rounded-2xl shadow-xl shadow-gray-200`}>
                <Breadcrumb dataBreadcrumb={utilityFormBreadcrumb}/>
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

                            </div>
                            <div className={`group relative z-0 w-full mb-6`}>

                            </div>
                            <div className={`group relative z-0 w-full mb-6`}>

                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CoachForm;