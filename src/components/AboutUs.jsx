import React, { useContext, useEffect, useState } from "react";
import aboutimg from "../assets/about.jpg";
import Loader from "./Loader/Loader";
import MyContext from "../ContextApi/MyContext";


const AboutUs = () => {
  const [activeTab, setActiveTab] = useState("introduction");

  const [loading, setLoading] = useState(true);
  const {preview} = useContext(MyContext);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="bg-white text-gray-800 mt-20">
      {/* Header Section */}
      <div
        className="relative w-full h-[200px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${preview})`,
        }}
      >
        <div
          className="absolute inset-0 z-10"
          style={{ backgroundColor: "rgba(73, 71, 71, 0.6)" }}
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center md:justify-start md:px-40">
          <p className="text-2xl md:text-4xl font-semibold text-white">
            {activeTab === "introduction" ? "INTRODUCTION" : "VISION & MISSION"}
          </p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="flex flex-col lg:flex-row px-6 md:px-12 lg:px-24 py-12">
        {/* Main Text */}
        <div className="lg:w-3/4 space-y-6">
          {activeTab === "introduction" ? (
            <>
              <p>
                Dr. Vikram Sethi is a professor at the Raj Soin College of
                Business at Wright State University, Dayton Ohio. In 2006, he
                founded the Institute of Defense Studies and Education at Wright
                State University and served as its director...
              </p>
              <p>
                In a career spanning more than two decades, Dr. Sethi has
                handled a variety of teaching, research, and consulting
                assignments...
              </p>
              <p>
                Dr. Vikram Sethi has published more than 50 articles in highly
                cited peer-reviewed journals...
              </p>
              <p>
                Dr. Sethi studied at Thapar Institute of Engineering and
                Technology, India...
              </p>
              <p>
                Dr. Sethi supports entrepreneurship globally and has advised
                startup organizations...
              </p>
            </>
          ) : (
            <p className="text-lg text-gray-700">
              Our vision is to promote global entrepreneurship and innovation by
              supporting education, ethical leadership, and cross-disciplinary
              collaboration. Our mission is to equip future leaders with tools
              for success through impactful education, research, and mentorship.
            </p>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:w-1/4 mt-12 lg:mt-0 lg:pl-12">
          <div className="border-l-4 border-red-600 pl-4 mb-4">
            <h2 className="text-xl font-semibold text-red-600">ABOUT US</h2>
          </div>
          <div className="flex flex-col gap-4">
            <button
              className={`px-4 py-2 rounded-full border transition ${
                activeTab === "introduction"
                  ? "bg-red-600 text-white"
                  : "text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
              }`}
              onClick={() => setActiveTab("introduction")}
            >
              Introduction
            </button>
            <button
              className={`px-4 py-2 rounded-full border transition ${
                activeTab === "vision"
                  ? "bg-red-600 text-white"
                  : "text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
              }`}
              onClick={() => setActiveTab("vision")}
            >
              Vision & Mission
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
