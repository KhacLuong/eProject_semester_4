import React, {useState} from 'react';
import {AiFillMinusCircle, BiPlus} from "react-icons/all.js";

const CoachSeat = () => {
    const [selectedBox, setSelectedBox] = useState(null);
    const [rows, setRows] = useState(8)
    const maxBoxesPerRow = 5; // Maximum number of boxes per row

    const handleBoxClick = (box) => {
        setSelectedBox(box);
    };
    const renderRows = () => {
        const rowsArray = [];
        const totalBoxes = rows * maxBoxesPerRow;
        for (let row = 0; row < rows; row++) {
            const startBox = row * maxBoxesPerRow + 1;
            const endBox = Math.min(startBox + maxBoxesPerRow - 1, totalBoxes);
            const boxes = [];

            for (let box = startBox; box <= endBox; box++) {
                boxes.push(
                    <div
                        key={box}
                        className={`border-2 w-16 h-16 cursor-pointer bg-white hover:bg-primaryColor hover:text-white transition-all duration-300 ease-in-out mr-1.5 last:mr-0 relative`}
                        onClick={() => handleBoxClick(box)}>
                       <span className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}>
                           {box}
                       </span>
                    </div>
                );
            }

            rowsArray.push(
                <div key={row}
                     className={`flex justify-center items-center mb-1.5 ${row === rows - 1 ? 'relative' : ''}`}>
                    {
                        row === rows - 1
                            ? <span onClick={(e) => handleRemoveLastRow(e)}
                                className={`absolute -left-8 cursor-pointer`}>
                                <AiFillMinusCircle className={`w-6 h-6 text-dangerColor-default_2 hover:text-dangerColor-hover_2 duration-300 transition-all ease-in-out`}/>
                            </span>
                            : null
                    }
                    {boxes}
                </div>
            );
        }

        return rowsArray;
    };
    const handleAddRow = (e) => {
        e.preventDefault()
        setRows(rows + 1)
    }
    const handleRemoveLastRow = (e) => {
        e.preventDefault()
        const newRow = rows - 1
        if (newRow <= 4) {
            setRows(rows)
        } else {
            setRows(newRow)
        }
    }
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
                                {renderRows()}
                            </div>
                        </div>
                        {
                            selectedBox != null
                                ? <div className={`col-span-1 flex justify-center`}>
                                    <div className={`w-max h-max bg-white border-2 p-4`}>
                                        <div className={`flex flex-col w-96 mb-4`}>
                                            <label htmlFor={`position`}>Vị trí ô</label>
                                            <input id={`position`} type={`text`} readOnly={true}
                                                   value={+selectedBox ? +selectedBox : ''}/>
                                        </div>
                                        <div className={`flex flex-col w-96 mb-4`}>
                                            <label htmlFor={`type`}>Loại vị trí</label>
                                            <select id={`type`} defaultValue={``}>
                                                <option value={``}>-- Chọn --</option>
                                                <option value={`driver`}>Ghế cho tài xế</option>
                                                <option value={`customer`}>Ghế cho hành khách</option>
                                                <option value={`space`}>Khoảng trống</option>
                                            </select>
                                        </div>
                                        <div className={`flex flex-col w-96 mb-4`}>
                                            <label htmlFor={`seatCode`}>Mã ghế</label>
                                            <input id={`seatCode`} type={`text`} defaultValue={``}/>
                                        </div>
                                        <div className={`flex flex-col w-96 mb-4`}>
                                            <label htmlFor={`ticketId`}>Giá vé</label>
                                            <select id={`ticketId`} defaultValue={``}>
                                                <option value={``}>-- Chọn --</option>
                                                <option value={`driver`}>Ghế cho tài xế</option>
                                                <option value={`customer`}>Ghế cho hành khách</option>
                                                <option value={`space`}>Khoảng trống</option>
                                            </select>
                                        </div>
                                        <div>
                                            <button>Lưu</button>
                                        </div>
                                    </div>
                                </div>
                                : null
                        }
                    </div>
                    ;
                </div>
            </div>
        </div>
    );
};

export default CoachSeat;