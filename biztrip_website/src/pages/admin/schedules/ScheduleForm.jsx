import React, {useEffect, useState} from 'react';
import {validateEmpty} from "../../../utils/helper.jsx";
import {message} from "../../../utils/message.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import useDocumentTitle from "../../../hooks/useDocumentTitle.jsx";
import {useDispatch} from "react-redux";
import {initialScheduleFormState} from "../../../utils/initial.jsx";
import {fetchAllLocation, fetchGetScheduleById} from "../../../redux/slices/scheduleSlice.jsx";
import Breadcrumb from "../../../components/admin/Breadcrumb.jsx";
import {formBreadCrumb} from "../../../utils/data.jsx";
import {BiPlus, IoIosRemoveCircle} from "react-icons/all.js";

const formScheduleValidationRules = [
    {
        fieldName: "departure",
        validationFn: validateEmpty,
        errorMessage: message.error.title.isEmpty
    },
    {
        fieldName: "destination",
        validationFn: validateEmpty,
    },
    {
        fieldName: "status",
        validationFn: validateEmpty,
    },
    {
        fieldName: "stopOver",
        validationFn: validateEmpty,
    }
]

const ScheduleForm = () => {
    const id = useLocation().state?.id
    useDocumentTitle(id ? "Sửa lộ trình" : "Thêm mới lộ trình", true)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [disableButton, setDisableButton] = useState(false)
    const [formState, setFormState] = useState(initialScheduleFormState)
    const [location, setLocation] = useState([])
    useEffect(() => {
        const test = async () => {
            await handleGetListLocation()
        }
        test()
    }, [])
    useEffect(() => {
        if (id) {
            const test = async () => {
                const res = await dispatch(fetchGetScheduleById({id})).unwrap()
            }
            test()
        }
    }, [id])
    const handleGetListLocation = async () => {
        const res = await dispatch(fetchAllLocation()).unwrap()
        console.log(res)
        if (res && res.code === 200) {
            setLocation(res.data)
        } else {
            setLocation([])
        }
    }
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const newTodos = inputValues.map((value) => ({
    //         id: Date.now(),
    //         text: value,
    //     }));
    //     setTodos([...todos, ...newTodos]);
    //     setInputValues(['']);
    // };
    const handleDepartureChange = (e, index, property) => {
        const {value} = e.target;
        setFormState((prevState) => {
            const updatedDeparture = [...prevState.departure];
            updatedDeparture[index] = {
                ...updatedDeparture[index],
                [property]: value,
            };

            return {
                ...prevState,
                departure: updatedDeparture,
            };
        });
    };
    const handleStopOverChange = (e, index, property) => {
        const {value} = e.target
        setFormState(prevState => {
            const updateStopOver = [...prevState.stopover]
            updateStopOver[index] = {
                ...updateStopOver[index],
                [property]: value,
            }
            return {
                ...prevState,
                stopover: updateStopOver
            }
        })
    }
    const handleDestinationChange = (e, index, property) => {
        const {value} = e.target
        setFormState(prevState => {
            const updateDestination = [...prevState.destination]
            updateDestination[index] = {
                ...updateDestination[index],
                [property]: value
            }
            return {
                ...prevState,
                destination: updateDestination
            }
        })
    }
    const handleAddDeparture = () => {
        const newDeparture = {
            location: '',
            time: '',
            status: ''
        };
        setFormState((prevState) => ({
            ...prevState,
            departure: [...prevState.departure, newDeparture],
        }))
    };
    const handleAddStopOver = () => {
        const newStopOver = {
            location: '',
            time: '',
            status: ''
        }
        setFormState(prevState => ({
            ...prevState,
            stopover: [...prevState.stopover, newStopOver]
        }))
    }
    const handleAddDestination = () => {
        const newDestination = {
            location: '',
            time: '',
            status: ''
        }
        setFormState(prevState => ({
            ...prevState,
            destination: [...prevState.destination, newDestination]
        }))
    }
    const handleDeleteDeparture = (e, index) => {
        e.preventDefault()
        setFormState((prevState) => {
            const updatedDeparture = [...prevState.departure];
            updatedDeparture.splice(index, 1);
            return {
                ...prevState,
                departure: updatedDeparture,
            };
        });
    };
    const handleDeleteStopOver = (e, index) => {
        e.preventDefault()
        setFormState(prevState => {
            const updateStopOVer = [...prevState.stopover]
            updateStopOVer.splice(index, 1)
            return {
                ...prevState,
                stopover: updateStopOVer
            }
        })
    }
    const handleDeleteDestination = (e, index) => {
        e.preventDefault()
        setFormState(prevState => {
            const updateDestination = [...prevState.destination]
            updateDestination.splice(index, 1)
            return {
                ...prevState,
                destination: updateDestination
            }
        })
    }
    return (
        <>
            <div data-aos="fade-up"
                 data-aos-delay="100"
                 className={`flex flex-col p-4 mx-4 mt-4 mb-6 rounded-2xl shadow-xl shadow-gray-200`}>
                <Breadcrumb dataBreadcrumb={formBreadCrumb(id, "Quản lý lộ trình", "coaches/schedules")}/>
                <h1 className={`text-xl font-semibold text-gray-900 sm:text-2xl`}>{id ? "Sửa lộ trình" : "Thêm mới lộ trình"}</h1>
            </div>
            <div data-aos="fade-right"
                 data-aos-delay="300"
                 className={`flex flex-col p-4 my-4 mx-4 rounded-2xl shadow-xl shadow-gray-200`}>
                <form className={``}>
                    <div className={`grid md:grid-cols-3 md:gap-6`}>
                        <div className={`w-full`}>
                            <div className={`group relative z-0 w-full mb-6 shadow-xl rounded-xl p-4`}>
                                <div className={`flex justify-center items-center font-semibold text-lg`}>
                                    <h2>Điểm đón khách</h2>
                                </div>
                                <div className={`flex items-center justify-between my-4`}>
                                    <button type="button"
                                            onClick={handleAddDeparture}
                                            className={`flex items-center py-1.5 px-2 text-sm font-medium text-center text-white rounded-md bg-successColor hover:bg-successColor_hover shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform duration-300`}>
                                        <BiPlus className={`mr-2 -ml-1 w-6 h-6`}/>
                                        Thêm mới
                                    </button>
                                    <span className={`bg-primaryColor text-white text-sm font-medium py-2 px-2 rounded-md shadow-md shadow-gray-300`}>
                                        Số lượng: {formState.departure.length}
                                    </span>
                                </div>
                                {formState.departure.map((departureItem, index) => (
                                    <div key={index}
                                         className={`grid md:grid-cols-7 md:gap-4 shadow-md rounded-md p-3 mb-4 last:mb-0`}>
                                        <div className={`group relative z-0 w-full col-span-3`}>
                                            <select id={`departure`}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                    value={departureItem.time}
                                                    onChange={(e) => handleDepartureChange(e, index, 'time')}>
                                                <option value={``}>
                                                    Thời gian
                                                </option>
                                            </select>
                                        </div>
                                        <div className={`group relative z-0 w-full md:grid-cols-2 col-span-3`}>
                                            <select id={`departure`}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                    value={departureItem.destination}
                                                    onChange={(e) => handleDepartureChange(e, index, 'location')}>
                                                <option value={``}>
                                                    Địa điểm
                                                </option>
                                            </select>
                                        </div>
                                        <div
                                            className={`group relative z-0 w-full col-span-1 flex items-center justify-center text-dangerColor-default_2`}>
                                            <button onClick={(e) => handleDeleteDeparture(e,index)}>
                                                <IoIosRemoveCircle className={`mr-2 -ml-1 w-6 h-6`}/>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={`w-full`}>
                            <div className={`group relative z-0 w-full mb-6 shadow-xl rounded-xl p-4`}>
                                <div className={`flex justify-center items-center font-semibold text-lg`}>
                                    <h2>Điểm nghỉ chân</h2>
                                </div>
                                <div className={`flex items-center justify-between my-4`}>
                                    <button type="button"
                                            onClick={handleAddStopOver}
                                            className={`flex items-center py-1.5 px-2 text-sm font-medium text-center text-white rounded-md bg-successColor hover:bg-successColor_hover shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform duration-300`}>
                                        <BiPlus className={`mr-2 -ml-1 w-6 h-6`}/>
                                        Thêm mới
                                    </button>
                                    <span className={`bg-primaryColor text-white text-sm font-medium py-2 px-2 rounded-md shadow-md shadow-gray-300`}>
                                        Số lượng: {formState.stopover.length}
                                    </span>
                                </div>
                                {formState.stopover.map((departureItem, index) => (
                                    <div key={index}
                                         className={`grid md:grid-cols-7 md:gap-4 shadow-md rounded-md p-3 mb-4 last:mb-0`}>
                                        <div className={`group relative z-0 w-full col-span-3`}>
                                            <select id={`departure`}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                    value={departureItem.time}
                                                    onChange={(e) => handleStopOverChange(e, index, 'time')}>
                                                <option value={``}>
                                                    Thời gian
                                                </option>
                                            </select>
                                        </div>
                                        <div className={`group relative z-0 w-full md:grid-cols-2 col-span-3`}>
                                            <select id={`departure`}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                    value={departureItem.destination}
                                                    onChange={(e) => handleStopOverChange(e, index, 'location')}>
                                                <option value={``}>
                                                    Địa điểm
                                                </option>
                                            </select>
                                        </div>
                                        <div
                                            className={`group relative z-0 w-full col-span-1 flex items-center justify-center text-dangerColor-default_2`}>
                                            <button onClick={() => handleDeleteStopOver(index)}>
                                                <IoIosRemoveCircle className={`mr-2 -ml-1 w-6 h-6`}/>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={`w-full`}>
                            <div className={`group relative z-0 w-full mb-6 shadow-xl rounded-xl p-4`}>
                                <div className={`flex justify-center items-center font-semibold text-lg`}>
                                    <h2>Điểm trả khách</h2>
                                </div>
                                <div className={`flex items-center justify-between my-4`}>
                                    <button type="button"
                                            onClick={handleAddDestination}
                                            className={`flex items-center py-1.5 px-2 text-sm font-medium text-center text-white rounded-md bg-successColor hover:bg-successColor_hover shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform duration-300`}>
                                        <BiPlus className={`mr-2 -ml-1 w-6 h-6`}/>
                                        Thêm mới
                                    </button>
                                    <span className={`bg-primaryColor text-white text-sm font-medium py-2 px-2 rounded-md shadow-md shadow-gray-300`}>
                                        Số lượng: {formState.destination.length}
                                    </span>
                                </div>
                                {formState.destination.map((departureItem, index) => (
                                    <div key={index}
                                         className={`grid md:grid-cols-7 md:gap-4 shadow-md rounded-md p-3 mb-4 last:mb-0`}>
                                        <div className={`group relative z-0 w-full col-span-3`}>
                                            <select id={`departure`}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                    value={departureItem.time}
                                                    onChange={(e) => handleDestinationChange(e, index, 'time')}>
                                                <option value={``}>
                                                    Thời gian
                                                </option>
                                            </select>
                                        </div>
                                        <div className={`group relative z-0 w-full md:grid-cols-2 col-span-3`}>
                                            <select id={`departure`}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                    value={departureItem.destination}
                                                    onChange={(e) => handleDestinationChange(e, index, 'location')}>
                                                <option value={``}>
                                                    Địa điểm
                                                </option>
                                            </select>
                                        </div>
                                        <div
                                            className={`group relative z-0 w-full col-span-1 flex items-center justify-center text-dangerColor-default_2`}>
                                            <button onClick={() => handleDeleteDestination(index)}>
                                                <IoIosRemoveCircle className={`mr-2 -ml-1 w-6 h-6`}/>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div>
                        <button>Tạo</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ScheduleForm;