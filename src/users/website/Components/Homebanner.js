import React from "react";
import Heroslider from "../Components/Heroslider";

export default function Homebanner() {
  return (
    <div>
      <div className="home-hero  px-4 lg:px-0 py-24  lg:py-48 relative">
        <div className="container mx-auto">
          <h1 className="text-center text-white text-2xl lg:text-5xl font-bold relative">
            Education is the passion for learning which leads
            <br />
            us from <span>darkness to light</span>
          </h1>
          <Heroslider />
          <ul className="lg:flex items-center justify-center relative gap-10 mt-10">
            <li className="text-white italic tracking-widest text-center">
              10245 + Total Students
            </li>
            <li className="text-white italic tracking-widest text-center my-3 lg:my-0">
              Scholarships Upto $40000*
            </li>
            <li className="text-white italic tracking-widest text-center">
              2206 + Total Courses
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
