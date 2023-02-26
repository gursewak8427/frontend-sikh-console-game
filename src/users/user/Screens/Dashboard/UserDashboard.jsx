import { Route, Routes } from "react-router-dom";
import Footer from "../../common/Footer/UserFooter";
import Header from "../../common/Header/UserHeader";
import Navbar from "../../common/Header/UserNavbar";
import { Helmet } from "react-helmet";
import UserHeader from "../../common/Header/UserHeader";
import UserNavbar from "../../common/Header/UserNavbar";
import UserFooter from "../../common/Footer/UserFooter";
import UserEmailConfirmationReminder from "../../common/UserEmailConfirmationReminder";
import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../../../../helper/auth";
import { Toaster } from "react-hot-toast";

const UserDashboard = ({ children, footer }) => {
  const [state, setState] = useState({
    isEmailVerified: true,
    isWait: false,
    token: getToken("User"),
  });

  useEffect(() => {
    // const config = { headers: { "Authorization": `Bearer ${state.token}` } }
    // axios.get(process.env.REACT_APP_NODE_URL + "/user/get_email_verification", config).then(res => {
    //     // window.location.href = "/user/"
    //     if (res.data.status == "1") {
    //         setState({
    //             ...state,
    //             isEmailVerified: true,
    //             isWait: false,
    //         })
    //     } else {
    //         setState({
    //             ...state,
    //             isEmailVerified: false,
    //             isWait: false,
    //         })
    //     }
    // }).catch(err => {
    //     setState({
    //         ...state,
    //         isWait: false,
    //     })
    //     console.log(err.response.data)
    // })
  }, []);

  return (
    <>
      {/* {
                !state.isEmailVerified ? <UserEmailConfirmationReminder /> : ""
            } */}

      <UserHeader />
      <main className="lg:ml-[255px] xl:ml-[255px] sm:ml-[0]">
        <UserNavbar />
        <div className="innerBox">
          <div style={{ minHeight: "85vh" }}>{children}</div>
          {footer != false && <UserFooter />}
        </div>
      </main>
      <Helmet>
        <script src="/assets/js/core/popper.min.js"></script>
        <script src="/assets/js/core/bootstrap.min.js"></script>
        {/* <script src="/assets/js/plugins/perfect-scrollbar.min.js"></script> */}
        <script src="/assets/js/plugins/smooth-scrollbar.min.js"></script>
        <script src="/assets/js/plugins/chartjs.min.js"></script>
        <script src="/assets/js/soft-ui-dashboard.js" type="text/javascript" />
      </Helmet>
    </>
  );
};

export default UserDashboard;
