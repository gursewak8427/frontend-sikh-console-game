import React from "react";
import H_about from "../images/h_about.jpg";
export default function About() {
  return (
    <div>
      <div className="about-part mt-10 lg:mt-0 lg:pt-32 px-4 lg:px-0">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-4">
            <div>
              <h2 className="text-leftfont-bold text-4xl pb-10 my-10 relative">
                About Us
              </h2>
              <p className="text-black tracking-widest  lg:pr-20">
                Learn Global means learn anywhere in the world and we provide
                you the best platform to study abroad and make your future
                bright. We offer exact information for students interested in
                school/college and courses. We help you classify the best
                universities that match your profile.
              </p>
              <button class="hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-full mt-8 lg:mt-14">
                Learn More
              </button>
            </div>
            <div>
              <div className="img-part">
                <img className="w-full" src={H_about} alt="about" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
