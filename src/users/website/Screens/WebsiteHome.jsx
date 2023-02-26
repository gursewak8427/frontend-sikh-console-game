import React from "react";
import { Link } from "react-router-dom";
import Eligibleform from "../Components/Eligibleform";
import Footer from "../Components/Footer";
import Header from "../Components/Header";

export default function WebsiteHome({ children }) {
    return (
        <div className="app">
            <div className="top-bar flex py-2 px-4 lg:px-0   border-b">
                <div className="container mx-auto">
                    <div className="grid lg:grid-cols-3">
                        <div className="flex items-center justify-center lg:justify-start gap-4 pl-4">
                            <Link to="#">
                                <i
                                    className="text-[#149449] fa fa-linkedin"
                                    aria-hidden="true"
                                ></i>
                            </Link>
                            <Link to="#">
                                <i class="text-[#149449] fa fa-twitter" aria-hidden="true"></i>
                            </Link>
                            <Link to="#">
                                <i class="text-[#149449] fa fa-instagram" aria-hidden="true"></i>
                            </Link>
                            <Link to="#">
                                <i class="text-[#149449] fa fa-facebook" aria-hidden="true"></i>
                            </Link>
                        </div>
                        <div className="text-center my-3 lg:my-0">
                            <a
                                className="mail-link font-bold text-black  block text-lg tracking-widest"
                                href="mailto:info@learnglobal.com"
                            >
                                <i class="fa fa-envelope mr-2" aria-hidden="true"></i>
                                info@learnglobal.com
                            </a>
                        </div>

                        <div>
                            <div class="flex justify-center lg:justify-end ">
                                <div class="w-full lg:w-[80%]">
                                    <input
                                        type="search"
                                        className="
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white  focus:outline-none
      "
                                        id="exampleSearch"
                                        placeholder="Search Your Program"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Header />
            {children}
            <Footer />
        </div >
    );
}
