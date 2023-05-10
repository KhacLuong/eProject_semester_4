import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {FaDotCircle, TbArrowsLeftRight} from "react-icons/all.js";

const Booking = () => {
    const [reverseLocation, setReverseLocation] = useState(false)
    const handleOpenMenu = () => {
        console.log(132)
    }
    const handleReverseLocation = () => {
        setReverseLocation((reverseLocation) => !reverseLocation)
    }
    return (
        <section className={`absolute w-full z-30`}>
            <div className={`max-w-7xl flex mx-auto relative`}>
                <div className={`md:w-full min-h-[1px] flex`}>
                    <div className={`w-full flex-wrap content-start`}>
                        <div className={`flex items-end justify-center mb-5`}>
                            <Link to={``} className={`no-underline outline-none cursor-pointer`}>
                                <h2 className={`text-3xl text-white text-center leading-none whitespace-nowrap drop-shadow-lg font-semibold`}>BizTrip
                                    - Cam kết hoàn 150% tiền nếu chúng tôi không giữ vé</h2>
                            </Link>
                        </div>
                        <div className={`w-full max-w-7xl bg-white rounded-xl shadow-lg p-0`}>
                            <div className={`p-3 grid w-full grid-cols-4 gap-2`}>
                                <div className={`col-span-3 md:block rounded-xl border-[1px] border-borderColor mr-3 relative`}>
                                    <div className={`h-full flex justify-center items-center`}>
                                        <div className={`w-1/3 border-r-2 border-borderColor relative`}>
                                            <div className={`relative`}>
                                                <div className={`flex flex-row pl-4`}>
                                                    <div className={`flex flex-col justify-center items-center`}>
                                                        <FaDotCircle className={`w-6 h-6 text-primaryColor`}/>
                                                    </div>
                                                    <div className={`py-2.5 pr-8 pl-6`}>
                                                        <div onClick={handleOpenMenu} className={`flex flex-col-reverse justify-around grow shrink basis-0`}>
                                                            <input className={`leading-6 font-medium w-full border-none p-0 mt-0.5 text-base text-black pointer-events-none`}
                                                            placeholder={" "} type={"text"} id={"from_input"} value={"Hà Nội"}/>
                                                            <label className={`text-xs text-lightColor cursor-pointer`}>Nơi xuất phát</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <ul>

                                                </ul>
                                            </div>
                                            <div onClick={handleReverseLocation} className={`${reverseLocation ? 'rotate-180' : ''} duration-300 absolute z-[4] right-0 top-1/2 cursor-pointer translate-x-1/2 -translate-y-1/2 flex items-center justify-center`}>
                                                <div className={`w-9 h-9 flex items-center pr-0 justify-center rounded-full bg-gray-300 text-black`}>
                                                    <TbArrowsLeftRight className={`w-5 h-5`}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`w-1/3`}></div>
                                        <div className={`w-1/3`}></div>
                                    </div>
                                </div>
                                <div className={`col-span-1 grow text-center`}>
                                    <button className={`w-full h-auto rounded-lg bg-primaryColor hover:bg-primaryColor_hover py-5 px-auto duration-300 capitalize whitespace-normal font-base text-white block font-semibold`}>
                                        <span className={`inline-block`}>
                                            Tìm chuyến
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Booking;