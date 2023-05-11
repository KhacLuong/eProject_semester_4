import React from 'react';
import {BsFillTelephoneFill, RiMenu3Fill} from "react-icons/all.js";
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <header className={`absolute w-full z-20 hidden md:block`}>
            <section className={`mt-10`}>
                <div className={`max-w-7xl flex mx-auto relative`}>
                    <div className={`md:w-full relative min-h-[1px] `}>
                        <nav className="bg-white rounded-xl">
                            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                                <Link to={``}
                                      className="col-span-1 flex rounded-l-xl items-center px-4 bg-white h-full">
                                    <h2
                                        className="self-center whitespace-nowrap text-3xl leading-0 font-semibold text-gray-800">BizTrip</h2>
                                </Link>
                                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                                     id="navbar-cta">
                                    <ul className="text-base text-gray-700 flex items-center justify-center font-semibold w-full rounded-lg md:space-x-8">
                                        <li>
                                            <Link to={``}
                                                  className="block py-2 pl-3 pr-4 text-primaryColor md:p-0"
                                                  aria-current="page">Trang chủ</Link>
                                        </li>
                                        <li>
                                            <a href="#"
                                               className="block py-2 pl-3 pr-4 md:p-0 hover:text-primaryColor_hover duration-300">Đặt
                                                vé</a>
                                        </li>
                                        <li>
                                            <a href="#"
                                               className="block py-2 pl-3 pr-4 md:p-0 hover:text-primaryColor_hover duration-300">Dịch
                                                vụ</a>
                                        </li>
                                        <li>
                                            <a href="#"
                                               className="block py-2 pl-3 pr-4 md:p-0 hover:text-primaryColor_hover duration-300">Về
                                                chúng tôi</a>
                                        </li>
                                        <li>
                                            <a href="#"
                                               className="block py-2 pl-3 pr-4 md:p-0 hover:text-primaryColor_hover duration-300">Liên
                                                hệ</a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="flex md:order-2">
                                    <button type="button"
                                            className="text-white duration-300 font-semibold bg-primaryColor hover:bg-primaryColor_hover rounded-lg text-sm px-4 py-3 text-center mr-3 md:mr-0">
                                        Đăng nhập
                                    </button>
                                    <button data-collapse-toggle="navbar-cta" type="button"
                                            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                                            aria-controls="navbar-cta" aria-expanded="false">
                                        <span className="sr-only">Open main menu</span>
                                        <RiMenu3Fill className={`w-6 h-6`}/>
                                    </button>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </section>
        </header>
    );
};

export default Header;