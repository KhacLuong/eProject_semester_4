import React, {useState} from 'react';
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai";
import space from "../../../assets/image/space_man.jpg"
import * as url from "url";

const SignIn = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [focusPasswordInput, setFocusPasswordInput] = useState(false)
    const [focusEmailInput, setFocusEmailInput] = useState(false)

    const handleFocusEmailInput = (e) => {
        setFocusEmailInput(true)
    }
    const handleBlurEmailInput = (e) => {
        if (e.target.value === "") {
            setFocusEmailInput(false)
        }
    }
    const handleFocusPasswordInput = (e) => {
        setFocusPasswordInput(true)
    }
    const handleBlurPasswordInput = (e) => {
        if (e.target.value === "") {
            setFocusPasswordInput(false)
        }
    }
    const handleTogglePassword = () => {
        setShowPassword((showPassword) => !showPassword)
    }
    return (
        <section
            style={{
                backgroundImage: `url(${space})`,
                backgroundRepeat: `no-repeat`,
                backgroundSize: `cover`,
                backgroundPosition: `center`
            }}
            className={`min-h-screen`}
        >
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div
                    className="w-full relative rounded-lg md:mt-0 sm:max-w-md xl:p-0 bg-[#423c5a80] shadow-signIn backdrop-blur-[33px] bg-blend-overlay">
                    <div className="p-6 space-y-8 md:space-y-12 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl dark:text-white">
                            Welcome to CMS - BizTrip
                            <div
                                className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                                <p className="mx-4 mb-0 text-center font-semibold dark:text-white text-lg">
                                    Sign In
                                </p>
                            </div>
                        </h1>

                        <form className="space-y-6 md:space-y-8">
                            <div className="relative mb-6">
                                <input
                                    type="text"
                                    className="block  w-full bg-transparent py-[0.75rem] border-0 outline-none transition-all duration-300 ease-linear focus:placeholder:opacity-100 motion-reduce:transition-none border-b-white border-b-[1.75px] focus:border-b-[#8371fd] focus:ring-0 text-[1rem] text-white pl-0"
                                    id="email"
                                    autoComplete={`off`}
                                    required={true}
                                    onBlur={(e) => handleBlurEmailInput(e)}
                                    onFocus={(e) => handleFocusEmailInput(e)}/>
                                <label
                                    htmlFor="email"
                                    className={`${focusEmailInput ? '-top-[4px] text-[0.73rem]' : ''} -translate-y-1/2 pointer-events-none absolute left-0 top-1/2 mb-0 max-w-[100%] truncate pt-[0.37rem] leading-[2.15] text-[0.95rem] text-neutral-500 transition-all duration-300 ease-out motion-reduce:transition-none text-white`}
                                >Your Email
                                </label>
                            </div>
                            <div className="relative mb-6">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="relative block min-h-[auto] w-full bg-transparent py-[0.75rem] border-0 outline-none transition-all duration-300 ease-linear focus:placeholder:opacity-100 motion-reduce:transition-none border-b-white border-b-[1.75px] focus:border-b-[#8371fd] focus:ring-0 text-[1rem] text-white pl-0"
                                    id="password"
                                    autoComplete={`off`}
                                    required={true}
                                    onBlur={(e) => handleBlurPasswordInput(e)}
                                    onFocus={(e) => handleFocusPasswordInput(e)}
                                />
                                <span
                                    className={`absolute top-1/2 right-2.5 -translate-y-1/2 cursor-pointer`}
                                    onClick={handleTogglePassword}>
                                    {
                                        showPassword ?
                                            <AiFillEye className={`w-5 h-5 dark:text-white text-primaryColor`}/> :
                                            <AiFillEyeInvisible
                                                className={`w-5 h-5 dark:text-white text-primaryColor`}/>
                                    }
                                </span>
                                <label
                                    htmlFor="password"
                                    className={`${focusPasswordInput ? '-top-[4px] text-[0.73rem]' : ''} -translate-y-1/2 pointer-events-none absolute left-0 top-1/2 mb-0 max-w-[100%] truncate pt-[0.37rem] leading-[2.15] text-[0.95rem] text-neutral-500 transition-all duration-300 ease-out motion-reduce:transition-none text-white`}
                                >Password
                                </label>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox"
                                               className="w-4 h-4 border border-gray-300 rounded focus:ring-3 focus:ring-primaryColor bg-white cursor-pointer"
                                               required=""/>
                                    </div>
                                    <div className="ml-1.5 text-sm">
                                        <label htmlFor="remember" className="text-black dark:text-gray-200">Remember
                                            me</label>
                                    </div>
                                </div>
                                <a href="#"
                                   className="text-sm relative font-medium text-primaryColor hover:text-primaryColor_hover dark:text-gray-200 dark:hover:text-white duration-300 before:content[''] before:inline-block before:absolute before:w-0 before:bg-primaryColor dark:before:bg-white before:h-[1px] before:left-auto before:right-0 before:duration-300 before:bottom-[-2px] hover:before:w-full hover:before:duration-300 hover:before:left-0 hover:before:right-auto">Forgot
                                    password?</a>
                            </div>
                            <button type="submit"
                                    className="w-full text-dark bg-white hover:bg-primaryColor_hover duration-300 focus:ring-4 focus:outline-none focus:ring-primaryColor_hover font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:hover:bg-primaryColor_hover dark:focus:ring-primaryColor_hover">
                                Sign in
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignIn;