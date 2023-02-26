import React from "react";
import { useNavigate } from "react-router-dom";
import About from "../Components/About";
import Courses from "../Components/Courses";
import Homebanner from "../Components/Homebanner";
import Media from "../Components/Media";
import WebsiteHome from "../Screens/WebsiteHome";

export default function WHome() {
  const navigate = useNavigate()
  return (
    <>
      hello welcome from home
      <br />
      <button className="px-4 py-2 bg-gradient-primary text-white rounded" onClick={()=>navigate("/d")}>Login as User</button>
      {/* <WebsiteHome>
        <Homebanner />
        <About />
        <Media />
        <Courses />
      </WebsiteHome> */}
    </>
  );
}
