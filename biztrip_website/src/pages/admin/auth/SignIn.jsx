import React, {useState} from 'react';
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai";
import {current} from "immer";

const SignIn = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [focusInput, setFocusInput] = useState(false)

    const handleTogglePassword = () => {
        setFocusInput(true)
        setShowPassword((showPassword) => !showPassword)
    }
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div
                    className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-8 md:space-y-12 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to CMS - BizTrip
                        </h1>
                        <form className="space-y-6 md:space-y-8">
                            <div className="relative mb-6">
                                <input
                                    type="text"
                                    className="peer block min-h-[auto] w-full rounded bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 focus:ring-0 dark:border-[1px] dark:focus:border-white"
                                    id="email"
                                    placeholder="Email address"/>
                                <label
                                    htmlFor="email"
                                    className={`${focusInput ? '-translate-y-[1.15rem] scale-[0.8] text-primaryColor bg-white dark:text-neutral-200 dark:bg-gray-800 px-2 data-[te-input-state-active]:scale-[0.8] data-[te-input-state-active]:-translate-y-[1.15rem]' : ''} pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out motion-reduce:transition-none dark:text-white`}
                                >Email address
                                </label>
                            </div>
                            <div className="relative mb-6">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="relative peer block min-h-[auto] w-full rounded bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 focus:ring-0 dark:border-[1px] dark:focus:border-white"
                                    id="password"
                                    placeholder="Password"
                                    onBlur={() => setFocusInput(false)}
                                    onFocus={() => setFocusInput(true)}
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
                                    className={`${focusInput ? '-translate-y-[1.15rem] scale-[0.8] text-primaryColor bg-white dark:text-neutral-200 dark:bg-gray-800 px-2 data-[te-input-state-active]:scale-[0.8] data-[te-input-state-active]:-translate-y-[1.15rem]' : ''} pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out motion-reduce:transition-none dark:text-white`}
                                >Password
                                </label>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox"
                                               className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primaryColor dark:bg-gray-700 dark:border-gray-600 dark:focus:primaryColor_hover dark:ring-offset-gray-800 cursor-pointer"
                                               required=""/>
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-black dark:text-gray-200">Remember
                                            me</label>
                                    </div>
                                </div>
                                <a href="#"
                                   className="text-sm font-medium text-primaryColor hover:text-primaryColor_hover dark:text-gray-200 dark:hover:text-white duration-300">Forgot
                                    password?</a>
                            </div>
                            <button type="submit"
                                    className="w-full text-white bg-primaryColor hover:bg-primaryColor_hover duration-300 focus:ring-4 focus:outline-none focus:ring-primaryColor_hover font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primaryColor dark:hover:bg-primaryColor_hover dark:focus:ring-primaryColor_hover">
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