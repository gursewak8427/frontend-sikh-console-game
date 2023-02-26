import axios from "axios";
import { useState } from "react";
import { Link, Navigate, redirect } from "react-router-dom";
import { authenticate } from "../../../helper/auth";
import AuthScreen from "../Screens/Authentication/StudentAuthScreen";
import Dashboard from "../Screens/Dashboard/StudentDashboard";

// firebase
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseAuth } from "../../../firebase"
const provider = new GoogleAuthProvider();

const StudentLogin = (props) => {
    const [state, setState] = useState({
        data: "",
        password: "",
        submitProcessing: false,
    })

    const LoginNow = async () => {
        setState({
            ...state,
            submitProcessing: true,
        })
        const { data, password } = state;
        const data2 = { data, password }
        const config = { 'content-type': 'application/json' }
        axios.post(process.env.REACT_APP_NODE_URL + "/student/login", data2).then(res => {
            console.log(res)
            if (res.data.status == "0") {
                alert(res.data.message)
                return;
            }
            authenticate(res, "student", () => {
                // alert(res.data.message)
                console.log("Token added as agent_token")
                window.location.href = "/d/student/"
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

    const signin = () => {
        signInWithPopup(firebaseAuth, provider).then(res => {
            const userDtl = res.user.providerData[0]
            console.log(res)
            const data = {
                email: userDtl.email,
                firstName: userDtl.displayName.split(" ")[0],
                lastName: userDtl.displayName.split(" ")[1],
                phone: userDtl.phoneNumber,
                loginProvider: "google",
                uid: userDtl.uid,
                tokens: {
                    idToken: res._tokenResponse.oauthIdToken
                }
            }
            const config = { 'content-type': 'application/json' }

            axios.post(process.env.REACT_APP_NODE_URL + "/student/studentGoogleLogin", data).then(res => {
                console.log({ res11: res })
                if (res.data.status == "0") {
                    alert(res.data.message)
                    return;
                }
                authenticate(res, "student", () => {
                    // alert(res.data.message)
                    console.log("Token added as agent_token")
                    window.location.href = "/d/student/"
                })
                // window.location.href = "/student/login"
            }).catch(err => {
                console.log(err.response.data)
                if (err.response.data.name == "ValidationError") {
                    let errors = err.response.data.details.error
                    let msg = ""
                    for (const key in errors) {
                        msg += errors[key] += "\n"
                        console.log([key, errors[key]])
                    }
                    alert(msg)
                    return;
                }
                alert(err.response.data.message)
            })
        }).catch(alert);
    }

    return (
        <>
            <AuthScreen>
                <>
                    <div className="">
                        <div className="md:grid md:grid-cols-3 md:gap-6">
                            <div className="mt-5 md:col-start-2 md:mt-0 m-auto w-full lg:w-9/12">
                                <div className="shadow sm:overflow-hidden sm:rounded-md">
                                    <div className="space-y-6 bg-white px-4 py-2 sm:p-2">
                                        <div className="">
                                            <div className="col-span-3 sm:col-span-2">
                                                <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                                                    Enter Email or Phone
                                                </label>
                                                <div className="mt-1 flex rounded-md shadow-sm">
                                                    <input
                                                        type="text"
                                                        name="data"
                                                        value={state.data}
                                                        onChange={handleInput}
                                                        id="company-website"
                                                        className="block w-full flex-1 border-gray-300 focus:border-black border-2 border-gray p-2 w-full focus:ring-indigo-500 sm:text-sm"
                                                        placeholder="Enter your email or phone"
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
                                    <hr />
                                    <div className="socialBtns">
                                        <button
                                            className="googleBtn"
                                            onClick={signin}>
                                            <img src="https://cdn2.iconfinder.com/data/icons/social-icons-33/128/Google-512.png" alt="" />
                                            Sign In with Google
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-center pt-2 px-lg-2 px-1">
                            <p className="mb-4 text-sm mx-auto">
                                Don't have an account?
                                <span onClick={() => props.setPage(5)} className="pl-2 text-info text-gradient font-bold cursor-pointer">Register</span>
                            </p>
                        </div>
                    </div>
                </>
            </AuthScreen>
        </>
    )
}

export default StudentLogin;