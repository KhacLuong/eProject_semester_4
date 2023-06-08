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

const CoachSeat = () => {
    const maxBoxesPerRow = 5
    const [rows, setRows] = useState(8)
    const [selectedBox, setSelectedBox] = useState(null)
    const [boxType, setBoxType] = useState(null);
    const [coachLayout, setCoachLayout] = useState(() =>
        Array.from({length: rows}, () => Array.from({length: maxBoxesPerRow}, () => {
            return {
                type: 'space',
                seatCode: null,
                ticketId: 0
            }
        }))
    );
    const [tickets, setTickets] = useState([])
    const [ticketId, setTicketId] = useState(0)
    const [seatCode, setSeatCode] = useState('')
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
    const handleSaveSeat = (e) => {
        e.preventDefault();
        const updatedLayout = [...coachLayout];
        updatedLayout[selectedBox[0]][selectedBox[1]] = {
            type: boxType,
            seatCode: boxType === 'seat' ? seatCode : null,
            ticketId: boxType === 'seat' ? ticketId : null,
        };

        setCoachLayout(updatedLayout);
        setSelectedBox(null);
        setBoxType(null)
        setTicketId(0);
        setSeatCode('');
    };
    const handleBoxClick = (rowIndex, columnIndex) => {
        const selectedBoxData = coachLayout[rowIndex][columnIndex];
        setSelectedBox([rowIndex, columnIndex]);
        setBoxType(selectedBoxData.type);
        setSeatCode(selectedBoxData.seatCode || '');
        setTicketId(selectedBoxData.ticketId || 0);
    };
    const handleCreateButtonClick = (e) => {
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
        console.log(dataToSend);
    };

    const handleAddRow = (e) => {
        e.preventDefault()
        setCoachLayout((prevLayout) => {
            const newLayout = [...prevLayout];
            const newRow = Array.from({length: maxBoxesPerRow}, () => {
                return {
                    type: "space",
                    seatCode: null,
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
        for (let row = 0; row < rows; row++) {
            const columns = [];
            for (let column = 0; column < maxBoxesPerRow; column++) {
                const position = coachLayout[row][column];
                columns.push(
                    <div
                        key={`${row}-${column}`}
                        className={`border-2 w-16 h-16 cursor-pointer bg-white hover:bg-primaryColor hover:text-white transition-all duration-300 ease-in-out mr-1.5 last:mr-0 relative ${position.type}`}
                        onClick={() => handleBoxClick(row, column)}
                    >
                        <span className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}>
                            {position.type === 'space' ? `${row * maxBoxesPerRow + column + 1}` :
                                <Icon type={position.type}/>}
                       </span>
                    </div>
                );
            }

            layout.push(<div key={row}
                             className={`flex justify-center items-center mb-1.5 ${row === rows - 1 ? 'relative' : ''}`}>
                {
                    row === rows - 1
                        ? <div className={`absolute -left-8 flex flex-col`}>
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
            </div>);
        }
        return layout;
    };

    return (
        <div className={`overflow-x-auto h-max`}>
            <div className={`inline-block min-w-full align-middle`}>
                <div className="grid grid-cols-2 gap-6 mb-1.5">
                    <div className={`col-span-1 flex justify-center`}>
                        <div className={`w-max bg-white shadow-xl relative rounded-xl px-10 pb-8 pt-20`}>
                                <span
                                    className={`absolute bg-gray-300 w-full h-14 top-0 right-0 left-0 rounded-t-xl text-center`}>
                                    <p className={`mt-2.5 text-black text-xl font-semibold`}>Sơ đồ xe</p>
                                </span>
                            {renderCoachLayout()}
                        </div>
                    </div>
                    <div className={`col-span-1 h-full flex flex-col`}>
                        {
                            selectedBox !== null && (
                                <div
                                    className="sticky top-24 bg-white shadow-xl p-4 rounded-xl">
                                    <div className={`flex flex-col mb-4`}>
                                        <label htmlFor="position-type">Loại vị trí</label>
                                        <select
                                            id="position-type"
                                            value={boxType || ''}
                                            onChange={(e) => setBoxType(e.target.value)}
                                        >
                                            <option value="">-- Lựa chọn --</option>
                                            <option value="seat">Ghế cho hành khách</option>
                                            <option value="driver">Ghế cho lái xe</option>
                                            <option value="space">Khoảng trống</option>
                                        </select>
                                    </div>
                                    {
                                        boxType && boxType === 'seat'
                                            ? <>
                                                <div className={`flex flex-col mb-4`}>
                                                    <label htmlFor={`seatCode`}>Mã ghế</label>
                                                    <input onChange={(e) => setSeatCode(e.target.value)}
                                                           id={`seatCode`}
                                                           type={`text`}
                                                           value={seatCode ? seatCode : ''}/>
                                                </div>
                                                <div className={`flex flex-col mb-4`}>
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
                                            </>
                                            : null
                                    }
                                    <div className={`flex items-center justify-end`}>
                                        <button onClick={handleSaveSeat}
                                                className={`inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-successColor hover:bg-successColor_hover sm:ml-auto shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform duration-300`}>
                                            <MdOutlineSave className={`mr-2 -ml-1 w-4 h-4`}/>
                                            Lưu
                                        </button>
                                    </div>
                                </div>
                            )}
                    </div>
                </div>
            </div>
            <div>
                <button onClick={handleCreateButtonClick}>Tạo ghế</button>
            </div>
        </div>
    )
};

const Icon = ({type}) => {
    return <div>{type === 'seat' ? <MdEventSeat className={`w-8 h-8`}/> :
        <TbSteeringWheel className={`w-8 h-8`}/>}</div>;
};
export default CoachSeat