import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Login from "./users/admin/Pages/Login";
import AgentLogin from "./users/agent/Pages/AgentLogin";
import AgentRegister from "./users/agent/Pages/AgentRegister";
import StudentLogin from "./users/student/Pages/StudentLogin";
import StudentRegister from "./users/student/Pages/StudentRegister";
import UserLogin from "./users/user/Pages/UserLogin";

const Home = (props) => {
    const [state, setState] = useState({
        page: props.isAdmin ? 1 : 6,
        wait: true,
    })

    useEffect(() => {
        if (props.token) {
            window.location.href = "/d/admin/"
            return;
        }
        setState({
            ...state,
            wait: false,
        })
    }, [])

    const setPage = page => {
        setState({
            ...state,
            page
        })
    }

    if (state.wait) {
        return (
            <center className="bg-white flex h-screen items-center justify-center">
                <img width={"500px"} src="https://miro.medium.com/max/1400/1*Gvgic29bgoiGVLmI6AVbUg.gif" />
            </center>
        )
    }
    return (
        <>
            <div className="loginSelectionDiv">
                <div className="p-2 bg-blue flex items-center flex-col">
                    {/* Logo */}
                    <Link to={"/"}><img src="/assets/img/logo-main.png" width={"150px"} alt="" className="mb-4" /></Link>
                    {
                        !props.isAdmin && <div className="flex items-center m-2 loginTabs">
                            <span className={`${state.page == 6 || state.page == 6 ? "active" : ""} rounded text-black w-[80px] m-2 p-2 text-white text-center`} onClick={() => setPage(6)}>User</span>
                        </div>
                    }
                    {/* <h1 className="text-center text-[35px] font-bolder mb-3"><b>Login</b></h1> */}
                    {/* {
                        !props.isAdmin &&
                        <div className="flex items-center m-2 loginTabs">
                            <span className={`${state.page == 2 || state.page == 4 ? "active" : ""} rounded text-black w-[80px] m-2 p-2 text-white text-center`} onClick={() => setPage(2)}>Agent</span>
                            <span className={`${state.page == 3 || state.page == 5 ? "active" : ""} rounded text-[#000  ] w-[80px] m-2 p-2 text-white text-center`} onClick={() => setPage(3)}>Student</span>
                        </div>
                    } */}
                </div>
                <div className="main-login-box justify-center items-center">
                    {
                        state.page == 1 ?
                            <Login setPage={setPage} role={props.role} /> :
                            state.page == 2 ?
                                <AgentLogin setPage={setPage} /> :
                                state.page == 3 ?
                                    <StudentLogin setPage={setPage} /> :
                                    state.page == 4 ?
                                        <AgentRegister setPage={setPage} /> :
                                        state.page == 5 ?
                                            <StudentRegister setPage={setPage} /> :
                                            state.page == 6 &&
                                            <UserLogin setPage={setPage} />

                    }
                </div>
            </div>
            {!props.isAdmin && <Outlet />}
        </>
    )
}

export default Home;