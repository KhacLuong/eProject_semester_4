import React, {useEffect} from 'react';
import {schedules} from "../../utils/data.jsx";
import {FiFilter} from "react-icons/all.js";

const CoachSchedule = () => {
    useEffect(() => {

    })
    const theadData = [
        "#",
        {field: 'departure', name: 'Điểm khởi hành'},
        {field: 'stopOver', name: 'Trạm dừng chân'},
        {field: 'destination', name: 'Điểm kết thúc'},
        {field: 'startTime', name: 'Thời gian xuất phát'},
        {field: 'endTime', name: 'Thời gian đến nơi'},
    ]

    return (
        <div className={`overflow-x-auto rounded`}>
            <div className={`inline-block min-w-full align-middle`}>
                <div className={`overflow-hidden shadow-lg`}>
                    <div className={`mb-6 flex items-center justify-end`}>
                        <div className={`flex items-centers justify-center mr-8`}>
                            <label htmlFor={`departure`} className={`text-sm whitespace-nowrap flex items-center mr-2`}>Điểm khởi hành</label>
                            <select id={`departure`} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </select>
                        </div>
                        <div className={`flex items-centers justify-center mr-8`}>
                            <label htmlFor={`destination`} className={`text-sm whitespace-nowrap flex items-center mr-2`}>Điểm kết thúc</label>
                            <select id={`destination`} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </select>
                        </div>
                        <div className={`flex items-centers justify-center mr-8`}>
                            <label htmlFor={`startTime`} className={`text-sm whitespace-nowrap flex items-center mr-2`}>Thời gian xuất phát</label>
                            <select id={`startTime`} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </select>
                        </div>
                        <div className={`flex items-centers justify-center mr-8`}>
                            <label htmlFor={`endTime`} className={`text-sm whitespace-nowrap flex items-center mr-2`}>Thời gian đến nơi</label>
                            <select id={`endTime`} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </select>
                        </div>
                        <button className={`inline-flex items-center py-2 px-3 mr-2 text-sm font-medium text-center text-white rounded-lg bg-primaryColor hover:bg-primaryColor_hover shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform duration-300`}>
                            <FiFilter className={`mr-2 -ml-1 w-4 h-4`}/>
                            Lọc
                        </button>
                    </div>
                    <table className={`w-full text-sm text-left text-gray-500`}>
                        <thead className={`text-xs text-gray-700 capitalize bg-white`}>
                        <tr>
                            {
                                theadData.map((item, index) => {
                                    if (typeof item === "object") {
                                        return (
                                            <th key={`th-${index}`} scope={`col`}
                                                className={`px-6 py-3 ${item.field === 'startTime' || item.field === 'endTime' ? 'w-32' : ''}`}
                                                title={item.field}>
                                                <div className={`flex items-center`}>
                                                    {item.name}
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
                            schedules.map((item, index) => {
                                return (
                                    <tr key={`tr-${index}`} className={`bg-white border-b hover:bg-gray-50`}>
                                        <td className="px-6 py-3 w-8">
                                            <input type={"checkbox"}/>
                                        </td>
                                        <td className="px-6 py-3 w-24">
                                            {item.departure}
                                        </td>
                                        <td className="px-6 py-3 w-96">
                                            <div className={`w-full grid grid-cols-6`}>
                                                {
                                                    item.stopOver.map((stop, key) => {
                                                        return (
                                                            <React.Fragment key={key}>
                                                             <p className="mb-4 bg-primaryColor text-center text-white text-xs font-medium px-2.5 py-1 rounded-r-full relative">
                                                                 <span className={`absolute left-0 top-1/2 -translate-y-1/2 w-5 h-full flex items-center justify-center text-blue-800 bg-blue-200`}>{key+1}</span>
                                                                 {stop}
                                                            </p>
                                                                <div className={`mb-4 flex items-center last:hidden`}>
                                                                    <span className={`w-full h-[2px] bg-primaryColor`}></span>
                                                                </div>
                                                            </React.Fragment>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </td>
                                        <td className="px-6 py-3 w-24">
                                            {item.destination}
                                        </td>
                                        <td className="px-6 py-3">
                                            {item.startTime}
                                        </td>
                                        <td className="px-6 py-3">
                                            {item.endTime}
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
    );
};

export default CoachSchedule;