import React from 'react';
import {BsFillTelephoneFill} from "react-icons/all.js";

const Header = () => {
    return (
        <header className={`absolute w-full z-30`}>
            <section className={`mt-8`}>
                <div className={`max-w-7xl flex mx-auto relative`}>
                    <div className={`md:w-full relative min-h-[1px] flex`}>
                        <div className={`relative w-full flex-wrap content-start`}>
                            <div className={`bg-white rounded-xl shadow-lg p-0`}>
                                <div className={`max-w-7xl flex relative justify-between`}>
                                    <div className={`px-4 py-6 text-3xl leading-0 font-semibold text-gray-600`}>
                                        BizTrip
                                    </div>
                                    <div className={`flex px-4 py-6 w-3/6 items-center justify-between font-semibold text-sm capitalize text-gray-600`}>
                                        <span className={`text-primaryColor`}>Trang chủ</span>
                                        <span>Về chúng tôi</span>
                                        <span>Dịch vụ</span>
                                        <span>Các chuyến xe</span>
                                        <span>Tin tức</span>
                                        <span>Liên hệ</span>
                                    </div>
                                    <div className={`rounded-r-xl px-4 flex items-center justify-end bg-primaryColor -mr-[1.1px]`}>
                                        <div className={`relative`}>
                                            <div className={`absolute p-3 rounded-full bg-primaryColor -left-[9%] top-1/2 -translate-y-1/2  -translate-x-1/2 `}>
                                                <BsFillTelephoneFill className={`text-white w-4 h-4`}/>
                                            </div>
                                            <div className={`text-white mx-6 flex flex-col items-center  justify-end`}>
                                                <h2 className={`font-semibold text-lg mb-2`}>Liên hệ ngay</h2>
                                                <p className={`text-sm`}>(+62) 81587 6218</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </header>
    );
};

export default Header;