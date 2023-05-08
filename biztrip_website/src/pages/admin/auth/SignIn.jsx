import React, {useState} from 'react';
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai";
import {useNavigate} from "react-router-dom";
import space from "../../../assets/image/space_man.jpg"
import {validateEmail} from "../../../utils/helper.jsx";
import {message} from "../../../utils/message.jsx";
import useDocumentTitle from "../../../hooks/useDocumentTitle.jsx";

const SignIn = () => {
    useDocumentTitle("CMS - Đăng nhập", true)
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [msg, setMsg] = useState("")

    const handleTogglePassword = () => {
        setShowPassword((showPassword) => !showPassword)
    }

    const checkValidateLogin = () => {
        const checkEmail = validateEmail(email)
        if (!checkEmail) {
            setMsg(message.error.email.isInvalid)
            return false;
        } else if (password.trim() === "") {
            setMsg(message.error.password.isEmpty)
            return false;
        } else if (password.trim().length < 6) {
            setMsg(message.error.password.isShort)
            return false;
        }
        return true;
    }

    const handleLogin = (e) => {
        e.preventDefault()
        if (!checkValidateLogin()) {
            return;
        }
        navigate('/admin/v1')
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
                    <div className="p-6 space-y-8 md:space-y-10 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-center md:text-2xl text-white">
                            CMS - BizTrip
                            <div
                                className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                                <p className="mx-4 mb-0 text-center font-semibold text-white text-lg">
                                    Đăng nhập
                                </p>
                            </div>
                        </h1>
                        <form className="space-y-6 md:space-y-8">
                            <div className="relative mb-6">
                                <input
                                    type="text"
                                    className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-400 peer"
                                    id="email"
                                    placeholder={" "}
                                    autoComplete={`off`}
                                    required={true}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <label
                                    htmlFor="email"
                                    className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-6"
                                >Email
                                </label>
                            </div>
                            <div className="relative mb-6">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-400 peer"
                                    id="password"
                                    autoComplete={`off`}
                                    placeholder={" "}
                                    required={true}
                                    onChange={(e) => setPassword(e.target.value)
                                    }
                                />
                                <span
                                    className={`absolute top-1/2 right-2.5 -translate-y-1/2 cursor-pointer`}
                                    onClick={handleTogglePassword}>
                                    {
                                        showPassword ?
                                            <AiFillEye className={`w-5 h-5 text-white`}/> :
                                            <AiFillEyeInvisible className={`w-5 h-5 text-white`}/>
                                    }
                                </span>
                                <label
                                    htmlFor="password"
                                    className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-90 peer-focus:-translate-y-6"
                                >Mật khẩu
                                </label>
                            </div>
                            <div className="flex items-center justify-end">
                                <a href="#"
                                   className="text-sm relative font-medium text-gray-200 duration-300 before:content[''] before:inline-block before:absolute before:w-0 before:bg-white before:h-[1px] before:left-auto before:right-0 before:duration-300 before:bottom-[-2px] hover:before:w-full hover:before:duration-300 hover:before:left-0 hover:before:right-auto">
                                    Quên mật khẩu?
                                </a>
                            </div>
                            <button type="submit"
                                    className="w-full text-dark bg-white hover:bg-primaryColor_hover hover:text-white duration-300 outline-none ring-0 border-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    onClick={handleLogin}>
                                Đăng nhập
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignIn;