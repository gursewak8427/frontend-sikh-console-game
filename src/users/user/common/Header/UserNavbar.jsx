import React, { useEffect, useState } from "react";
import { getToken, logoutHelper } from "../../../../helper/auth";

const UserNavbar = ({ heading_title }) => {
  const [state, setState] = useState({
    studentToken: false,
    isWaiting: true,
  });

  useEffect(() => {
    let token = getToken("user");
    setState({
      ...state,
      studentToken: token,
      isWaiting: false,
    });
  }, []);

  const setHide = () => {
    let aside = document.getElementById("aside");
    aside.classList.toggle("show");
  };

  return (
    <>
      <nav className="">
        <div className="flex p-3 flex-row justify-between items-center bg-[#e2e8f0]">
          <span className="breadcrumb flex items-center justify-center">
            <div
              aria-label="toggler"
              className="flex justify-center items-center"
            >
              <button
                onClick={() => setHide(false)}
                aria-label="open"
                id="open"
                className="focus:outline-none focus:ring-2"
              >
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="black"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 6H20"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 12H20"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 18H20"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <h6 className="font-bold flex items-center justify-center text-[#2a276b] mb-0">
              {heading_title || ""}
            </h6>
          </span>
          <div>
            <ul className="flex items-center justify-center">
              <li className="flex items-center justify-center">
                {state.isWaiting ? (
                  <>
                    <div class="spinner-border" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  </>
                ) : state.studentToken ? (
                  <button
                    className="py-2 px-4 bg-[#b91c1c] text-white font-semibold rounded-lg shadow-md hover:bg-[#7f1d1d] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                    onClick={() => logoutHelper("user")}
                  >
                    <i className="fa fa-sign-out me-sm-1" />
                    <span className="d-sm-inline d-none">Logout</span>
                  </button>
                ) : (
                  <a
                    href="javascript:void(0);"
                    className="nav-link text-body font-weight-bold px-0"
                  >
                    <i className="fa fa-user me-sm-1" />
                    <span className="d-sm-inline d-none">Login</span>
                  </a>
                )}
              </li>
              <li className="nav-item d-xl-none ps-3 d-flex align-items-center">
                <a
                  href="javascript:void(0);"
                  className="nav-link text-body p-0"
                  id="iconNavbarSidenav"
                >
                  <div className="sidenav-toggler-inner">
                    <i className="sidenav-toggler-line" />
                    <i className="sidenav-toggler-line" />
                    <i className="sidenav-toggler-line" />
                  </div>
                </a>
              </li>
              <li className="nav-item dropdown mx-3 pe-2 d-flex align-items-center">
                <a
                  href="javascript:void(0);"
                  className="nav-link text-body p-0"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fa fa-bell cursor-pointer" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default UserNavbar;
