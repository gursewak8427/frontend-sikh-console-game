import axios from "axios";
import { useState } from "react";
import { Link, Navigate, redirect } from "react-router-dom";
import { authenticate, getToken } from "../../../helper/auth";
import AgentDashboard from "../Screens/Dashboard/AgentDashboard";

const AgentAddStudent = () => {
    const [state, setState] = useState({
        email: "",
        password: "",
        submitProcessing: false,
        agentToken: getToken("agent"),
    })

    const RegisterNow = async () => {
        setState({
            ...state,
            submitProcessing: true,
        })
        const { email, password } = state;
        if (email == "" || password == "") return alert("All fields are required")
        const data = { email, password }
        const config = { headers: { "Authorization": `Bearer ${state.agentToken}` } }
        axios.post(process.env.REACT_APP_NODE_URL + "/agent/addstudent", data, config).then(res => {
            console.log(res)
            // authenticate with token
            // redirect
            alert(res.data.message)
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
            <AgentDashboard heading_title={"Add Student"}>
                <>
                    <div className="row">
                        <div className="col-xl-10 col-lg-10 col-md-10 d-flex flex-column mx-auto">
                            <div className="card card-plain">
                                <div className="card-header pb-0 text-left bg-transparent">
                                    {/* <h3 className="font-weight-bolder text-info text-gradient">Add Student</h3> */}
                                    {/* <p className="mb-0">Enter your email and password to register</p> */}
                                </div>
                                <div className="card-body">
                                    <label>Email</label>
                                    <div className="mb-3">
                                        <input type="email" className="form-control" placeholder="Email" aria-label="Email" aria-describedby="email-addon" name="email" onChange={handleInput} />
                                    </div>
                                    <label>Password</label>
                                    <div className="mb-3">
                                        <input type="email" className="form-control" placeholder="Password" aria-label="Password" aria-describedby="password-addon" name="password" onChange={handleInput} />
                                    </div>
                                    {/* <div className="form-check form-switch">
                                            <input className="form-check-input" type="checkbox" id="rememberMe" defaultChecked />
                                            <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                                        </div> */}
                                    <div className="text-center" style={{ float: "right" }}>
                                        <button type="button" onClick={RegisterNow} className="btn bg-gradient-info w-100 mt-4 mb-0">Register Student</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            </AgentDashboard>
        </>
    )
}

export default AgentAddStudent;