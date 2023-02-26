import axios from "axios";
import { useState } from "react";
import { Navigate, redirect } from "react-router-dom";
import { authenticate } from "../../../helper/auth";
import AuthScreen from "../Screens/Authentication/AuthScreen";
import Dashboard from "../Screens/Dashboard/Dashboard";

const Login = (props) => {
    const [state, setState] = useState({
        email: "",
        password: "",
        submitProcessing: false,
        isShowPassword: false,
        isCodeSend: false,
        code: ""
    })

    const LoginNow = async () => {
        setState({
            ...state,
            submitProcessing: true,
        })
        const { email, password } = state;
        const data = { email, password }
        const config = { 'content-type': 'application/json' }
        console.log({
            method: "POST",
            headers: config,
            data: data,
            url: process.env.REACT_APP_NODE_URL + "/admin/login",
        });

        axios.post(process.env.REACT_APP_NODE_URL + "/admin/login", data).then(res => {
            console.log(res)

            if (res.data.status == "0") {
                alert(res.data.message)
                return;
            }
            // code send to email
            // Show code input at frontend
            alert("Verification Code Send Successfully")
            setState({
                ...state,
                isCodeSend: true,
            })

            // authenticate(res, "admin", () => {
            //     // alert(res.data.message)
            //     console.log("Token added as admin_token")
            //     window.location.href = "/d/admin/"
            // })
            // authenticate with token
            // redirect
        }).catch(err => {
            console.log(err.response.data)
            alert(err.response.data.message)
        })
    }
    const VerifyCode = async () => {
        setState({
            ...state,
            submitProcessing: true,
        })
        const { email, code } = state;
        const data = { email, code }
        if (code == "") {
            alert("Verification code is required")
            return;
        }
        const config = { 'content-type': 'application/json' }

        axios.post(process.env.REACT_APP_NODE_URL + "/admin/verifycode", data).then(res => {
            console.log(res.data)

            // Show code input at frontend

            if (res.data.status == "0") {
                alert(res.data.message)
                return;
            }

            authenticate(res, "admin", () => {
                // alert(res.data.message)
                console.log("Token added as admin_token")
                window.location.href =  props.role == "ADMIN" ? "/d/admin/" : "/d/subadmin/"
            })
            // authenticate with token
            // redirect
        }).catch(err => {
            console.log(err.response.data)
            alert(err.response.data.message)
        })
    }
    const handleInput = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    return (
        <>
            <AuthScreen>
                <>
                    <div>
                        {
                            state.isCodeSend ?
                                <div className="md:grid md:grid-cols-3 md:gap-6">
                                    <div className="mt-5 md:col-start-2 md:mt-0 m-auto w-full lg:w-9/12">
                                        <div className="shadow sm:overflow-hidden sm:rounded-md border-2 border-[gray] py-5 bg-white">
                                            <div className="space-y-6 px-4 py-5 sm:p-6">
                                                <p className="text-center text-gray my-2">An email with a verification code was just send to gu****@gmail.com</p>
                                                <div className="col-span-3 sm:col-span-2">
                                                    <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                                                        Code
                                                    </label>
                                                    <div className="mt-1 flex rounded-md shadow-sm">
                                                        <input
                                                            type="text"
                                                            name="code"
                                                            value={state.code}
                                                            onChange={handleInput}
                                                            id="company-website"
                                                            className="block w-full flex-1 border-gray-300 focus:border-black border-2 border-gray p-2 w-full focus:ring-indigo-500 sm:text-sm"
                                                            placeholder="Enter Code"
                                                        />
                                                    </div>
                                                    <div className="flex items-end justify-end">
                                                        <button className="text-[#475569] hover:text-black hover:underline" onClick={LoginNow}>Resend</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                                <button
                                                    type="button"
                                                    onClick={VerifyCode}
                                                    className="bg-gradient-primary inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                >
                                                    Submit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div> :
                                <div className="md:grid md:grid-cols-3 md:gap-6">
                                    <div className="mt-5 md:col-start-2 md:mt-0 m-auto w-full lg:w-9/12">
                                        <div className="shadow sm:overflow-hidden sm:rounded-md border-2 border-[gray] py-5 bg-white">
                                            <div className="space-y-6 px-4 py-5 sm:p-6">
                                                <div className="">
                                                    <div className="col-span-3 sm:col-span-2">
                                                        <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                                                            Email
                                                        </label>
                                                        <div className="mt-1 flex rounded-md shadow-sm">
                                                            <input
                                                                type="email"
                                                                name="email"
                                                                value={state.email}
                                                                onChange={handleInput}
                                                                id="company-website"
                                                                className="block w-full flex-1 border-gray-300 focus:border-black border-2 border-gray p-2 w-full focus:ring-indigo-500 sm:text-sm"
                                                                placeholder="Enter Your Email"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div>
                                                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                                                        Password
                                                    </label>
                                                    <div className="mt-1">
                                                        <input
                                                            type="password"
                                                            name="password"
                                                            value={state.password}
                                                            onChange={handleInput}
                                                            className="block w-full flex-1 border-gray-300 focus:border-black border-2 border-gray p-2 w-full focus:ring-indigo-500 sm:text-sm"
                                                            placeholder="Enter your password"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                                <button
                                                    type="button"
                                                    onClick={LoginNow}
                                                    className="bg-gradient-primary inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                >
                                                    Login
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                        }
                    </div>
                </>
            </AuthScreen >
        </>
    )
}

export default Login;