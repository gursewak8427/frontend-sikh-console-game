import React from "react";
import Med from "../images/med.png";

export default function Media() {
  return (
    <div>
      <div className="about-part  mt-10 lg:mt-0 px-4 lg:px-0  lg:pb-32">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-4">
            <div>
              <div className="img-part">
                <img className="w-full" src={Med} alt="about" />
              </div>
            </div>
            <div className="lg:pt-40 lg:pl-5">
              <h2 className="text-leftfont-bold text-4xl pb-10 my-10 relative">
                Media
              </h2>
              <p className="text-black tracking-widest  lg:pr-20">
                Our awareness and expertise will boost your probability of
                admissions accomplishment when studying abroad. We are the No. 1
                education service provider for students to apply to the best
                institutions in the world. Our miscellaneous team is fueled by a
                passion for culture and innovation. Our team of experts connects
                with students univer, supporting them with our platform and
                services.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
