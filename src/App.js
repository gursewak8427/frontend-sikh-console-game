import "./App.css";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom"
import ProtectedRoute from "./common/ProtectedRoute";
import { getToken } from "./helper/auth";
import Home from "./Home";
import AddSchools from "./users/admin/Pages/AddSchools";
import AdminSubStudents from "./users/admin/Pages/AdminSubStudents";
import DashboardPage from "./users/admin/Pages/DashboardPage";
import Login from "./users/admin/Pages/Login";
import Manage from "./users/admin/Pages/Manage";
import ProgramsList from "./users/admin/Pages/ProgramsList";
import SchoolList from "./users/admin/Pages/SchoolList";
import StudentList from "./users/admin/Pages/StudentList";
import AgentAddStudent from "./users/agent/Pages/AgentAddStudent";
import AgentGetStudent from "./users/agent/Pages/AgentGetStudent";
import AgentLogin from "./users/agent/Pages/AgentLogin";
import AgentProfile from "./users/agent/Pages/AgentProfile";
import AgentRegister from "./users/agent/Pages/AgentRegister";
import AgentDashboard from "./users/agent/Screens/Dashboard/AgentDashboard";
import StudentConfirm from "./users/student/common/StudentConfirm";
import StudentLogin from "./users/student/Pages/StudentLogin";
import StudentRegister from "./users/student/Pages/StudentRegister";
import StudentDashboard from "./users/student/Screens/Dashboard/StudentDashboard";
import AddCountry from "./users/admin/Pages/CategoryManage";
import AddSchoolsName from "./users/admin/Pages/AddSchoolName";
import Notifications from "./users/admin/Pages/Notifications";
import AdminListQuestions from "./users/admin/Pages/AdminListQuestions";


// import WebsiteHome from "./users/website/screens/WebsiteMain";
import WHome from "./users/website/Pages/WHome";
import WEligible from "./users/website/Pages/WEligible";
import WSearch from "./users/website/Pages/WSearch";
import axios from "axios";
import AdminAgentProfile from "./users/admin/Pages/AdminAgentProfile";
import AgentNotifications from "./users/agent/Pages/AgentNotifications";
import CreateEmployee from "./users/admin/Pages/CreateEmployee";
import EmployeeList from "./users/admin/Pages/EmployeeList";
import Header from "./users/admin/common/Header/Header";
import Navbar from "./users/admin/common/Header/Navbar";
import Dashboard from "./users/admin/Screens/Dashboard/Dashboard";
import { requestForToken } from "./firebase";
import Notification from "./common/Notifications";
import CategoryManage from "./users/admin/Pages/CategoryManage";
import CreateUser from "./users/admin/Pages/CreateUser";
import UserList from "./users/admin/Pages/UserList";
import UserDashboard from "./users/user/Screens/Dashboard/UserDashboard";
import UserLogin from "./users/user/Pages/UserLogin";
import UserRegister from "./users/user/Pages/UserRegister";
import ListQuestions from "./users/user/Pages/ListQuestions";
import AddQuestion from "./users/user/Pages/AddQuestion";

// web-socket
// import socketIOClient from "socket.io-client";
// const ENDPOINT = "http://127.0.0.1:3006";
// console.log("COnnecting")
// const socket = socketIOClient(ENDPOINT);


const App = () => {
  const roleFromUrl = window.location.href.split("/")[4]
  const [state, setState] = useState({
    wait: true,
    tokenAdmin: false,
    tokenAgent: false,
    tokenStudent: false,
    tokenUser: false,
    currentPermissions: []
  })


  // useEffect(() => {
  //   socket.on("FromAPI", data => {
  //     console.log(data)
  //   });
  // }, []);

  useEffect(() => {

    let tokenAdmin = getToken("admin");
    let tokenAgent = getToken("agent");
    let tokenStudent = getToken("student");
    let tokenUser = getToken("user");
    
    // get Permissions
    var myToken;
    if (roleFromUrl == "admin") {
      myToken = tokenAdmin;
    }
    const config = { headers: { "Authorization": `Bearer ${myToken}` } }
    requestForToken().then(token => {

      axios.post(process.env.REACT_APP_NODE_URL + "/admin/verifyToken", { token }, config).then(res => {
        console.log({ res })
        if (res.data.status == "0") {
          setState({
            ...state,
            wait: false,
            currentPermissions: "ALLOW",
            tokenAdmin,
            tokenAgent,
            tokenStudent,
            tokenUser,
          })
          return;
        }
        if (res.data.details.userData.role != "ADMIN") {
          setState({
            ...state,
            currentPermissions: res.data.details.userData.permissions,
            wait: false,
            tokenAdmin,
            tokenAgent,
            tokenStudent,
            tokenUser
          })
          return;
        }

        setState({
          ...state,
          currentPermissions: "ALLOW",
          wait: false,
          tokenAdmin,
          tokenAgent,
          tokenStudent,
          tokenUser
        })
        return;
      }).catch(err => {
        console.log(err.response.data)
      })

    })
  }, [])

  if (state.wait) {
    return (
      <center className="bg-white flex h-screen items-center justify-center">
        <img width={"500px"} src="https://miro.medium.com/max/1400/1*Gvgic29bgoiGVLmI6AVbUg.gif" />
      </center>
    )
  }
  return (
    <>

      <Notification />
      <Routes>
        <Route path="/d/" element={<Home isAdmin={false} />} />
        <Route path="/d/adminlogin123" element={<Home isAdmin={true} role="ADMIN" token={state.tokenAdmin} />} />
        <Route path="/d/admin" element={<Dashboard />}>
          <Route index element={<ProtectedRoute token={state.tokenAdmin} role={"admin"}><DashboardPage /></ProtectedRoute>} />
          <Route path="dashboard" element={<ProtectedRoute token={state.tokenAdmin} role={"admin"}><DashboardPage /></ProtectedRoute>} />
          <Route path="category" element={<ProtectedRoute token={state.tokenAdmin} role={"admin"} permissions={state.currentPermissions} permission_name={"student_list"}><CategoryManage /></ProtectedRoute>} />
          <Route path="createemployee" element={<ProtectedRoute token={state.tokenAdmin} role={"admin"} permissions={state.currentPermissions} permission_name={"employee_create"}><CreateEmployee /></ProtectedRoute>} />
          <Route path="listemployee" element={<ProtectedRoute token={state.tokenAdmin} role={"admin"} permissions={state.currentPermissions} permission_name={"employee_list"}><EmployeeList /></ProtectedRoute>} />
          <Route path="createuser" element={<ProtectedRoute token={state.tokenAdmin} role={"admin"} permissions={state.currentPermissions} permission_name={"user_create"}><CreateUser /></ProtectedRoute>} />
          <Route path="listuser" element={<ProtectedRoute token={state.tokenAdmin} role={"admin"} permissions={state.currentPermissions} permission_name={"user_list"}><UserList /></ProtectedRoute>} />
          <Route path="notifications" element={<ProtectedRoute token={state.tokenAdmin} role={"admin"} permissions={state.currentPermissions}><Notifications /></ProtectedRoute>} />
          <Route path="questions" element={<ProtectedRoute token={state.tokenAdmin} role={"admin"} permissions={state.currentPermissions}><AdminListQuestions /></ProtectedRoute>} />
          {/*
           <Route path="manage" element={<ProtectedRoute token={state.tokenAdmin} role={"admin"} permissions={state.currentPermissions} permission_name={"csv_programs"}><Manage /></ProtectedRoute>} />
          <Route path="agentprofile" element={<ProtectedRoute token={state.tokenAdmin} role={"admin"}><AdminAgentProfile /></ProtectedRoute>} />
          <Route path="schools" element={<ProtectedRoute token={state.tokenAdmin} role={"admin"} permissions={state.currentPermissions} permission_name={"sp_list"}><SchoolList /></ProtectedRoute>} />
          <Route path="programs/:id" element={<ProtectedRoute token={state.tokenAdmin} role={"admin"} permissions={state.currentPermissions} permission_name={"sp_list"}><ProgramsList /></ProtectedRoute>} />
          <Route path="addschools" element={<ProtectedRoute token={state.tokenAdmin} role={"admin"} permissions={state.currentPermissions} permission_name={"csv_programs"}><AddSchools /></ProtectedRoute>} />
          <Route path="agent_students/:agentId" element={<ProtectedRoute token={state.tokenAdmin} role={"admin"} permissions={state.currentPermissions} permission_name={"csv_programs"} ><AdminSubStudents /></ProtectedRoute>} />
          <Route path="addcountry" element={<ProtectedRoute token={state.tokenAdmin} role={"admin"} permissions={state.currentPermissions} permission_name={"sp_country_names"} ><AddCountry /></ProtectedRoute>} />
          <Route path="addschoolname" element={<ProtectedRoute token={state.tokenAdmin} role={"admin"} permissions={state.currentPermissions} permission_name={"sp_school_names"}><AddSchoolsName /></ProtectedRoute>} />
           */}
        </Route>

        {/* website routes */}
        <Route path="/" element={<WHome />} />
        {/* <Route path="/eligible" element={<WEligible />} />
        <Route path="/search/:query" element={<WSearch />} /> */}

        {/* <Route path="/" element={<Home />} /> */}

        {/* dashboard Routes */}
        {/* <Route path="/d/" element={<Home isAdmin={false} />} />
        <Route path="/d/adminlogin123" element={<Home isAdmin={true} role="ADMIN" token={state.tokenAdmin} />} /> */}

        {/* admin routes */}
        {/* <Route path="/d/admin/login" element={<Login />} /> */}

        {/* agent routes */}
        {/* <Route path="/d/agent" element={<AgentDashboard />}>
          <Route index element={<>Dashbaord page</>} />
          <Route path="dashboard" element={<>Dashbaord page</>} />
          <Route path="login" element={<AgentLogin />} />
          <Route path="register" element={<AgentRegister />} />
          <Route path="addstudent" element={<AgentAddStudent />} />
          <Route path="getstudents" element={<AgentGetStudent />} />
          <Route path="profile" element={<ProtectedRoute token={state.tokenAgent} role={"agent"}><AgentProfile /></ProtectedRoute>} />
          <Route path="notifications" element={<ProtectedRoute token={state.tokenAgent} role={"agent"}><AgentNotifications /></ProtectedRoute>} />
        </Route> */}

        {/* student routes */}
        {/* <Route path="/d/student" element={<ProtectedRoute token={state.tokenStudent} role={"student"}><StudentDashboard /></ProtectedRoute>} />
        <Route path="/d/student/dashboard" element={<ProtectedRoute token={state.tokenStudent} role={"student"}><StudentDashboard /></ProtectedRoute>} />
        <Route path="/d/student/login" element={<StudentLogin />} />
        <Route path="/d/student/register" element={<StudentRegister />} />
        <Route path="/d/student/confirm/:token" element={<StudentConfirm />} /> */}
        {/* <Route path="*" element={<><center className="pt-5 text-danger text-bold text-decoration-underline">404 Not Found</center></>} /> */}

        {/* user routes */}
        <Route path="/d/user" element={<ProtectedRoute token={state.tokenUser} role={"user"}><UserDashboard /></ProtectedRoute>} />
        <Route path="/d/user/login" element={<UserLogin />} />
        {/* <Route path="/d/user/register" element={<UserRegister />} /> */}
        <Route path="/d/user/dashboard" element={<ProtectedRoute token={state.tokenUser} role={"user"}><UserDashboard /></ProtectedRoute>} />
        <Route path="/d/user/questions" element={<ProtectedRoute token={state.tokenUser} role={"user"}><ListQuestions /></ProtectedRoute>} />
        <Route path="/d/user/addquestion" element={<ProtectedRoute token={state.tokenUser} role={"user"}><AddQuestion /></ProtectedRoute>} />

      </Routes>
    </>
  );
}

export default App;
