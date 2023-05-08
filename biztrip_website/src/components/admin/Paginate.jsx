import React from 'react';
import ReactPaginate from "react-paginate";
import {MdOutlineKeyboardArrowLeft, MdKeyboardArrowRight} from "react-icons/md"

const Paginate = (props) => {
    const {
        setTurnOffPrevNextBtn,
        pageCount,
        pageRangeDisplayed,
        marginPagesDisplayed,
        turnOffPrevNextBtn,
        firstIndexPerPage,
        lastIndexPerPage,
        totalItems
    } = props

    const handleClickToPage = (event) => {
        if (+event.selected + 1 === 1) {
            setTurnOffPrevNextBtn(true)
        }
    }
    return (
        <div className={`items-center p-4 my-4 mx-4 bg-white rounded-2xl shadow-xl shadow-gray-200 sm:flex sm:justify-between`}>
            <div className={`flex items-center mb-4 sm:mb-0`}>
                <span className={`text-sm font-normal text-gray-500`}>
                    Hiển thị <span className={`font-semibold text-gray-900`}>{firstIndexPerPage}-{lastIndexPerPage}</span> trong <span className={`font-semibold text-gray-900`}>{totalItems}</span>
                </span>
            </div>
            <ReactPaginate pageCount={pageCount}
                           nextLabel={<div className={`flex items-center`}>Sau <MdKeyboardArrowRight className={`w-5 h-5 ml-2`}/></div>}
                           previousLabel={<div className={`flex items-center`}><MdOutlineKeyboardArrowLeft className={`w-5 h-5 mr-2`}/> Trước</div>}
                           onPageChange={handleClickToPage}
                           pageRangeDisplayed={pageRangeDisplayed}
                           marginPagesDisplayed={marginPagesDisplayed}
                           pageClassName="pageClassName"
                           pageLinkClassName="pageLinkClassName font-medium"
                           previousClassName="previousClassName"
                           previousLinkClassName="previousLinkClassName font-medium"
                           nextClassName="nextClassName"
                           nextLinkClassName="nextLinkClassName font-medium"
                           breakLabel="..."
                           breakClassName="breakLinkClassName text-xl font-medium"
                           containerClassName="flex items-center justify-center inline-flex -space-x-px"
                           activeLinkClassName="text-whiteColor bg-primaryColor"
                           renderOnZeroPageCount={null}
                           disabledClassName={turnOffPrevNextBtn ? 'hidden' : ''}
                           disabledLinkClassName={turnOffPrevNextBtn ? 'hidden' : ''}
            />
        </div>
    );
};

export default Paginate;