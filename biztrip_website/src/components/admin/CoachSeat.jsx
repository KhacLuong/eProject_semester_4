import React, {useEffect, useState} from 'react'
import {AiFillMinusCircle, BiPlus, MdOutlineSave} from "react-icons/all.js"
import {toast} from "react-toastify"
import {useDispatch} from "react-redux"
import {fetchAllTicket} from "../../redux/slices/ticketSlice.jsx"

const CoachSeat = () => {
    const maxBoxesPerRow = 5
    const [rows, setRows] = useState(8)
    const [selectedBox, setSelectedBox] = useState(null)
    const [boxType, setBoxType] = useState(null);
    const [busLayout, setBusLayout] = useState(() =>
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
        const updatedLayout = [...busLayout];
        updatedLayout[selectedBox[0]][selectedBox[1]] = {
            type: boxType,
            seatCode: boxType === 'seat' ? seatCode : null,
            ticketId: boxType === 'seat' ? ticketId : null,
        };

        setBusLayout(updatedLayout);
        setSelectedBox(null);
        setBoxType(null)
        setTicketId(0);
        setSeatCode('');
    };
    const handleBoxClick = (rowIndex, columnIndex) => {
        const selectedBoxData = busLayout[rowIndex][columnIndex];
        setSelectedBox([rowIndex, columnIndex]);
        setBoxType(selectedBoxData.type);
        setSeatCode(selectedBoxData.seatCode || '');
        setTicketId(selectedBoxData.ticketId || 0);
    };
    const handleCreateButtonClick = (e) => {
        e.preventDefault();

        const dataToSend = busLayout.flatMap((row, rowIndex) =>
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
        setBusLayout((prevLayout) => {
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
            setBusLayout((prevLayout) => {
                const updatedLayout = [...prevLayout];
                updatedLayout.pop();
                return updatedLayout;
            });
            setRows(newRow);
        }
    };
    useEffect(() => {
        renderCoachLayout()
    }, [rows])
    const renderCoachLayout = () => {
        const layout = [];
        for (let row = 0; row < rows; row++) {
            const columns = [];
            for (let column = 0; column < maxBoxesPerRow; column++) {
                const position = busLayout[row][column];
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
                        ? <span onClick={(e) => handleRemoveLastRow(e)}
                                className={`absolute -left-8 cursor-pointer`}>
                                <AiFillMinusCircle
                                    className={`w-6 h-6 text-dangerColor-default_2 hover:text-dangerColor-hover_2 duration-300 transition-all ease-in-out`}/>
                            </span>
                        : null
                }
                {columns}
            </div>);
        }
        return layout;
    };

    return (
        <div className={`overflow-x-auto`}>
            <div className={`inline-block min-w-full align-middle`}>
                <div className={``}>
                    <div className={`grid grid-cols-2`}>
                        <div className={`col-span-1 flex items-centers justify-center mb-8`}>
                            <button onClick={(e) => handleAddRow(e)}
                                    className={`inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-successColor hover:bg-successColor_hover shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform duration-300`}>
                                <BiPlus className={`mr-2 -ml-1 w-4 h-4`}/>
                                Thêm hàng
                            </button>
                        </div>
                        <div className={`col-span-1`}></div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div className={`col-span-1 flex justify-center`}>
                            <div className={`w-max bg-white border-4 relative rounded-4xl px-10 pb-8 pt-20`}>
                                <span
                                    className={`absolute bg-gray-300 w-full h-14 top-0 right-0 left-0 rounded-t-4xl border-4`}></span>
                                {renderCoachLayout()}
                            </div>
                        </div>
                        {
                            selectedBox !== null && (
                                <div className={`col-span-1 flex justify-center`}>
                                    <div className={`w-max h-max bg-white border-2 p-4`}>
                                        <div className={`flex flex-col w-96 mb-4`}>
                                            <h3>Select Position Type</h3>
                                            <label htmlFor="position-type">Type:</label>
                                            <select
                                                id="position-type"
                                                value={boxType || ''}
                                                onChange={(e) => setBoxType(e.target.value)}
                                            >
                                                <option value="">Select Type</option>
                                                <option value="seat">Seat</option>
                                                <option value="space">Space</option>
                                                <option value="driver">Driver</option>
                                            </select>
                                        </div>
                                        <div className={`flex flex-col w-96 mb-4`}>
                                            <label htmlFor={`seatCode`}>Mã ghế</label>
                                            <input onChange={(e) => setSeatCode(e.target.value)}
                                                   id={`seatCode`}
                                                   type={`text`}
                                                   value={seatCode ? seatCode : ''}/>
                                        </div>
                                        <div className={`flex flex-col w-96 mb-4`}>
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
                                        <div className={`flex items-center justify-end`}>
                                            <button onClick={handleSaveSeat}
                                                    className={`inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-successColor hover:bg-successColor_hover sm:ml-auto shadow-md shadow-gray-300 hover:scale-[1.02] transition-transform duration-300`}>
                                                <MdOutlineSave className={`mr-2 -ml-1 w-4 h-4`}/>
                                                Lưu
                                            </button>
                                        </div>
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
    return <div>{type === 'seat' ? 'Seat Icon' : 'Driver Icon'}</div>;
};
export default CoachSeat