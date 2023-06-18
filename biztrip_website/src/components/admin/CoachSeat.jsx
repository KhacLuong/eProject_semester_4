import React, {useEffect, useState} from 'react'
import {
    AiFillMinusCircle,
    AiFillPlusCircle,
    MdEventSeat,
    MdOutlineSave,
    TbSteeringWheel
} from "react-icons/all.js"
import {toast} from "react-toastify"
import {useDispatch} from "react-redux"
import {fetchAllTicket} from "../../redux/slices/ticketSlice.jsx"

const CoachSeat = ({setListSeat}) => {
    const maxBoxesPerRow = 5
    const [rows, setRows] = useState(8)
    const [selectedBoxes, setSelectedBoxes] = useState([]);
    const [boxType, setBoxType] = useState('');
    const [coachLayout, setCoachLayout] = useState(() =>
        Array.from({length: rows}, () =>
            Array.from({length: maxBoxesPerRow}, () => {
                return {
                    type: 'space',
                    seatCode: '',
                    ticketId: 0
                }
            }))
    );
    const [tickets, setTickets] = useState([])
    const [ticketId, setTicketId] = useState(0)
    const [seatCode, setSeatCode] = useState('')
    const [boxId, setBoxId] = useState(null)
    const [isAnyBoxSelected, setIsAnyBoxSelected] = useState(false);
    const dispatch = useDispatch()

    useEffect(() => {
        const test = async () => {
            const res = await dispatch(fetchAllTicket({})).unwrap()
            if (res && res.code === 200) {
                setTickets(res.data)
            }
        }
        test()
    }, [])
    useEffect(() => {
        setIsAnyBoxSelected(selectedBoxes.length > 0);
    }, [selectedBoxes]);
    const handleBoxClick = (rowIndex, columnIndex) => {
        const boxKey = `${rowIndex}-${columnIndex}`;
        const isSelected = isSelectedBox(rowIndex, columnIndex);
        if (isSelected) {
            setSelectedBoxes((prevSelectedBoxes) =>
                prevSelectedBoxes.filter((box) => box !== boxKey)
            );
        } else {
            setSelectedBoxes((prevSelectedBoxes) => [...prevSelectedBoxes, boxKey]);
        }
        const selectedBoxData = coachLayout[rowIndex][columnIndex];
        setBoxType(selectedBoxData.type);
        setBoxId(rowIndex * maxBoxesPerRow + columnIndex + 1);
        setSeatCode(generateSeatCode(rowIndex, columnIndex))
        setTicketId(selectedBoxData.ticketId || 0);
    };
    const isSelectedBox = (rowIndex, columnIndex) => {
        const boxKey = `${rowIndex}-${columnIndex}`;
        return selectedBoxes.includes(boxKey);
    };
    const handleSaveSeat = (e) => {
        e.preventDefault();
        const updatedLayout = coachLayout.map((row, rowIndex) => {
            return row.map((position, columnIndex) => {
                const boxKey = `${rowIndex}-${columnIndex}`;
                if (selectedBoxes.includes(boxKey)) {
                    return {
                        type: boxType,
                        seatCode: boxType === 'seat' ? generateSeatCode(rowIndex, columnIndex) : '',
                        ticketId: boxType === 'seat' ? ticketId : 0,
                    };
                }
                return position;
            });
        });
        setCoachLayout(updatedLayout);
        setSelectedBoxes([]);
        setBoxType(null);
        setTicketId(0);
        setSeatCode('');
        setBoxId(null);
    };
    const generateSeatCode = (rowIndex, columnIndex) => {
        const rowCode = String.fromCharCode(65 + columnIndex);
        const seatNumber = rowIndex + 1;
        return `${rowCode}${seatNumber}`;
    };
    const handleSaveAllSeat = (e) => {
        e.preventDefault();
        const dataToSend = coachLayout.flatMap((row, rowIndex) =>
            row.map((position, columnIndex) => {
                const positionIndex = rowIndex * maxBoxesPerRow + columnIndex + 1;
                return {
                    ...position,
                    position: positionIndex,
                };
            })
        );
        setListSeat(dataToSend)
        toast.success("Lưu sơ đồ xe thành công")
    };

    const handleAddRow = (e) => {
        e.preventDefault()
        setCoachLayout((prevLayout) => {
            const newLayout = [...prevLayout];
            const newRow = Array.from({length: maxBoxesPerRow}, () => {
                return {
                    type: "space",
                    seatCode: '',
                    ticketId: 0,
                };
            });
            newLayout.push(newRow);
            return newLayout;
        });
        setRows((prevRows) => prevRows + 1);
    }
    const handleRemoveLastRow = (e) => {
        e.preventDefault();
        const newRow = rows - 1;
        if (newRow < 4) {
            toast.error("Tối thiểu phải có 5 hàng");
        } else {
            setCoachLayout((prevLayout) => {
                const updatedLayout = [...prevLayout];
                updatedLayout.pop();
                return updatedLayout;
            });
            setRows(newRow);
        }
    };

    const renderCoachLayout = () => {
        const layout = [];
        const columnLabels = ['A', 'B', 'C', 'D', 'E'];
        for (let row = 0; row < rows; row++) {
            const columns = [];
            for (let column = 0; column < maxBoxesPerRow; column++) {
                const position = coachLayout[row][column];
                const boxKey = `${row}-${column}`;
                const isSelected = isSelectedBox(row, column);
                const label = column === 0 ? row + 1 : '';
                columns.push(
                    <div
                        key={`${boxKey}`}
                        className={`border-2 rounded-xl w-16 h-16 cursor-pointer text-sm hover:bg-primaryColor hover:text-white transition-all duration-300 ease-in-out mr-1.5 last:mr-0 relative ${position.type} ${isSelected ? 'selected bg-successColor text-white' : 'bg-white'}`}
                        onClick={() => handleBoxClick(row, column)}
                    >
                        {
                            label && column === 0 && (
                                <span
                                    className="absolute flex top-1/2 -left-1/2 transform -translate-y-1/2 text-base font-semibold text-primaryColor">{label}</span>
                            )
                        }
                        <span className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}>
                            {position.type === 'space' ? `${row * maxBoxesPerRow + column + 1}` :
                                <Icon type={position.type}/>}
                       </span>
                    </div>
                );
            }
            layout.push(
                <div key={row}
                     className={`flex justify-center items-center mb-4 relative mt-4`}>
                    {row === 0 && (
                        <div className="absolute w-full flex justify-between items-center top-0 left-0 -mt-8">
                            {columnLabels.map((label, index) => (
                                <span key={index}
                                      className="block w-16 h-16 font-semibold text-base text-center text-primaryColor">{label}</span>
                            ))}
                        </div>
                    )}
                    {
                        row === rows - 1
                            ? <div className={`absolute -left-8 top-20 flex flex-row-reverse`}>
                                <button onClick={(e) => handleAddRow(e)}
                                        className={`cursor-pointer`}>
                                    <AiFillPlusCircle
                                        className={`w-6 h-6 duration-300 transition-all ease-in-out text-successColor hover:text-successColor_hover`}/>
                                </button>
                                <button onClick={(e) => handleRemoveLastRow(e)}
                                        className={`cursor-pointer`}>
                                    <AiFillMinusCircle
                                        className={`w-6 h-6 text-dangerColor-default_2 hover:text-dangerColor-hover_2 duration-300 transition-all ease-in-out`}/>
                                </button>
                            </div>
                            : null
                    }
                    {columns}
                </div>
            );
        }
        return layout;
    };

    return (
        <div className={`relative`}>
            <div className={`inline-block min-w-full align-middle`}>
                <div className="grid grid-cols-2 gap-6 mb-1.5">
                    <div className={`col-span-1 flex justify-center`}>
                        <div className={`w-max bg-white shadow-xl relative rounded-xl px-10 pb-8 pt-20`}>
                                <span
                                    className={`absolute bg-gray-300 w-full h-14 top-0 right-0 left-0 rounded-t-xl text-center`}>
                                    <p className={`mt-2.5 text-black text-xl font-medium capitalize`}>tùy chỉnh sơ đồ xe</p>
                                </span>
                            {renderCoachLayout()}
                        </div>
                    </div>
                    <div className={`col-span-1 h-full flex flex-col relative`}>
                        {
                            isAnyBoxSelected && (
                                <div className="sticky w-96 top-24 right-0 bg-white shadow-xl p-4 rounded-xl">
                                    <div className={`flex flex-col mb-4`}>
                                        <label htmlFor="position-type"
                                               className={`block mb-2 text-sm font-medium text-gray-900`}>Loại vị
                                            trí</label>
                                        <select
                                            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                                            id="position-type"
                                            value={boxType || ''}
                                            onChange={(e) => setBoxType(e.target.value)}
                                        >
                                            <option value="">-- Lựa chọn --</option>
                                            <option value="seat">Ghế cho hành khách</option>
                                            <option value="space">Khoảng trống</option>
                                            <option value="driver">Ghế cho lái xe</option>
                                        </select>
                                    </div>
                                    {
                                        boxType && boxType === 'seat'
                                            ? <div className={`flex flex-col mb-4`}>
                                                <label htmlFor={`ticketId`}>Giá vé</label>
                                                <select id={`ticketId`}
                                                        value={+ticketId ? +ticketId : 0}
                                                        onChange={(e) => setTicketId(+e.target.value)}>
                                                    <option value={0}>Chọn</option>
                                                    {
                                                        tickets && tickets.length > 0 ?
                                                            tickets.map((ticket, index) => {
                                                                return <option value={ticket.id} key={`ticket-${index}`}>
                                                                    {ticket.title}
                                                                </option>
                                                            }) : null
                                                    }
                                                </select>
                                            </div>
                                            : null
                                    }
                                    <div className={`flex items-center justify-end`}>
                                        <button onClick={handleSaveSeat}
                                                className={`inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-successColor hover:bg-successColor_hover sm:ml-auto shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform duration-300`}>
                                            <MdOutlineSave className={`mr-2 -ml-1 w-4 h-4`}/>
                                            Xác nhận
                                        </button>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className={`flex justify-end items-center`}>
                <button onClick={handleSaveAllSeat}
                        className=" duration-300 text-white bg-successColor hover:bg-successColor_hover focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Lưu
                </button>
            </div>
        </div>
    )
};

const Icon = ({type}) => {
    return <div>{type === 'seat' ? <MdEventSeat className={`w-8 h-8`}/> :
        <TbSteeringWheel className={`w-8 h-8`}/>}</div>;
};

export default CoachSeat